import { NextResponse } from "next/server"
import { z } from "zod"

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
})

// Map internal select values to readable subjects
const SUBJECT_LABELS: Record<string, string> = {
  general: "General Inquiry",
  distribution: "Distribution",
  events: "Events",
  tours: "Taproom Tours",
  feedback: "Product Feedback",
  other: "Other",
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", issues: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = parsed.data

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO = process.env.CONTACT_TO_EMAIL
    const FROM = process.env.CONTACT_FROM_EMAIL || "no-reply@stormalong.dev"

    if (!RESEND_API_KEY || !TO) {
      // Email not configured – accept but do not send to avoid blocking UX in non-prod
      return NextResponse.json(
        { ok: true, delivered: false, reason: "Email not configured" },
        { status: 200 }
      )
    }

    const humanSubject = SUBJECT_LABELS[subject] ?? subject
    const finalSubject = `[Contact] ${humanSubject} — ${name}`

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(humanSubject)}</p>
        <hr />
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: finalSubject,
        html,
        reply_to: email,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: "Email provider error", details: text },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true, delivered: true }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

