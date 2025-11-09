"use client";
import { useEffect, useRef, useState } from "react";

export function Timer({ minutes = 25 }: { minutes?: number }) {
  const [remaining, setRemaining] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setRemaining((s) => Math.max(0, s - 1));
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (remaining === 0 && running) {
      setRunning(false);
      try {
        const audio = new Audio("/ding.mp3");
        audio.play();
      } catch {}
      if (typeof window !== "undefined" && (Notification?.permission === "granted")) {
        new Notification("Pomodoro ?????");
      }
    }
  }, [remaining, running]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="card p-4 flex flex-col items-center gap-3">
      <div className="text-5xl font-mono tracking-widest text-gold">{mm}:{ss}</div>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={() => setRunning(true)}>????</button>
        <button className="btn btn-secondary" onClick={() => setRunning(false)}>??????</button>
        <button className="btn btn-secondary" onClick={() => { setRunning(false); setRemaining(minutes * 60); }}>?????</button>
      </div>
    </div>
  );
}
