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
const REPEAT = 12;

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
  // 2 pe mobil, 4 pe desktop
  const [visible, setVisible] = useState(4);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setVisible(mq.matches ? 2 : 4);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const base = ITEMS.map((i) => i.img);
  const baseLen = base.length;

  // track extins pentru infinit
  const extended = useMemo(() => {
    const arr: string[] = [];
    for (let i = 0; i < REPEAT; i++) arr.push(...base);
    return arr;
  }, [base]);

  // viewport + măsurare card width (folosește lățimea secțiunii, nu padding)
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [cardW, setCardW] = useState(0);
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const calc = () => {
      const w = el.clientWidth;
      const visibleGaps = (visible - 1) * GAP_PX;
      setCardW(Math.max(0, (w - visibleGaps) / visible));
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

  // start la mijlocul track-ului
  const startIndex = useMemo(() => Math.floor(REPEAT / 2) * baseLen, [baseLen]);
  const [index, setIndex] = useState(startIndex);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(false);
    setIndex(startIndex);
    requestAnimationFrame(() => setAnimate(true));
  }, [startIndex]);

  const next = () => setIndex((i) => Math.round(i) + 1);
  const prev = () => setIndex((i) => Math.round(i) - 1);

  // ===== Drag fluid pe mobil: fără setState în mișcare =====
  const trackRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ active: false, startX: 0, startIndex: 0 });
  const rafId = useRef<number | null>(null);
  const tempIndexRef = useRef<number>(index);
  const stepRef = useRef<number>(0);
  useEffect(() => {
    stepRef.current = cardW + GAP_PX;
  }, [cardW]);

  useEffect(() => {
    const el = viewportRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-arrow]")) return;
      drag.current.active = true;
      drag.current.startX = e.clientX;
      drag.current.startIndex = Math.round(index);
      tempIndexRef.current = drag.current.startIndex;
      setAnimate(false);
      el.setPointerCapture(e.pointerId);
    };

    let lastDx = 0;
    const paint = () => {
      const step = stepRef.current || 1;
      const temp = drag.current.startIndex - lastDx / step;
      tempIndexRef.current = temp;
      const x = -(temp * step);
      track.style.transform = `translate3d(${x}px,0,0)`;
      rafId.current = null;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      lastDx = e.clientX - drag.current.startX;
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(paint);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!drag.current.active) return;
      el.releasePointerCapture(e.pointerId);
      drag.current.active = false;
      const snapped = Math.round(tempIndexRef.current);
      setIndex(snapped);
      setAnimate(true);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [index]);

  // infinit: recentrare invizibilă
  useEffect(() => {
    const step = stepRef.current || cardW + GAP_PX;
    if (!step) return;

    // ținem departe limitele ca să fie rar
    const low = baseLen * 2;
    const high = baseLen * (REPEAT - 4);

    if (index < low || index > high) {
      const track = trackRef.current;
      if (!track) return;

      // poziția curentă (în pixeli) înainte de normalizare
      const prevX = -(index * step);

      // index „normalizat” înapoi spre mijloc
      const delta = index - startIndex;
      const normalized = startIndex + (((delta % baseLen) + baseLen) % baseLen);

      // pregătim fără animație
      track.style.transition = "none";
      setAnimate(false);
      setIndex(normalized);

      // păstrăm EXACT aceeași poziție vizuală (modulo perioada)
      const nextX = -(normalized * step);
      const period = baseLen * step;
      const k = Math.round((nextX - prevX) / period);
      const visualX = nextX - k * period;
      track.style.transform = `translate3d(${visualX}px,0,0)`;

      // pe următorul frame dăm controlul înapoi lui React + animației
      requestAnimationFrame(() => {
        track.style.transition = ""; // lasă CSS-ul existent
        setAnimate(true);
      });
    }
  }, [index, baseLen, startIndex, cardW]);

  // transform & track
  const step = cardW + GAP_PX;
  const translateX = -(index * step);
  const trackW = extended.length * step - GAP_PX;

  // dots pe mobil (grupate 2)
  const logicalLeft = ((Math.round(index) % baseLen) + baseLen) % baseLen;
  const group = Math.max(1, Math.min(visible, 2));
  const dotsCount = Math.ceil(baseLen / group);
  const activeDot = Math.floor(logicalLeft / group) % dotsCount;

  // reveal-on-scroll
  const { ref: revealRef, inView } = useInView<HTMLDivElement>({
    threshold: 0.18,
    rootMargin: "0px 0px -12% 0px",
  });

  return (
    // Gutiere pe SECTIUNE, cum ai cerut (mx), + protecție de overflow X
    <section className="py-20 mx-3 md:mx-6 overflow-x-hidden">
      <div
        ref={revealRef}
        className={[
          "relative select-none",
          "transition-all duration-700 ease-out",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        ].join(" ")}
      >
        {/* wrapper relativ – pentru HintSwipe sub viewport */}
        <div className="relative">
          {/* VIEWPORT (fără px; mx e pe secțiune) */}
          <div
            ref={viewportRef}
            className="
              relative overflow-hidden
              h-[58vh] md:h-[64vh] lg:h-[68vh]
              [touch-action:pan-y]
              cursor-grab active:cursor-grabbing
            "
            aria-roledescription="carousel"
          >
            {/* TRACK */}
            <div
              ref={trackRef}
              className="absolute inset-0 flex will-change-transform"
              style={{
                gap: `${GAP_PX}px`,
                width: `${trackW}px`,
                transform: `translate3d(${translateX}px,0,0)`,
                transition: animate ? "transform 420ms ease" : "none",
              }}
            >
              {extended.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="
                    relative shrink-0 h-full
                    [content-visibility:auto]
                    [contain:layout_paint]
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
                      "
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.55)_100%)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Săgeți desktop */}
            <button
              data-arrow
              onPointerDown={(e) => e.stopPropagation()}
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
              onPointerDown={(e) => e.stopPropagation()}
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

            {/* Dots mobil */}
            <div className="md:hidden absolute bottom-3 left-0 right-0 mx-auto flex items-center justify-center gap-2">
              {Array.from({ length: dotsCount }).map((_, i) => {
                const active = i === activeDot;
                return (
                  <span
                    key={i}
                    onClick={() => setIndex(startIndex + i * group)}
                    className={`h-1.5 rounded-full transition-all ${
                      active ? "w-6 bg-white" : "w-2 bg-white/60"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* HintSwipe sub slider (vizibil pe mobil) */}
          <HintSwipe />
        </div>
      </div>
    </section>
  );
}
