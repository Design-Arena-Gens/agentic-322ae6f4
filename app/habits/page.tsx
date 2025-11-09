"use client";
import dayjs from "dayjs";
import { getHabits, saveHabits, getHabitTicks, setHabitTick, type Habit } from "@/lib/storage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(getHabits());
  const [name, setName] = useState("");
  const [today] = useState(dayjs().format("YYYY-MM-DD"));
  const [ticks, setTicks] = useState(getHabitTicks());

  useEffect(() => { saveHabits(habits); }, [habits]);

  const toggle = (id: string, done: boolean) => {
    setHabitTick(today, id, done);
    setTicks(getHabitTicks());
  };

  const addHabit = () => {
    if (!name) return;
    setHabits([...habits, { id: uuidv4(), name }]);
    setName("");
  };
  const removeHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">???? ??????</h1>
      <div className="card p-4 grid md:grid-cols-3 gap-3">
        <input className="input md:col-span-2" placeholder="???? ???" value={name} onChange={(e)=>setName(e.target.value)} />
        <button className="btn btn-secondary" onClick={addHabit}>??? ????</button>
      </div>
      <div className="space-y-2">
        {habits.map((h)=> {
          const done = !!ticks.find((t)=> t.date===today && t.habitId===h.id && t.done);
          return (
            <div key={h.id} className="flex items-center justify-between bg-blueDeep/60 rounded-lg px-3 py-2">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={done} onChange={(e)=>toggle(h.id, e.target.checked)} />
                <span>{h.name}</span>
              </label>
              <button className="text-red-300 text-sm" onClick={()=>removeHabit(h.id)}>????</button>
            </div>
          );
        })}
        {habits.length===0 && <div className="text-sm text-gray-400">???? ???? ?????</div>}
      </div>
    </div>
  );
}
