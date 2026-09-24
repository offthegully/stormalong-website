"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "./site-config";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "error"; message: string };

/**
 * Contact form. Like the newsletter, it will not show a confirmation
 * over a message that was never sent: if the mail provider is not
 * configured the route answers 501 and the visitor is told to write
 * directly instead. See app/api/contact/route.ts.
 */
const subjects = [
  { value: "general", label: "General" },
  { value: "distribution", label: "Distribution & trade" },
  { value: "events", label: "Events" },
  { value: "feedback", label: "Product feedback" },
  { value: "other", label: "Something else" },
];

const fieldClasses =
  "w-full border border-ink/25 bg-paper-light px-3.5 py-3 font-franklin text-[0.9rem] text-ink ph-tint placeholder:text-prose-faint focus:border-gold-dark focus:outline-none";

export function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ kind: "sending" });

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      subject: String(form.get("subject") ?? "general"),
      message: String(form.get("message") ?? ""),
      company: String(form.get("company") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setState({ kind: "done" });
      } else {
        setState({
          kind: "error",
          message:
            data.error ?? "Something went wrong. Try again, or email us.",
        });
      }
    } catch {
      setState({
        kind: "error",
        message: `Could not reach the server. Please email ${site.email}.`,
      });
    }
  }

  if (state.kind === "done") {
    return (
      <div role="status" className="ph-enter border-l-[3px] border-gold pl-5">
        <h3 className="ph-slab mb-2 text-xl">Message sent.</h3>
        <p className="font-franklin text-[0.92rem] leading-relaxed text-prose">
          We do our best to get back to you within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ph-contact-name" className="ph-label mb-2 block text-[0.53rem] text-prose-muted">
            Name
          </label>
          <input
            id="ph-contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="ph-contact-email" className="ph-label mb-2 block text-[0.53rem] text-prose-muted">
            Email
          </label>
          <input
            id="ph-contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="ph-contact-subject" className="ph-label mb-2 block text-[0.53rem] text-prose-muted">
          What is it about?
        </label>
        <select
          id="ph-contact-subject"
          name="subject"
          defaultValue="general"
          className={fieldClasses}
        >
          {subjects.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="ph-contact-message" className="ph-label mb-2 block text-[0.53rem] text-prose-muted">
          Message
        </label>
        <textarea
          id="ph-contact-message"
          name="message"
          required
          rows={6}
          placeholder="Your comment, suggestion or question."
          className={fieldClasses}
        />
      </div>

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
        // See the note on the newsletter's button: the pulse is what
        // separates "busy" from "broken" while the request is out.
        className={cn(
          "ph-press ph-label bg-brick px-7 py-3.5 text-paper hover:bg-brick-dark disabled:opacity-60",
          state.kind === "sending" && "animate-pulse",
        )}
      >
        {state.kind === "sending" ? "Sending…" : "Send"}
      </button>

      {state.kind === "error" && (
        <p
          role="alert"
          className="ph-enter mt-4 border-l-[3px] border-brick pl-4 font-franklin text-[0.85rem] leading-relaxed text-brick"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
