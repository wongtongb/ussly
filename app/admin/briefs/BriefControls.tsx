"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { setBriefStatus, saveBriefNotes, deleteBrief } from "../actions";
import { SubmitButton, Feedback, idleState } from "../ui";
import { DeleteButton } from "../DeleteButton";
import type { Brief, BriefStatus } from "@/lib/supabase/types";

const statuses: BriefStatus[] = ["new", "replied", "archived"];

function StatusButton({
  status,
  current,
}: {
  status: BriefStatus;
  current: BriefStatus;
}) {
  const { pending } = useFormStatus();
  const active = current === status;
  return (
    <button
      type="submit"
      name="status"
      value={status}
      disabled={active || pending}
      className={`font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border transition-colors disabled:cursor-not-allowed ${
        active
          ? "bg-ink text-paper border-ink"
          : "border-ink/15 text-ink-muted hover:border-ink hover:text-ink disabled:opacity-60"
      }`}
    >
      Mark {status}
    </button>
  );
}

export function BriefControls({ brief }: { brief: Brief }) {
  const [statusState, statusAction] = useActionState(setBriefStatus, idleState);
  const [notesState, notesAction] = useActionState(saveBriefNotes, idleState);

  return (
    <div className="md:col-span-12 space-y-5 pt-5 mt-2 border-t border-rule">
      <form action={notesAction}>
        <input type="hidden" name="id" value={brief.id} />
        <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-1.5">
          Private notes
        </label>
        <textarea
          name="notes"
          defaultValue={brief.notes ?? ""}
          rows={2}
          placeholder="Track follow-ups, quotes sent, next step…"
          className="w-full bg-transparent border border-rule focus:border-accent outline-none p-3 text-[14px] text-ink resize-none rounded-sm"
        />
        <div className="mt-2 flex items-center gap-3">
          <SubmitButton
            idle="Save notes"
            pending="Saving…"
            className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border border-ink/15 text-ink-muted hover:border-ink hover:text-ink transition-colors"
          />
          <Feedback state={notesState} />
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <form action={statusAction} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="id" value={brief.id} />
          {statuses.map((s) => (
            <StatusButton key={s} status={s} current={brief.status} />
          ))}
          <Feedback state={statusState} />
        </form>
        <div className="ml-auto">
          <DeleteButton id={brief.id} label={brief.name} action={deleteBrief} />
        </div>
      </div>
    </div>
  );
}
