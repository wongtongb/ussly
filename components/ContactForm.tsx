"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

const projectTypes = [
  "New website",
  "Redesign / refresh",
  "Brand + site",
  "Just a question",
];

const budgets = ["< $3k", "$3k–$6k", "$6k–$12k", "$12k+", "Not sure yet"];
const CUSTOM = "__custom__";

function formatCustomBudget(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  const n = parseInt(digits, 10);
  return `$${n.toLocaleString("en-US")} (custom)`;
}

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedBudget, setSelectedBudget] = useState<string>(budgets[0]);
  const [customBudget, setCustomBudget] = useState<string>("");

  useEffect(() => {
    if (state.status === "ok") {
      formRef.current?.reset();
      setSelectedBudget(budgets[0]);
      setCustomBudget("");
    }
  }, [state.status]);

  const isCustom = selectedBudget === CUSTOM;
  const budgetValue = isCustom ? formatCustomBudget(customBudget) : selectedBudget;

  return (
    <form
      ref={formRef}
      action={action}
      className="bg-paper text-ink rounded-sm border border-ink/10 p-7 lg:p-8"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-6 flex items-center justify-between">
        <span>◍ Project brief</span>
        <span className="text-accent">§ 01 / 04</span>
      </div>

      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0"
        aria-hidden="true"
      />

      <div className="space-y-5">
        {/* Name */}
        <Field label="Name" htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Frankie Carter"
            className="form-input"
            autoComplete="name"
          />
        </Field>

        {/* Email */}
        <Field label="Email" htmlFor="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@yourbusiness.com"
            className="form-input"
            autoComplete="email"
          />
        </Field>

        {/* Project type */}
        <Field label="Project type" htmlFor="project">
          <select
            id="project"
            name="project"
            className="form-input appearance-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>
              Choose one
            </option>
            {projectTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>

        {/* Budget */}
        <Field label="Budget" htmlFor="budget">
          <div className="flex flex-wrap gap-1.5">
            {[...budgets, CUSTOM].map((b) => {
              const checked = selectedBudget === b;
              const label = b === CUSTOM ? "Custom $" : b;
              return (
                <label key={b} className="group cursor-pointer relative flex items-center">
                  <input
                    type="radio"
                    name="budget_choice"
                    value={b}
                    checked={checked}
                    onChange={() => setSelectedBudget(b)}
                    className="peer sr-only"
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-full border border-ink/15 text-ink-muted transition-colors peer-checked:bg-ink peer-checked:text-paper peer-checked:border-ink hover:border-ink/40">
                    {label}
                  </span>
                </label>
              );
            })}
          </div>
          {isCustom && (
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-2xl text-accent leading-none">$</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9,]*"
                placeholder="5,400"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value.replace(/[^\d,]/g, ""))}
                aria-label="Custom budget amount in USD"
                className="form-input flex-1 max-w-[200px] font-display text-2xl"
                autoFocus
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                USD
              </span>
            </div>
          )}
          <input type="hidden" name="budget" value={budgetValue} />
        </Field>

        {/* Message */}
        <Field label="Tell us what you're after" htmlFor="message" required>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="A few sentences about the business, what's wrong with the current site, and any deadlines."
            className="form-input resize-none"
          />
        </Field>
      </div>

      {/* Status message */}
      {state.status === "error" && (
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent border-l-2 border-accent pl-3">
          ✗ {state.message}
        </p>
      )}
      {state.status === "ok" && (
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink border-l-2 border-ink pl-3">
          ✓ {state.message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="group mt-7 w-full inline-flex items-center justify-center gap-2 bg-ink text-paper px-6 py-3.5 rounded-full text-sm font-medium hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-wait"
      >
        {pending ? (
          <>
            <span className="inline-block w-3 h-3 rounded-full border-2 border-paper/40 border-t-paper animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send brief
            <span className="arrow-pop">↗</span>
          </>
        )}
      </button>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted text-center">
        Reply within 24 hours. No spam, ever.
      </p>

      <style>{`
        .form-input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--color-rule);
          padding: 8px 0 10px;
          font-family: inherit;
          font-size: 16px;
          color: var(--color-ink);
          transition: border-color 0.2s ease;
          outline: none;
        }
        .form-input:focus {
          border-bottom-color: var(--color-accent);
        }
        .form-input::placeholder {
          color: color-mix(in oklab, var(--color-ink-muted) 60%, transparent);
        }
        .form-input:focus::placeholder {
          color: color-mix(in oklab, var(--color-ink-muted) 35%, transparent);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-1.5"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
