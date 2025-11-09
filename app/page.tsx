"use client";
import ProgressCircle from "@/components/ProgressCircle";
import { LineChart } from "@/components/LineChart";
import dayjs from "dayjs";
import { getSettings, getStudy, getSleep, getHabitTicks, getHabits } from "@/lib/storage";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

export default function HomePage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const settings = getSettings();
  const study = getStudy();
  const sleep = getSleep();
  const habits = getHabits();
  const habitTicks = getHabitTicks();

  const today = dayjs().format("YYYY-MM-DD");

  const studyMinToday = study.find((e) => e.date === today)?.minutes || 0;
  const studyPct = Math.min(100, Math.round((studyMinToday / (settings.studyTargetMin || 120)) * 100));

  const sleepHoursToday = sleep.find((e) => e.date === today)?.hours || 0;
  const sleepPct = Math.min(100, Math.round((sleepHoursToday / (settings.sleepTargetHours || 8)) * 100));

  const todayHabitCount = habits.length;
  const todayDone = habits.filter((h) => habitTicks.find((t) => t.date === today && t.habitId === h.id && t.done)).length;
  const habitsPct = todayHabitCount ? Math.round((todayDone / todayHabitCount) * 100) : 0;

  const { labels, keys } = last7Days();
  const studySeries = keys.map((k) => study.find((e) => e.date === k)?.minutes || 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressCircle label="?????? %" value={studyPct} />
        <ProgressCircle label="??? %" value={sleepPct} />
        <ProgressCircle label="???? %" value={habitsPct} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h2 className="text-lg">? ???????? ?????? ??????</h2>
          <LineChart labels={labels} values={studySeries} label="??????" />
        </div>
        <div className="space-y-3">
          <h2 className="text-lg">?????? ??????</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/study" className="btn btn-primary text-center">??????</Link>
            <Link href="/sleep" className="btn btn-primary text-center">???</Link>
            <Link href="/habits" className="btn btn-primary text-center">????</Link>
            <Link href="/chat" className="btn btn-primary text-center">AI ???</Link>
          </div>
          <div className="card p-4 text-sm text-gray-300">
            ???? ?????: {dayjs().format("DD MMM YYYY, dddd")}
          </div>
        </div>
      </div>
    </div>
  );
}
