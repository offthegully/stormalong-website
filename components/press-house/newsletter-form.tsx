"use client";

import { useState } from "react";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "error"; message: string };

/**
 * Newsletter signup. Deliberately honest about failure: if the mailing
 * list is not connected the visitor is told their address was not
 * saved, rather than shown a confirmation over a black hole. See
 * app/api/newsletter/route.ts.
 */
export function NewsletterForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [email, setEmail] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ kind: "sending" });

    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: String(form.get("company") ?? ""),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setState({ kind: "done" });
        setEmail("");
      } else {
        setState({
          kind: "error",
          message: data.error ?? "Something went wrong. Try again?",
        });
      }
    } catch {
      setState({
        kind: "error",
        message: "Could not reach the server. Try again?",
      });
    }
  }

  if (state.kind === "done") {
    return (
      <p
        role="status"
        className="font-franklin text-[0.84rem] font-light leading-relaxed text-gold"
      >
        You're on the list. Watch for the next release.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex border border-paper/35 focus-within:border-gold">
        <label htmlFor="ph-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="ph-newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-grow bg-transparent px-3.5 py-3 font-franklin text-[0.82rem] text-paper placeholder:text-paper/45 focus:outline-none"
        />
        {/* Honeypot — hidden from people, irresistible to bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={state.kind === "sending"}
          className="ph-label shrink-0 bg-gold px-5 text-ink transition-colors hover:bg-gold-pale disabled:opacity-60"
        >
          {state.kind === "sending" ? "…" : "Sign up"}
        </button>
      </div>
      {state.kind === "error" && (
        <p
          role="alert"
          className="mt-2 font-franklin text-[0.78rem] font-light leading-relaxed text-gold"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
