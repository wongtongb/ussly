import { requireAdminPage } from "@/lib/supabase/require-admin";
import { BriefControls } from "./BriefControls";
import type { Brief } from "@/lib/supabase/types";

export default async function BriefsPage() {
  const { admin } = await requireAdminPage();
  const { data: briefs } = await admin
    .from("briefs")
    .select("*")
    .order("created_at", { ascending: false });

  const rows = (briefs ?? []) as Brief[];

  return (
    <div>
      <header className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
            § I · Incoming
          </p>
          <h1 className="font-display text-5xl lg:text-6xl text-ink tracking-tight">
            Briefs<span className="text-accent font-display-italic">.</span>
          </h1>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {rows.length} total
        </span>
      </header>

      {rows.length === 0 ? (
        <p className="font-display-italic text-2xl text-ink-muted py-12 border-t border-ink">
          Nothing in the inbox.
        </p>
      ) : (
        <div className="space-y-0">
          {rows.map((b) => (
            <details
              key={b.id}
              className="group border-t border-ink py-5"
              {...(b.status === "new" ? { open: true } : {})}
            >
              <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6">
                <div className="flex items-baseline gap-5 flex-1 min-w-0">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.18em] w-16 shrink-0 ${
                      b.status === "new"
                        ? "text-accent"
                        : "text-ink-muted"
                    }`}
                  >
                    {b.status}
                  </span>
                  <span className="font-display text-2xl lg:text-3xl text-ink truncate">
                    {b.name}
                  </span>
                  <span className="font-display-italic text-lg text-ink-muted truncate hidden md:inline">
                    {b.project || "—"}
                  </span>
                </div>
                <div className="flex items-baseline gap-4 shrink-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    {new Date(b.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-ink-muted group-open:rotate-180 transition-transform">⌃</span>
                </div>
              </summary>

              <div className="mt-5 pl-0 md:pl-[5.25rem] grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-4">
                <div className="md:col-span-8">
                  <p className="text-ink leading-[1.6] text-[15px] whitespace-pre-wrap">
                    {b.message}
                  </p>
                </div>
                <div className="md:col-span-4 space-y-3">
                  <Meta label="Email">
                    <a
                      href={`mailto:${b.email}`}
                      className="text-ink underline decoration-accent decoration-2 underline-offset-4"
                    >
                      {b.email}
                    </a>
                  </Meta>
                  {b.budget && <Meta label="Budget">{b.budget}</Meta>}
                  {b.project && <Meta label="Project">{b.project}</Meta>}
                </div>
                <BriefControls brief={b} />
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-1">
        {label}
      </p>
      <p className="text-[14px] text-ink break-all">{children}</p>
    </div>
  );
}
