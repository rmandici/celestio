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

// câte cicluri ale listei bază compun pista (mare = fluid, dar fără crash)
const EXTENDED_CYCLES = 40; // ca la Souperior (gen 40–50)
const WINDOW_LEFT = 6; // câte carduri randăm în stânga indexului
const WINDOW_RIGHT = 6; // câte carduri randăm în dreapta + cele vizibile

/* Reveal on scroll */
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

const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function About() {
  // layout: 2 pe mobil, 4 pe desktop
  const [visible, setVisible] = useState(4);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const apply = () => setVisible(mq.matches ? 2 : 4);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // GROUP dinamic: 2 pe mobil, 1 pe desktop
  const group = visible === 2 ? 2 : 1;

  const base = useMemo(() => ITEMS.map((i) => i.img), []);
  const baseLen = base.length;
  const extendedLen = baseLen * EXTENDED_CYCLES;

  // „ancorăm” indexul în mijlocul pistei ca să avem loc în ambele sensuri
  const anchor = Math.floor(EXTENDED_CYCLES / 2) * baseLen;

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
      const rounded = Math.round(raw * dpr) / dpr;
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

  // index = slide-ul din stânga ferestrei, în coordonate „pistă extinsă”
  const [index, setIndex] = useState(anchor);
  const [animate, setAnimate] = useState(true);

  // realiniere când se schimbă layout-ul
  useEffect(() => {
    setAnimate(false);
    setIndex(anchor);
    requestAnimationFrame(() => setAnimate(true));
  }, [anchor, visible]);

  // controale (pas de `group`)
  const next = () => setIndex((i) => Math.round(i) + group);
  const prev = () => setIndex((i) => Math.round(i) - group);

  // Swipe pe pagini (Pointer Events) – mobil & desktop
  const [dragging, setDragging] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 40;

  const onPointerDown = (e: React.PointerEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest("[data-arrow]")) return;
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

  // recentrare INVIZIBILĂ doar când ne apropiem de capete, dar păstrăm
  // aceeași poziție logică (față de anchor)
  useEffect(() => {
    const low = baseLen * 2;
    const high = extendedLen - baseLen * 3;
    if (index < low || index > high) {
      const delta = index - anchor;
      const normalized = anchor + mod(delta, baseLen);
      setAnimate(false);
      setIndex(normalized);
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [index, baseLen, extendedLen, anchor]);

  // geometrie pistă (MARE ca la Souperior) + rotunjire la DPR
  const step = cardW + GAP_PX;
  const dpr =
    (typeof window !== "undefined" ? window.devicePixelRatio : 1) || 1;
  const translateX = Math.round(-(index * step) * dpr) / dpr;
  const trackW = Math.max(0, extendedLen * step - GAP_PX);

  // VIRTUALIZARE: randăm doar ferestra în jurul indexului ancorat pe pistă lungă
  const leftIdx = Math.floor(index) - WINDOW_LEFT;
  const rightIdx = Math.floor(index) + visible + WINDOW_RIGHT;
  const count = Math.max(0, rightIdx - leftIdx);

  // dots mobil (aliniate la `group`)
  const logicalLeft = mod(index - anchor, baseLen); // 0..baseLen-1
  const dotsCount = Math.ceil(baseLen / group);
  const activeDot = Math.floor(logicalLeft / group) % dotsCount;

  // reveal-on-scroll
  const { ref: revealRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.18,
    rootMargin: "0px 0px -12% 0px",
  });

  return (
    <section className="py-20 mx-3 md:mx-6 overflow-x-hidden">
      <div
        ref={revealRef}
        className={[
          "relative", // <-- fără overflow aici
          "transition-opacity duration-700", // doar fade
          inView ? "opacity-100" : "opacity-0",
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
              // stabilizare GPU + eliminare artefacte
              "[backface-visibility:hidden] [transform:translateZ(0)] will-change-transform",
              "[padding-bottom:1px]", // mic hack anti-fantă la bază
            ].join(" ")}
            aria-roledescription="carousel"
          >
            {/* TRACK LUNG (fluid) */}
            <div
              className="absolute inset-0 flex will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]"
              style={{
                gap: `${GAP_PX}px`,
                width: `${trackW}px`,
                transform: `translate3d(${translateX}px,0,0)`,
                transition: animate ? "transform 420ms ease" : "none",
              }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <div className="relative h-full">
                {Array.from({ length: count }).map((_, k) => {
                  const g = leftIdx + k; // index global pe pistă
                  const src = base[mod(g, baseLen)];
                  const left = Math.round(g * step * dpr) / dpr; // poziție rotunjită
                  const near = Math.abs(g - Math.round(index)) <= 3;

                  return (
                    <div
                      key={`${src}-${g}`}
                      className="absolute top-0 h-full"
                      style={{ left: `${left}px`, width: `${cardW}px` }}
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
                          alt=""
                          className="
                            absolute inset-0 w-full h-full object-cover
                            transition-transform duration-700 ease-out
                            md:will-change-transform
                            md:group-hover:scale-[1.04]
                            [backface-visibility:hidden] [transform:translateZ(0)]
                          "
                          loading={near ? "eager" : "lazy"}
                          {...({
                            fetchpriority: near ? "high" : "auto",
                          } as any)}
                          decoding="async"
                          draggable={false}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.55)_100%)]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Săgeți desktop (pas = group: 1 desktop / 2 mobil) */}
            <button
              data-arrow
              onClick={prev}
              aria-label="Anterior"
              className="
                hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20
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
                hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20
                h-9 w-9 items-center justify-center rounded-full
                ring-1 ring-white/70 text-white/90 backdrop-blur bg-black/30 hover:bg-black/40
              "
            >
              &#8250;
            </button>

            {/* Dots mobil (aliniate la group) */}
            <div className="lg:hidden absolute bottom-3 left-0 right-0 mx-auto flex items-center justify-center gap-2">
              {Array.from({ length: dotsCount }).map((_, i) => {
                const active = i === activeDot;
                return (
                  <span
                    key={i}
                    onClick={() => setIndex(anchor + i * group)}
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
