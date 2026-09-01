import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkAdmin } from "@/lib/admin-auth";
import { signOut } from "@/lib/actions/auth";
import { LEAD_STATUSES, type Lead } from "@/lib/leads";
import { LeadsTable } from "@/components/admin/leads-table";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const PAGE_LIMIT = 500;

export default async function AdminPage() {
  const access = await checkAdmin();

  // Signed out — send them to log in. Signed in but not allowlisted is a
  // different situation: redirecting would bounce them straight back here in a
  // loop, so say plainly what happened instead.
  if (!access.ok) {
    if (access.reason === "signed-out") redirect("/admin/login");
    return <AccessDenied reason={access.reason} />;
  }

  const admin = createAdminClient();

  // Status tallies come from their own count queries rather than from filtering
  // the fetched rows. Filtering only ever saw the first PAGE_LIMIT leads, so
  // past that point the pipeline numbers would quietly stop adding up to Total.
  // `head: true` means these transfer counts, not rows.
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [leadsResult, totalResult, weekResult, ...statusResults] = await Promise.all([
    admin.from("leads").select("*").order("created_at", { ascending: false }).limit(PAGE_LIMIT),
    admin.from("leads").select("id", { count: "exact", head: true }),
    admin.from("leads").select("id,status,requirement,created_at").gte("created_at", weekAgo),
    ...LEAD_STATUSES.map((s) =>
      admin.from("leads").select("id", { count: "exact", head: true }).eq("status", s.value)
    ),
  ]);

  const rows = (leadsResult.data ?? []) as Lead[];
  const totalCount = totalResult.count ?? rows.length;
  const metrics = LEAD_STATUSES.map((s, i) => ({
    label: s.label,
    count: statusResults[i]?.count ?? 0,
  }));
  const weekRows = (weekResult.data ?? []) as Pick<Lead, "id" | "status" | "requirement" | "created_at">[];
  const weekNew = weekRows.filter((l) => l.status === "new").length;
  const weekConverted = weekRows.filter((l) => l.status === "converted").length;

  return (
    <div className="min-h-screen">
      <header className="sink-panel living-mesh-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <h1 className="font-display text-lg font-extrabold">Waterbase · Leads</h1>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{access.email}</span>
            <form action={signOut}>
              <Button variant="outline" size="sm" type="submit">Sign out</Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 rounded-2xl sink-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Last 7 days</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <div className="font-display text-2xl font-extrabold text-brand-green">{weekRows.length}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">New form leads</div>
            </div>
            <div>
              <div className="font-display text-2xl font-extrabold">{weekNew}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Still marked New</div>
            </div>
            <div>
              <div className="font-display text-2xl font-extrabold">{weekConverted}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">Converted this week</div>
            </div>
            <div>
              <div className="font-display text-2xl font-extrabold">{totalCount}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">All-time leads</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Call and WhatsApp clicks live in Google Ads / GA4 (events <code>cta_call_now</code> and <code>cta_whatsapp_float</code>). Form leads are counted here.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-xl sink-panel p-4">
            <div className="font-display text-2xl font-extrabold text-brand-green">{totalCount}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">Total</div>
          </div>
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl sink-panel p-4">
              <div className="font-display text-2xl font-extrabold">{m.count}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>

        {totalCount > PAGE_LIMIT ? (
          <p className="mt-4 text-xs text-muted-foreground">
            Showing the {PAGE_LIMIT} most recent leads. Counts above cover all {totalCount}.
          </p>
        ) : null}

        <div className="mt-8 rounded-2xl sink-panel p-5">
          <LeadsTable leads={rows} />
        </div>
      </main>
    </div>
  );
}

function AccessDenied({ reason }: { reason: "not-allowed" | "not-configured" }) {
  const notConfigured = reason === "not-configured";
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="sink-panel w-full max-w-md rounded-2xl p-8 text-center">
        <h1 className="font-display text-xl font-extrabold">
          {notConfigured ? "Admin access isn't configured" : "You don't have access"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {notConfigured ? (
            <>
              No admin accounts have been set up yet. Add <code className="rounded bg-muted px-1 py-0.5 text-xs">ADMIN_EMAILS</code>{" "}
              to the environment variables in Vercel, then redeploy.
            </>
          ) : (
            <>This account isn&apos;t on the admin list. Sign in with an authorised account, or ask the site owner to add you.</>
          )}
        </p>
        <form action={signOut} className="mt-6">
          <Button variant="outline" size="sm" type="submit">Sign out</Button>
        </form>
      </div>
    </div>
  );
}
