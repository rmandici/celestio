import React, { useEffect, useMemo, useRef, useState } from "react";
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";
import about4 from "../assets/about4.jpg";
import about5 from "../assets/about5.jpg";
import about6 from "../assets/about6.jpg";
import about7 from "../assets/about7.jpg";
import about8 from "../assets/about8.jpg";
import HintSwipe from "./HintSwipe";

type Item = { img: string };

const ITEMS: Item[] = [
  { img: about1 },
  { img: about2 },
  { img: about3 },
  { img: about4 },
  { img: about5 },
  { img: about6 },
  { img: about7 },
  { img: about8 },
];

const GAP_PX = 12;
const REPEAT = 16;

/* Reveal on scroll – ca înainte */
function useInView<T extends HTMLElement>(
  opts: IntersectionObserverInit = {
    threshold: 0.15,
    rootMargin: "0px 0px -5% 0px",
  }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(!!e.isIntersecting),
      opts
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [opts]);
  return { ref, inView };
}

export default function About() {
  // 2 pe mobil, 4 pe desktop (layout vizibil)
  const [visible, setVisible] = useState(4);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setVisible(mq.matches ? 2 : 4);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // GROUP dinamic: 2 pe mobil, 1 pe desktop
  const group = visible === 2 ? 2 : 1;

  const base = ITEMS.map((i) => i.img);
  const baseLen = base.length;

  // track extins pentru “infinit”
  const extended = useMemo(() => {
    const arr: string[] = [];
    for (let i = 0; i < REPEAT; i++) arr.push(...base);
    return arr;
  }, [base]);

  // viewport + măsurare card width (rotunjit la DPR ca să evităm fante)
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [cardW, setCardW] = useState(0);
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const calc = () => {
      const w = el.clientWidth;
      const visibleGaps = (visible - 1) * GAP_PX;
      const dpr = window.devicePixelRatio || 1;
      const raw = (w - visibleGaps) / visible;
      const rounded = Math.round(raw * dpr) / dpr; // ⟵ rotunjire la DPR
      setCardW(Math.max(0, rounded));
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    window.addEventListener("resize", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [visible]);

  // index = slide-ul din stânga ferestrei
  const calcStartIndex = (vis: number) => {
    const mid = Math.floor(REPEAT / 2) * baseLen;
    return mid;
  };

  const [index, setIndex] = useState(() => calcStartIndex(visible));
  const [animate, setAnimate] = useState(true);

  // realiniere când se schimbă nr. vizibile
  useEffect(() => {
    setAnimate(false);
    setIndex(calcStartIndex(visible));
    requestAnimationFrame(() => setAnimate(true));
  }, [visible, baseLen]);

  // controale (pas de "group": 2 pe mobil, 1 pe desktop)
  const next = () => setIndex((i) => Math.round(i) + group);
  const prev = () => setIndex((i) => Math.round(i) - group);

  // Swipe pe pagini (Pointer Events) – mobil & desktop
  const [dragging, setDragging] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 40; // px

  const onPointerDown = (e: React.PointerEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest("[data-arrow]")) return; // nu capturăm pe săgeți
    swipeStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStartX.current != null) {
      const delta = e.clientX - swipeStartX.current;
      if (Math.abs(delta) > SWIPE_THRESHOLD) {
        delta < 0 ? next() : prev();
      }
      swipeStartX.current = null;
    }
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  // infinit: recentrare invizibilă (rară, fără salt)
  useEffect(() => {
    const low = baseLen * 2;
    const high = baseLen * (REPEAT - 3);
    if (index < low || index > high) {
      const delta = index - calcStartIndex(visible);
      const normalized =
        calcStartIndex(visible) + (((delta % baseLen) + baseLen) % baseLen);
      setAnimate(false);
      setIndex(normalized);
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [index, baseLen, visible]);

  // transform & track — rotunjit la DPR ca să nu apară “fante”
  const step = cardW + GAP_PX;
  const dpr =
    (typeof window !== "undefined" ? window.devicePixelRatio : 1) || 1;
  const translateX = Math.round(-(index * step) * dpr) / dpr;
  const trackW = extended.length * step - GAP_PX;

  // dots pe mobil (grupate pe `group`)
  const logicalLeft = ((index % baseLen) + baseLen) % baseLen;
  const dotsCount = Math.ceil(baseLen / group);
  const activeDot = Math.floor(logicalLeft / group) % dotsCount;

  // reveal-on-scroll
  const { ref: revealRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.18,
    rootMargin: "0px 0px -12% 0px",
  });

  return (
    // gutter pe secțiune cu mx, + protecție overflow X
    <section className="py-20 mx-3 md:mx-6 overflow-x-hidden">
      <div
        ref={revealRef}
        className={[
          "relative select-none",
          "transition-all duration-700 ease-out",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        ].join(" ")}
      >
        <div className="relative">
          {/* VIEWPORT */}
          <div
            ref={viewportRef}
            className={[
              "relative overflow-hidden",
              "h-[58vh] md:h-[64vh] lg:h-[68vh]",
              "[touch-action:pan-y] select-none",
              dragging ? "cursor-grabbing" : "cursor-grab",
            ].join(" ")}
            aria-roledescription="carousel"
          >
            {/* TRACK */}
            <div
              className="absolute inset-0 flex will-change-transform"
              style={{
                gap: `${GAP_PX}px`,
                width: `${trackW}px`,
                transform: `translate3d(${translateX}px,0,0)`,
                transition: animate ? "transform 420ms ease" : "none",
              }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              {extended.map((src, i) => {
                // preîncărcăm vecinii apropiați pentru a evita blink-ul
                const near = Math.abs(i - Math.round(index)) <= 3;
                return (
                  <div
                    key={`${src}-${i}`}
                    className="
                      relative shrink-0 h-full
                    "
                    style={{ width: `${cardW}px` }}
                  >
                    <div
                      className="
                        group relative overflow-hidden h-full
                        rounded-none md:rounded-3xl ring-1 ring-white/10
                        shadow-[0_25px_120px_rgba(0,0,0,0.75)]
                      "
                    >
                      <img
                        src={src}
                        alt={`slide ${(i % baseLen) + 1}`}
                        className="
                          absolute inset-0 w-full h-full object-cover
                          transition-transform duration-700 ease-out
                          md:will-change-transform
                          md:group-hover:scale-[1.04]
                          [backface-visibility:hidden] [transform:translateZ(0)]
                        "
                        loading={near ? "eager" : "lazy"}
                        // bypass TS până când tipurile React prind fetchpriority
                        {...({ fetchpriority: near ? "high" : "auto" } as any)}
                        decoding="async"
                        draggable={false}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.55)_100%)]" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Săgeți desktop (sar cu `group`: 1 desktop / 2 mobil) */}
            <button
              data-arrow
              onClick={prev}
              aria-label="Anterior"
              className="
                hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20
                h-9 w-9 items-center justify-center rounded-full
                ring-1 ring-white/70 text-white/90 backdrop-blur bg-black/30 hover:bg-black/40
              "
            >
              &#8249;
            </button>
            <button
              data-arrow
              onClick={next}
              aria-label="Următor"
              className="
                hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20
                h-9 w-9 items-center justify-center rounded-full
                ring-1 ring-white/70 text-white/90 backdrop-blur bg-black/30 hover:bg-black/40
              "
            >
              &#8250;
            </button>

            {/* Dots mobil (aliniate la `group`) */}
            <div className="md:hidden absolute bottom-3 left-0 right-0 mx-auto flex items-center justify-center gap-2">
              {Array.from({ length: dotsCount }).map((_, i) => {
                const active = i === activeDot;
                return (
                  <span
                    key={i}
                    onClick={() =>
                      setIndex(calcStartIndex(visible) + i * group)
                    }
                    className={`h-1.5 rounded-full transition-all ${
                      active ? "w-6 bg-white" : "w-2 bg-white/60"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* HintSwipe sub slider (mobil) */}
          <HintSwipe />
        </div>
      </div>
    </section>
  );
}
