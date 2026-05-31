"use client";

import { useActionState } from "react";
import { upsertTestimonial, deleteTestimonial } from "../actions";
import { SubmitButton, Feedback, Field, Input, idleState } from "../ui";
import { DeleteButton } from "../DeleteButton";
import type { Testimonial } from "@/lib/supabase/types";

export function QuoteRow({ item }: { item: Testimonial | null }) {
  const isNew = !item;
  const [state, formAction] = useActionState(upsertTestimonial, idleState);

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

      <form action={formAction} className="mt-6 grid grid-cols-12 gap-x-6 gap-y-5">
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
          <Input name="sort_order" type="number" min={0} defaultValue={item?.sort_order ?? 0} />
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

          <div className="flex items-center gap-4">
            <Feedback state={state} />
            <SubmitButton
              idle={isNew ? "Add quote" : "Save"}
              pending="Saving…"
              className="bg-ink text-paper rounded-full px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
            />
          </div>
        </div>
      </form>

      {item && (
        <div className="mt-3 flex justify-end">
          <DeleteButton id={item.id} label={item.name} action={deleteTestimonial} />
        </div>
      )}
    </details>
  );
}
