import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { signOut } from "@/lib/actions/auth";
import { LEAD_STATUSES, type Lead } from "@/lib/leads";
import { LeadsTable } from "@/components/admin/leads-table";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const admin = createAdminClient();
  const { data } = await admin.from("leads").select("*").order("created_at", { ascending: false });
  const rows = (data ?? []) as Lead[];

  const metrics = LEAD_STATUSES.map((s) => ({ label: s.label, count: rows.filter((l) => l.status === s.value).length }));

  return (
    <div className="min-h-screen bg-muted">
      <header className="sticky top-0 z-10 border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <h1 className="font-display text-lg font-bold tracking-tight">Waterbase · Leads</h1>
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
          <div className="rounded-xl border border-brand-green/20 bg-brand-green-soft p-4 shadow-soft">
            <div className="font-display text-2xl font-extrabold text-brand-green">{rows.length}</div>
            <div className="mt-0.5 text-xs font-medium text-brand-green-dark">Total</div>
          </div>
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-card p-4 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-lift">
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