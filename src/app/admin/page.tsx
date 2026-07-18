import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
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

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const admin = createAdminClient();
  // Exact count covers the true total even once `rows` itself is capped below.
  const { data, count } = await admin
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(500);
  const rows = (data ?? []) as Lead[];
  const totalCount = count ?? rows.length;

  const metrics = LEAD_STATUSES.map((s) => ({ label: s.label, count: rows.filter((l) => l.status === s.value).length }));

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <h1 className="font-display text-lg font-extrabold">Waterbase · Leads</h1>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
            <form action={signOut}>
              <Button variant="outline" size="sm" type="submit">Sign out</Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
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

        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
          <LeadsTable leads={rows} />
        </div>
      </main>
    </div>
  );
}