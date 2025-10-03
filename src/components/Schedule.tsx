import React from "react";
import { stages } from "../data/lineup";

export default function Schedule() {
  return (
    <section
      id="lineup"
      className="mx-auto max-w-5xl px-4 pb-24 overflow-x-hidden"
    >
      <div className="relative grid grid-cols-2 gap-16">
        {/* linia verticală centrală (doar pe >= md) */}
        <div className="block absolute left-1/2 top-0 bottom-0 w-px bg-white/25 pointer-events-none" />

        {stages.map((stage, colIdx) => (
          <div key={stage.name} className="pt-10">
            <h3
              className={`text-xs uppercase tracking-[0.35em] text-white/60 pb-10
              ${colIdx === 0 ? "text-right" : "text-left"}`}
            >
              {stage.name}
            </h3>

            <ul className="mt-2 space-y-20">
              {stage.slots.map((s, i) => {
                // Pentru intercalare: mutăm în jos item-urile „pare” din coloana din dreapta
                const staggerRight = colIdx === 1 && i % 2 === 0 ? "mt-20" : "";
                const dotSide =
                  colIdx === 0
                    ? "dot-left pr-10 text-right"
                    : "dot-right pl-10";
                return (
                  <li
                    key={`${stage.name}-${s.start}`}
                    className={`relative ${dotSide} ${staggerRight}`}
                  >
                    <div className="text-[11px] text-festival-glow/90 tracking-widest">
                      {s.start} - {s.end}
                    </div>

                    <div className="mt-1 text-lg md:text-xl font-semibold">
                      {s.url ? (
                        <a
                          href={s.url}
                          className="hover:text-festival-glow transition-colors"
                        >
                          {s.artist}
                        </a>
                      ) : (
                        s.artist
                      )}
                    </div>

                    <div className="text-[10px] text-white/40">
                      {s.artist.replace(/\s+/g, "").toLowerCase()}.com
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
