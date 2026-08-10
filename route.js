// app/api/tailor/route.js
// Next.js 14 App Router API route (deploy on Vercel).
// This is the ONLY endpoint that costs you money per-call (Claude API usage),
// so it's also the only place you need real abuse protection.

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // server-side only, never expose to client
);

const SYSTEM_PROMPT = `You are an expert resume writer and career coach. You rewrite resume bullet
points and draft cover letters so they closely match a specific job posting, using the posting's own
language wherever it is truthful to do so. You NEVER invent experience, employers, titles, dates, or
skills the candidate did not provide. You only rephrase and reprioritize what is already true.

Rules:
- Preserve every factual claim (employer, title, dates, metrics) exactly as given.
- Mirror the job posting's key terms/skills ONLY where the resume already supports them.
- Keep each bullet under 2 lines. Use strong action verbs. Quantify where the original had numbers.
- Output valid JSON only, matching the schema you're given. No prose outside the JSON.`;

export async function POST(req) {
  try {
    const { userId, resumeText, jobText } = await req.json();

    if (!userId || !resumeText || !jobText) {
      return Response.json({ error: "Missing resumeText, jobText, or userId" }, { status: 400 });
    }
    if (resumeText.length > 8000 || jobText.length > 8000) {
      return Response.json({ error: "Input too long" }, { status: 400 });
    }

    // 1. Check + decrement credits BEFORE the paid API call (atomic RPC — see supabase/schema.sql)
    const { data: creditResult, error: creditError } = await supabase.rpc("consume_credit", {
      p_user_id: userId,
    });
    if (creditError || !creditResult) {
      return Response.json({ error: "No credits remaining. Upgrade to Pro for unlimited." }, { status: 402 });
    }

    // 2. Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `JOB POSTING:\n${jobText}\n\nCANDIDATE RESUME:\n${resumeText}\n\nReturn JSON with this exact shape:\n{"match_score": number (0-100), "tailored_bullets": [{"original": string, "tailored": string}], "cover_letter": string}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      // Refund the credit if the API call itself failed
      await supabase.rpc("refund_credit", { p_user_id: userId });
      const errText = await response.text();
      return Response.json({ error: "Generation failed, credit refunded", detail: errText }, { status: 502 });
    }

    const data = await response.json();
    const rawText = data.content?.find((b) => b.type === "text")?.text || "{}";
    const clean = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    // 3. Log the generation (for quality review / abuse monitoring — not required)
    await supabase.from("generations").insert({
      user_id: userId,
      match_score: parsed.match_score,
    });

    return Response.json(parsed);
  } catch (err) {
    console.error("tailor route error:", err);
    return Response.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
