"use client";
import { useEffect, useRef, useState } from "react";
import { getSettings, saveSettings } from "@/lib/storage";

type Msg = { role: "user"|"assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "???????! ?? Learnnova. ??????, ???, ??? ?????????? ??? ??? ????" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(getSettings().apiKey || "");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(()=> { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", content: input };
    setMessages((m)=> [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}) },
        body: JSON.stringify({ messages: [...messages, userMsg], system: "?? ????????????????? ????? ????? ??? ?????? AI ??????? ????." })
      });
      const data = await res.json();
      const content = data.reply || "???????, ????? ??? ???? ????.";
      setMessages((m)=> [...m, { role: "assistant", content }]);
    } catch (e) {
      setMessages((m)=> [...m, { role: "assistant", content: "??????? ??????. ???? ?????? ??????? ???." }]);
    } finally { setLoading(false); }
  };

  const storeKey = () => {
    const s = getSettings(); s.apiKey = apiKey; saveSettings(s);
    alert("API key ??? ????");
  };

  return (
    <div className="grid gap-4">
      <div className="card p-3 flex gap-2">
        <input className="input flex-1" placeholder="OpenAI API key (??????)" value={apiKey} onChange={(e)=>setApiKey(e.target.value)} />
        <button className="btn btn-secondary" onClick={storeKey}>???</button>
      </div>
      <div className="card p-4 h-[60vh] overflow-y-auto space-y-3">
        {messages.map((m, i)=> (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className={"inline-block px-3 py-2 rounded-lg max-w-[85%] " + (m.role==="user"?"bg-gold text-black":"bg-blueDeep/80")}>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2">
        <input className="input flex-1" placeholder="????? ?????? ???? ????" value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==="Enter") send(); }} />
        <button className="btn btn-primary" onClick={send} disabled={loading}>{loading?"????? ???...":"?????"}</button>
      </div>
    </div>
  );
}
