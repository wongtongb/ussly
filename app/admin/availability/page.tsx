import { getAdminSupabase } from "@/lib/supabase/admin";
import { updateAvailability } from "../actions";
import type { Availability } from "@/lib/supabase/types";

export default async function AvailabilityPage() {
  const admin = getAdminSupabase();
  const { data } = await admin
    .from("availability")
    .select("*")
    .eq("id", 1)
    .single();

  const a = data as Availability | null;

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-3">
          § II · The ribbon
        </p>
        <h1 className="font-display text-5xl lg:text-6xl text-ink tracking-tight">
          Booking state<span className="text-accent font-display-italic">.</span>
        </h1>
        <p className="mt-4 max-w-xl text-ink/75 text-[15px] leading-[1.55]">
          What the homepage ribbon broadcasts to every visitor. Update this when
          a slot fills or opens — the public site re-renders on save.
        </p>
      </header>

      <form action={updateAvailability} className="grid grid-cols-12 gap-x-6 gap-y-8 max-w-3xl">
        <Field label="Is open" col="col-span-12">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_open"
              defaultChecked={a?.is_open ?? true}
              className="peer sr-only"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-1.5 rounded-full border border-ink/15 text-ink-muted peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink transition-colors">
              Open for booking
            </span>
          </label>
        </Field>

        <Field label="Booking label" col="col-span-12 md:col-span-6">
          <Input name="booking_label" defaultValue={a?.booking_label ?? ""} />
        </Field>

        <Field label="Slots left" col="col-span-12 md:col-span-6">
          <Input name="slots_left" type="number" min={0} defaultValue={a?.slots_left ?? 0} />
        </Field>

        <Field label="Next open label" col="col-span-12 md:col-span-6">
          <Input name="next_open_label" defaultValue={a?.next_open_label ?? ""} />
        </Field>

        <Field label="After label" col="col-span-12 md:col-span-6">
          <Input name="after_label" defaultValue={a?.after_label ?? ""} />
        </Field>

        <div className="col-span-12 pt-4 border-t border-rule flex items-center gap-4">
          <button className="bg-ink text-paper rounded-full px-6 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Save & publish
          </button>
          {a?.updated_at && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Last updated · {new Date(a.updated_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
            </span>
          )}
        </div>
      </form>
    </div>
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
      className="w-full bg-transparent border-0 border-b border-rule focus:border-accent outline-none py-2 text-[16px] text-ink"
    />
  );
}
