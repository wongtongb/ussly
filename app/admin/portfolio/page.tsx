import { requireAdminPage } from "@/lib/supabase/require-admin";
import { ProjectRow } from "./PortfolioRows";
import type { PortfolioItem } from "@/lib/supabase/types";

export default async function PortfolioAdminPage() {
  const { admin } = await requireAdminPage();
  const { data } = await admin
    .from("portfolio")
    .select("*")
    .order("sort_order", { ascending: true });

  const rows = (data ?? []) as PortfolioItem[];

  return (
    <div>
      <header className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
            § III · Selected work
          </p>
          <h1 className="font-display text-5xl lg:text-6xl text-ink tracking-tight">
            Portfolio<span className="text-accent font-display-italic">.</span>
          </h1>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {rows.length} project{rows.length === 1 ? "" : "s"}
        </span>
      </header>

      <div className="space-y-0">
        {rows.map((p) => (
          <ProjectRow key={p.id} item={p} />
        ))}
        <ProjectRow item={null} />
      </div>
    </div>
  );
}
