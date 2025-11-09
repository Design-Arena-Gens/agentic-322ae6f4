"use client";
import dayjs from "dayjs";
import { addSleep, getSleep } from "@/lib/storage";
import { LineChart } from "@/components/LineChart";
import { useState } from "react";

function last7Days() {
  const labels: string[] = [];
  const keys: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = dayjs().subtract(i, "day");
    labels.push(d.format("DD MMM"));
    keys.push(d.format("YYYY-MM-DD"));
  }
  return { labels, keys };
}

export default function SleepPage() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const save = () => {
    if (!start || !end) return;
    const s = dayjs(start, "HH:mm");
    let e = dayjs(end, "HH:mm");
    if (e.isBefore(s)) e = e.add(1, "day");
    const hours = parseFloat(((e.diff(s, "minute")/60)).toFixed(2));
    addSleep({ date: dayjs().format("YYYY-MM-DD"), start, end, hours });
    alert("??? ??? ????");
  };

  const { labels, keys } = last7Days();
  const sleep = getSleep();
  const series = keys.map((k) => sleep.find((e) => e.date === k)?.hours || 0);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">??? ??????</h1>
      <div className="card p-4 grid md:grid-cols-3 gap-3">
        <div>
          <label className="label">??????? (HH:mm)</label>
          <input className="input w-full" placeholder="22:30" value={start} onChange={(e)=>setStart(e.target.value)} />
        </div>
        <div>
          <label className="label">???? (HH:mm)</label>
          <input className="input w-full" placeholder="06:30" value={end} onChange={(e)=>setEnd(e.target.value)} />
        </div>
        <div className="flex items-end">
          <button className="btn btn-primary w-full" onClick={save}>??? ???</button>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-lg">? ???????? ???</h2>
        <LineChart labels={labels} values={series} label="???" />
      </div>
    </div>
  );
}
