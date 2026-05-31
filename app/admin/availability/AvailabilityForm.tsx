"use client";

import { useActionState } from "react";
import { updateAvailability } from "../actions";
import { SubmitButton, Feedback, Field, Input, idleState } from "../ui";
import type { Availability } from "@/lib/supabase/types";

export default function AvailabilityForm({ a }: { a: Availability | null }) {
  const [state, formAction] = useActionState(updateAvailability, idleState);

  return (
    <form action={formAction} className="grid grid-cols-12 gap-x-6 gap-y-8 max-w-3xl">
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
        <Input name="booking_label" defaultValue={a?.booking_label ?? ""} required />
      </Field>

      <Field label="Slots left" col="col-span-12 md:col-span-6">
        <Input
          name="slots_left"
          type="number"
          min={0}
          max={99}
          defaultValue={a?.slots_left ?? 0}
        />
      </Field>

      <Field label="Next open label" col="col-span-12 md:col-span-6">
        <Input name="next_open_label" defaultValue={a?.next_open_label ?? ""} required />
      </Field>

      <Field label="After label" col="col-span-12 md:col-span-6">
        <Input name="after_label" defaultValue={a?.after_label ?? ""} />
      </Field>

      <div className="col-span-12 pt-4 border-t border-rule flex flex-wrap items-center gap-4">
        <SubmitButton
          idle="Save & publish"
          pending="Saving…"
          className="bg-ink text-paper rounded-full px-6 py-3 text-sm font-medium hover:bg-accent transition-colors"
        />
        <Feedback state={state} />
        {a?.updated_at && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Last updated ·{" "}
            {new Date(a.updated_at).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        )}
      </div>
    </form>
  );
}
