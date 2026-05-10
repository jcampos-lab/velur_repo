import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("[waitlist] POST received");

  const { email } = await req.json();
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  console.log("[waitlist] signup:", email);

  // Optional: forward to Loops (set LOOPS_API_KEY in environment)
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

  console.log("[waitlist] done");
  return NextResponse.json({ ok: true });
}
