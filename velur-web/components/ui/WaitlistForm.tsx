"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type State = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const { t } = useLanguage();
  const c = t.contact;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-line bg-paper rounded-2xl p-10 flex flex-col gap-4">
        <span className="font-mono text-xs text-amber uppercase tracking-widest">✓ Done</span>
        <p className="font-sans font-bold text-ink text-2xl leading-snug">{c.formSuccess}</p>
        <p className="font-mono text-xs text-muted">{c.formNote}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line bg-paper rounded-2xl p-8 md:p-10 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="waitlist-email" className="font-mono text-xs uppercase tracking-widest text-muted">
          Email
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={c.formPlaceholder}
          disabled={state === "loading"}
          className="font-sans text-base text-ink bg-cream border border-line rounded-xl px-5 py-4 placeholder:text-muted focus:outline-none focus:border-ink transition-colors duration-150 disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex items-center justify-center gap-2 bg-ink text-paper font-sans font-medium text-base px-6 py-4 rounded-full hover:bg-amber transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Sending…" : c.formBtn}
      </button>

      {state === "error" && (
        <p className="font-mono text-xs text-red-500">Something went wrong — try again or email us at hello@velur.io</p>
      )}

      <p className="font-mono text-xs text-muted">{c.formNote}</p>
    </form>
  );
}
