import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json();
    const bearer = req.headers.get("authorization");
    const key = bearer?.startsWith("Bearer ") ? bearer.slice(7) : process.env.OPENAI_API_KEY;
    if (!key) return NextResponse.json({ error: "No API key" }, { status: 401 });

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        ...(system ? [{ role: "system", content: system }] : []),
        ...(messages || [])
      ].slice(-24),
      temperature: 0.4
    };

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const t = await res.text();
      return NextResponse.json({ error: t }, { status: 500 });
    }
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ reply });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "error" }, { status: 500 });
  }
}
