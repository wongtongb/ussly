"use client";

import { useFormStatus } from "react-dom";
import type { ActionState } from "./actions";

export const idleState: ActionState = { status: "idle" };

// Submit button that reflects the pending state of its enclosing <form action>.
export function SubmitButton({
  idle,
  pending,
  className,
}: {
  idle: string;
  pending: string;
  className?: string;
}) {
  const { pending: isPending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`${className ?? ""} disabled:opacity-60 disabled:cursor-progress`}
    >
      {isPending ? pending : idle}
    </button>
  );
}

// Renders the success/error message returned by an action.
export function Feedback({ state }: { state: ActionState }) {
  if (state.status === "idle" || !state.message) return null;
  const isError = state.status === "error";
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
        isError ? "text-accent" : "text-ink-muted"
      }`}
      role={isError ? "alert" : "status"}
    >
      {isError ? "✗" : "✓"} {state.message}
    </span>
  );
}

export function Field({
  label,
  col,
  children,
}: {
  label: string;
  col: string;
  children: React.ReactNode;
}) {
  return (
    <div className={col}>
      <label className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-transparent border-0 border-b border-rule focus:border-accent outline-none py-2 text-[15px] text-ink"
    />
  );
}
