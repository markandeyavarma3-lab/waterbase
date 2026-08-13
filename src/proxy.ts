import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 network proxy (formerly middleware). Runs before /admin routes.
 *
 * This is an optimistic gate only: unsigned visitors are bounced to login.
 * Real authorisation still lives in `checkAdmin()` / `isAdmin()` — signed-in
 * is not the same as allowlisted. Keep both layers.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Missing env in a misconfigured deploy — don't crash the whole site; let
  // the page-level checkAdmin fail closed with a clear message instead.
  if (!url || !anonKey) {
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser() refreshes the session cookie when needed — do not replace with
  // getSession(), which trusts the cookie without verifying it.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !user) {
    const login = request.nextUrl.clone();
    login.pathname = "/admin/login";
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  // Already signed in on the login page → send them to the dashboard.
  if (pathname.startsWith("/admin/login") && user) {
    const dash = request.nextUrl.clone();
    dash.pathname = "/admin";
    dash.search = "";
    return NextResponse.redirect(dash);
  }

  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
