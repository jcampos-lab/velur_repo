import { NextRequest, NextResponse } from "next/server";

/**
 * Waitlist endpoint.
 * Every signup is emailed to hello@velur.io via Resend (set
 * RESEND_API_KEY in Vercel env). Optionally also forwarded to Loops
 * (LOOPS_API_KEY). Signups are always logged, so nothing is lost even
 * before the keys are configured.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  console.log("[waitlist] signup:", { email, name, hasMessage: Boolean(message) });

  // Email the signup to the founder inbox via Resend.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Until the velur.io domain is verified in Resend, use their
          // onboarding sender; swap WAITLIST_FROM once verified.
          from: process.env.WAITLIST_FROM ?? "Velur Waitlist <onboarding@resend.dev>",
          to: [process.env.WAITLIST_TO ?? "hello@velur.io"],
          reply_to: email,
          subject: `New waitlist signup: ${email}`,
          text: [
            `A new signup just landed on velur.io`,
            ``,
            `Email:   ${email}`,
            `Name:    ${name || "(not provided)"}`,
            `Message: ${message || "(not provided)"}`,
            ``,
            `Sent: ${new Date().toISOString()}`,
          ].join("\n"),
        }),
      });
      if (!res.ok) {
        console.error("[waitlist] Resend error:", res.status, await res.text());
      }
    } catch (err) {
      console.error("[waitlist] Resend error:", err);
    }
  } else {
    console.warn("[waitlist] RESEND_API_KEY not set, signup only logged");
  }

  // Optional: keep contacts in Loops as well.
  const loopsKey = process.env.LOOPS_API_KEY;
  if (loopsKey) {
    try {
      await fetch("https://app.loops.so/api/v1/contacts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loopsKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "velur-waitlist" }),
      });
    } catch (err) {
      console.error("[waitlist] Loops error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
