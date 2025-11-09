"use client";
import dayjs from "dayjs";
import { LineChart } from "@/components/LineChart";
import { Timer } from "@/components/Timer";
import { addStudy, getStudy, getYT, saveYT, type YTItem } from "@/lib/storage";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

export default function StudyPage() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [yt, setYt] = useState<YTItem[]>(getYT());

  const saveTime = () => {
    const mins = hours * 60 + minutes;
    if (mins <= 0) return;
    addStudy(mins, dayjs().format("YYYY-MM-DD"));
    alert("??? ????");
  };

  const removeYt = (id: string) => {
    const next = yt.filter((i) => i.id !== id);
    setYt(next); saveYT(next);
  };

  const addYt = () => {
    if (!url || !title) return;
    const next = [...yt, { id: uuidv4(), title, url }];
    setYt(next); saveYT(next);
    setTitle(""); setUrl("");
  };

  const { labels, keys } = last7Days();
  const study = getStudy();
  const series = keys.map((k) => study.find((e) => e.date === k)?.minutes || 0);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">?????? ??????????</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">???</label>
              <input className="input w-full" type="number" min={0} value={hours} onChange={(e)=>setHours(parseInt(e.target.value||"0"))} />
            </div>
            <div>
              <label className="label">??????</label>
              <input className="input w-full" type="number" min={0} max={59} value={minutes} onChange={(e)=>setMinutes(parseInt(e.target.value||"0"))} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={saveTime}>??? ??? ???</button>
        </div>
        <Timer minutes={25} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg">? ???????? ?????? ?????</h2>
        <LineChart labels={labels} values={series} label="??????" />
      </div>

      <div className="card p-4 space-y-3">
        <h2 className="text-lg">YouTube ????????? ????</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <input className="input" placeholder="??????" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input className="input md:col-span-2" placeholder="URL" value={url} onChange={(e)=>setUrl(e.target.value)} />
        </div>
        <button className="btn btn-secondary" onClick={addYt}>???? ????</button>
        <div className="grid gap-2">
          {yt.map((i)=> (
            <div key={i.id} className="flex items-center justify-between bg-blueDeep/60 rounded-lg px-3 py-2">
              <a className="text-gold truncate" href={i.url} target="_blank" rel="noreferrer">{i.title}</a>
              <button className="text-red-300 text-sm" onClick={()=>removeYt(i.id)}>????</button>
            </div>
          ))}
          {yt.length===0 && <div className="text-sm text-gray-400">???? ???? ??????? ?????</div>}
        </div>
      </div>
    </div>
  );
}
