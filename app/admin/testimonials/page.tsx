import { requireAdminPage } from "@/lib/supabase/require-admin";
import { upsertTestimonial, deleteTestimonial } from "../actions";
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

function QuoteRow({ item }: { item: Testimonial | null }) {
  const isNew = !item;
  return (
    <details className="group border-t border-ink py-5">
      <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-5 flex-1 min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted w-8 shrink-0">
            {item ? String(item.sort_order).padStart(2, "0") : "+"}
          </span>
          <span className="font-display-italic text-2xl text-ink truncate">
            {item ? `"${item.quote.slice(0, 60)}${item.quote.length > 60 ? "…" : ""}"` : "Add new quote"}
          </span>
        </div>
        <div className="flex items-baseline gap-4 shrink-0">
          {item && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              {item.name}
            </span>
          )}
          {item && !item.published && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Hidden
            </span>
          )}
          <span className="text-ink-muted group-open:rotate-180 transition-transform">⌃</span>
        </div>
      </summary>

      <form action={upsertTestimonial} className="mt-6 grid grid-cols-12 gap-x-6 gap-y-5">
        {item && <input type="hidden" name="id" value={item.id} />}

        <Field label="Quote" col="col-span-12">
          <textarea
            name="quote"
            defaultValue={item?.quote ?? ""}
            rows={4}
            className="w-full bg-transparent border border-rule focus:border-accent outline-none p-3 text-[15px] text-ink resize-none rounded-sm"
            required
          />
        </Field>

        <Field label="Name" col="col-span-6 md:col-span-3">
          <Input name="name" defaultValue={item?.name ?? ""} required />
        </Field>
        <Field label="Role" col="col-span-6 md:col-span-3">
          <Input name="role" defaultValue={item?.role ?? ""} required />
        </Field>
        <Field label="Organization" col="col-span-12 md:col-span-4">
          <Input name="org" defaultValue={item?.org ?? ""} required />
        </Field>
        <Field label="Sort order" col="col-span-6 md:col-span-2">
          <Input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} />
        </Field>

        <Field label="Accent color (text-accent or text-ink)" col="col-span-12 md:col-span-6">
          <Input name="accent" defaultValue={item?.accent ?? "text-accent"} />
        </Field>

        <div className="col-span-12 flex items-center justify-between gap-4 pt-4 border-t border-rule">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              defaultChecked={item ? item.published : true}
              className="peer sr-only"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border border-ink/15 text-ink-muted peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink transition-colors">
              Published
            </span>
          </label>

          <div className="flex items-center gap-3">
            {item && (
              <form
                action={async () => {
                  "use server";
                  await deleteTestimonial(item.id);
                }}
              >
                <button className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent transition-colors">
                  Delete
                </button>
              </form>
            )}
            <button className="bg-ink text-paper rounded-full px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors">
              {isNew ? "Add quote" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </details>
  );
}

function Field({ label, col, children }: { label: string; col: string; children: React.ReactNode }) {
  return (
    <div className={col}>
      <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-transparent border-0 border-b border-rule focus:border-accent outline-none py-2 text-[15px] text-ink"
    />
  );
}
