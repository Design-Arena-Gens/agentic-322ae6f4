"use client";
import { getSettings, saveSettings, resetAll } from "@/lib/storage";
import { useState } from "react";

export default function SettingsPage() {
  const [study, setStudy] = useState(getSettings().studyTargetMin || 120);
  const [sleep, setSleep] = useState(getSettings().sleepTargetHours || 8);

  const save = () => {
    const s = getSettings();
    s.studyTargetMin = study; s.sleepTargetHours = sleep; saveSettings(s);
    alert("???????? ??? ??????");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">????????</h1>
      <div className="card p-4 grid md:grid-cols-2 gap-3">
        <div>
          <label className="label">??????? ?????? ?????? (??????)</label>
          <input className="input w-full" type="number" value={study} onChange={(e)=>setStudy(parseInt(e.target.value||"0"))} />
        </div>
        <div>
          <label className="label">??? ?????? (???)</label>
          <input className="input w-full" type="number" value={sleep} onChange={(e)=>setSleep(parseInt(e.target.value||"0"))} />
        </div>
        <div className="md:col-span-2 flex gap-2">
          <button className="btn btn-primary" onClick={save}>??? ???</button>
          <button className="btn btn-secondary" onClick={()=>{ if(confirm("???? ???? ????????");) { resetAll(); alert("???? ?????"); location.reload(); } }}>???? ?????</button>
        </div>
      </div>
      <div className="text-sm text-gray-400">?????? ????: ?????</div>
    </div>
  );
}
