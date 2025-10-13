import React, { useEffect, useMemo, useState } from "react";

type TimeLeft = { d: number; h: number; m: number; s: number };

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export default function Countdown({ className = "" }: { className?: string }) {
  const target = useMemo(() => new Date(2025, 11, 25, 19, 0, 0), []);
  const [t, setT] = useState<TimeLeft>(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const Unit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div
        className="
        leading-none font-semibold tabular-nums
        text-3xl sm:text-4xl md:text-5xl
        w-[3.2rem] sm:w-[3.6rem] md:w-[4.2rem] text-center
      "
        style={{ fontFamily: "Georgia, Times, 'Times New Roman', serif" }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-widest opacity-80">
        {label}
      </div>
    </div>
  );

  return (
    <div
      className={
        "select-none flex items-end gap-3 sm:gap-4 " + "text-white " + className
      }
      aria-label="Countdown până la 25 decembrie 2025"
    >
      <Unit value={t.d} label="Zile" />
      <span className="leading-none text-3xl sm:text-4xl md:text-5xl opacity-60">
        :
      </span>
      <Unit value={t.h} label="Ore" />
      <span className="leading-none text-3xl sm:text-4xl md:text-5xl opacity-60">
        :
      </span>
      <Unit value={t.m} label="Minute" />
      <span className="leading-none text-3xl sm:text-4xl md:text-5xl opacity-60">
        :
      </span>
      <Unit value={t.s} label="Secunde" />
    </div>
  );
}
