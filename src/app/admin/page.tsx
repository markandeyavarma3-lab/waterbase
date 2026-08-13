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
  const [leadsResult, totalResult, ...statusResults] = await Promise.all([
    admin.from("leads").select("*").order("created_at", { ascending: false }).limit(PAGE_LIMIT),
    admin.from("leads").select("id", { count: "exact", head: true }),
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

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-card">
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="font-display text-2xl font-extrabold text-brand-green">{totalCount}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">Total</div>
          </div>
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-card p-4">
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

        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
          <LeadsTable leads={rows} />
        </div>
      </main>
    </div>
  );
}

function AccessDenied({ reason }: { reason: "not-allowed" | "not-configured" }) {
  const notConfigured = reason === "not-configured";
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
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
