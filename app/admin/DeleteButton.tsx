"use client";

import { useActionState } from "react";
import { SubmitButton, Feedback, idleState } from "./ui";
import type { ActionState } from "./actions";

// Standalone delete form: own action state, a confirm() gate so a single
// click can't destroy a row, pending state, and inline error feedback.
export function DeleteButton({
  id,
  label,
  action,
}: {
  id: string;
  label: string;
  action: (prev: ActionState, fd: FormData) => Promise<ActionState>;
}) {
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm(`Delete "${label}"? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
      className="flex items-center gap-3"
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton
        idle="Delete"
        pending="Deleting…"
        className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted hover:text-accent transition-colors"
      />
      {state.status === "error" && <Feedback state={state} />}
    </form>
  );
}
