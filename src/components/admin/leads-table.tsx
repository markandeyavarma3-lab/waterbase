"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search, Download, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { LEAD_STATUSES, REQUIREMENT_OPTIONS, type Lead, type LeadStatus } from "@/lib/leads";
import { updateLeadStatus } from "@/lib/actions/leads";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 25;

function requirementLabel(value: string) {
  return REQUIREMENT_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

function statusClasses(status: string) {
  switch (status) {
    case "new": return "bg-brand-blue-soft text-brand-blue-dark";
    case "contacted": return "bg-brand-sun-soft text-brand-sun-dark";
    case "follow_up": return "bg-brand-soil-soft text-brand-soil-dark";
    case "converted": return "bg-brand-green-soft text-brand-green-darker";
    default: return "bg-muted text-muted-foreground";
  }
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [pageState, setPageState] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      const matchesQuery = !q || l.name.toLowerCase().includes(q) || l.mobile.includes(q);
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [leads, query, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // Derived, not stored — clamps automatically once a narrower search/status
  // filter makes the stored page number too high, no reset effect needed.
  const page = Math.min(pageState, pageCount);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function onStatusChange(id: string, status: LeadStatus) {
    setUpdatingId(id);
    startTransition(async () => {
      await updateLeadStatus(id, status);
      router.refresh();
      setUpdatingId(null);
    });
  }

  function exportCsv() {
    const header = ["Date", "Name", "Mobile", "Location", "Land Size", "Requirement", "Status"];
    const rows = filtered.map((l) => [new Date(l.created_at).toLocaleString("en-IN"), l.name, l.mobile, l.location ?? "", l.land_size ?? "", requirementLabel(l.requirement), l.status]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waterbase-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input aria-label="Search leads by name or mobile" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or mobile" className="pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <select aria-label="Filter leads by status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-md border border-input bg-transparent px-2.5 text-sm">
            <option value="all">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* 7 columns can't compress into a phone without the cells turning into
          one-word-per-line mush — scroll the table instead of squashing it. */}
      <div className="scroll-touch mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Mobile</th>
              <th className="px-4 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Land Size</th>
              <th className="px-4 py-3 font-semibold">Requirement</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No leads found.</td>
              </tr>
            ) : (
              visible.map((l) => (
                <tr key={l.id} className="border-t border-border">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{new Date(l.created_at).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 font-medium">{l.name}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <a href={`tel:+91${l.mobile}`} className="text-brand-green hover:underline">{l.mobile}</a>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{l.location || "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{l.land_size || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{requirementLabel(l.requirement)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusClasses(l.status)}`}>{LEAD_STATUSES.find((s) => s.value === l.status)?.label ?? l.status}</span>
                      <select aria-label="Change lead status" value={l.status} disabled={pending && updatingId === l.id} onChange={(e) => onStatusChange(l.id, e.target.value as LeadStatus)} className="h-8 rounded-md border border-input bg-transparent px-2 text-xs">
                        {LEAD_STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      {pending && updatingId === l.id ? <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" /> : null}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} leads
        </p>
        {pageCount > 1 ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm" onClick={() => setPageState(Math.max(1, page - 1))} disabled={page === 1} aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground">Page {page} of {pageCount}</span>
            <Button variant="outline" size="icon-sm" onClick={() => setPageState(Math.min(pageCount, page + 1))} disabled={page === pageCount} aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}