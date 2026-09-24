import { NextResponse } from "next/server";
import { z } from "zod";

const SignupSchema = z.object({
  email: z.string().email(),
  /** Honeypot. Real people leave it empty; bots fill everything in. */
  company: z.string().max(0).optional(),
});

/**
 * Newsletter signup.
 *
 * The canvas review found the current form collects addresses and
 * discards them. This route refuses to do that quietly: when no
 * provider is configured it returns 501 with `configured: false`, and
 * the form tells the visitor their address was not stored rather than
 * showing a green tick over a black hole.
 *
 * To turn it on, set NEWSLETTER_AUDIENCE_ID and RESEND_API_KEY.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = SignupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  // Honeypot tripped — accept silently so the bot learns nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, subscribed: true }, { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.NEWSLETTER_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error:
          "The mailing list is not connected yet, so your address was not saved.",
      },
      { status: 501 },
    );
  }

  const res = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: parsed.data.email,
        unsubscribed: false,
      }),
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, configured: true, error: "Could not sign you up just now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, subscribed: true }, { status: 200 });
}
