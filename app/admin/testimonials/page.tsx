import { requireAdminPage } from "@/lib/supabase/require-admin";
import { QuoteRow } from "./TestimonialRows";
import type { Testimonial } from "@/lib/supabase/types";

export default async function TestimonialsAdminPage() {
  const { admin } = await requireAdminPage();
  const { data } = await admin
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  const rows = (data ?? []) as Testimonial[];

  return (
    <div>
      <header className="mb-12 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
            § IV · Words
          </p>
          <h1 className="font-display text-5xl lg:text-6xl text-ink tracking-tight">
            Testimonials<span className="text-accent font-display-italic">.</span>
          </h1>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          {rows.length} quote{rows.length === 1 ? "" : "s"}
        </span>
      </header>

      <div className="space-y-0">
        {rows.map((t) => (
          <QuoteRow key={t.id} item={t} />
        ))}
        <QuoteRow item={null} />
      </div>
    </div>
  );
}
