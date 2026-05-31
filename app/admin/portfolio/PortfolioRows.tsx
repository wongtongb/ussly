"use client";

import { useActionState } from "react";
import { upsertPortfolio, deletePortfolio } from "../actions";
import { SubmitButton, Feedback, Field, Input, idleState } from "../ui";
import { DeleteButton } from "../DeleteButton";
import type { PortfolioItem } from "@/lib/supabase/types";

export function ProjectRow({ item }: { item: PortfolioItem | null }) {
  const isNew = !item;
  const [state, formAction] = useActionState(upsertPortfolio, idleState);

  return (
    <details className="group border-t border-ink py-5">
      <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-5 flex-1 min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted w-12 shrink-0">
            {item ? `№ ${item.num}` : "+"}
          </span>
          <span className="font-display text-2xl lg:text-3xl text-ink truncate">
            {item ? item.title : "Add new project"}
          </span>
          {item && (
            <span className="font-display-italic text-lg text-ink-muted truncate hidden md:inline">
              {item.italic}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-4 shrink-0">
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

        <Field label="Sort order" col="col-span-4 md:col-span-2">
          <Input name="sort_order" type="number" min={0} defaultValue={item?.sort_order ?? 0} />
        </Field>
        <Field label="Number" col="col-span-4 md:col-span-2">
          <Input name="num" defaultValue={item?.num ?? ""} required />
        </Field>
        <Field label="Year" col="col-span-4 md:col-span-2">
          <Input name="year" defaultValue={item?.year ?? ""} required />
        </Field>
        <Field label="Title" col="col-span-12 md:col-span-6">
          <Input name="title" defaultValue={item?.title ?? ""} required />
        </Field>

        <Field label="Italic subtitle" col="col-span-12 md:col-span-6">
          <Input name="italic" defaultValue={item?.italic ?? ""} />
        </Field>
        <Field label="Live URL" col="col-span-12 md:col-span-6">
          <Input name="url" type="url" defaultValue={item?.url ?? ""} required />
        </Field>

        <Field label="Domain (display)" col="col-span-12 md:col-span-6">
          <Input name="domain" defaultValue={item?.domain ?? ""} required />
        </Field>
        <Field label="Accent gradient (Tailwind)" col="col-span-12 md:col-span-6">
          <Input
            name="accent"
            defaultValue={item?.accent ?? "from-amber-700 via-orange-800 to-stone-900"}
          />
        </Field>

        <Field label="Roles (comma-separated)" col="col-span-12 md:col-span-6">
          <Input
            name="role"
            defaultValue={item?.role.join(", ") ?? ""}
            placeholder="Web design, Build, Copy"
          />
        </Field>
        <Field label="Palette swatches (Tailwind classes, comma-separated)" col="col-span-12 md:col-span-6">
          <Input
            name="palette"
            defaultValue={item?.palette.join(", ") ?? ""}
            placeholder="bg-[#7A2F0E], bg-[#C8501E], bg-[#EBC591]"
          />
        </Field>

        <Field label="Description" col="col-span-12">
          <textarea
            name="description"
            defaultValue={item?.description ?? ""}
            rows={3}
            className="w-full bg-transparent border border-rule focus:border-accent outline-none p-3 text-[15px] text-ink resize-none rounded-sm"
            required
          />
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
              idle={isNew ? "Add project" : "Save"}
              pending="Saving…"
              className="bg-ink text-paper rounded-full px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
            />
          </div>
        </div>
      </form>

      {item && (
        <div className="mt-3 flex justify-end">
          <DeleteButton id={item.id} label={item.title} action={deletePortfolio} />
        </div>
      )}
    </details>
  );
}
