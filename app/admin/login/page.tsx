"use client";

import { useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const supabase = getBrowserSupabase();
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    });
    if (err) {
      setStatus("error");
      setError(err.message);
      return;
    }
    setStatus("sent");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border border-ink/10 rounded-sm p-8 bg-paper"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-6">
          ◍ Admin · sign in
        </div>
        <h1 className="font-display text-4xl text-ink leading-tight mb-6">
          Ussly admin.
        </h1>
        <label
          htmlFor="email"
          className="block font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@ussly.design"
          className="w-full bg-transparent border-0 border-b border-rule focus:border-accent outline-none py-2 text-base"
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="mt-6 w-full bg-ink text-paper rounded-full py-3 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : status === "sent" ? "Check your inbox" : "Send magic link"}
        </button>
        {status === "sent" && (
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            ✓ Link sent. Click it to come back here.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            ✗ {error}
          </p>
        )}
      </form>
    </main>
  );
}
