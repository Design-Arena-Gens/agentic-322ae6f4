"use client";
import { useEffect, useMemo, useState } from "react";

export default function ProgressCircle({ value = 0, label }: { value?: number; label: string }) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const duration = 800;
    const from = animated;
    const delta = value - from;
    let raf = 0;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimated(from + delta * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const radius = 54;
  const stroke = 10;
  const circ = 2 * Math.PI * radius;
  const dash = useMemo(() => (Math.max(0, Math.min(100, animated)) / 100) * circ, [animated, circ]);

  return (
    <div className="card p-4 flex flex-col items-center w-full">
      <svg width={140} height={140} className="progress-ring">
        <circle cx={70} cy={70} r={radius} stroke="#1f2a44" strokeWidth={stroke} fill="transparent" />
        <circle
          cx={70}
          cy={70}
          r={radius}
          stroke="#f0b429"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={`${dash} ${circ}`}
        />
      </svg>
      <div className="-mt-20 text-center">
        <div className="text-3xl font-bold text-gold">{Math.round(animated)}%</div>
        <div className="text-sm text-gray-300">{label}</div>
      </div>
    </div>
  );
}
