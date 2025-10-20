import React, { useEffect, useRef, useState } from "react";
// FĂRĂ HintTap
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";
import about4 from "../assets/about4.jpg";
import HintSwipe from "./HintSwipe";

type Item = { img: string };

const ITEMS: Item[] = [
  { img: about1 },
  { img: about2 },
  { img: about3 },
  { img: about4 },
];

/* Hook mic pentru apariție la scroll */
function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(!!e.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px", ...opts }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [opts]);
  return { ref, inView };
}

function AboutTile({ img }: Item) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={[
        "group relative overflow-hidden",
        "h-[58vh] md:h:[64vh] lg:h-[68vh]",
        "rounded-none md:rounded-3xl ring-1 ring-white/10",
        "shadow-[0_25px_120px_rgba(0,0,0,0.75)]",
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        // doar cursor normal; nu mai e clickable
        "select-none",
      ].join(" ")}
    >
      <img
        src={img}
        alt=""
        className={[
          "absolute inset-0 w-full h-full object-cover",
          "transition-transform duration-700 ease-out will-change-transform",
          // zoom fin DOAR pe desktop/tabletă
          "md:group-hover:scale-[1.04]",
        ].join(" ")}
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      {/* vignetă ușoară permanentă */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

const About = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0); // 0 sau 1, avem 2 ecrane

  const scrollToPage = (p: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const pad = 24; // px — același ca în px-3 (12+12)
    const x = p * (window.innerWidth - pad);
    el.scrollTo({ left: x, behavior: "smooth" });
    setPage(p);
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const pad = 24;
    const w = window.innerWidth - pad;
    const p = Math.round(el.scrollLeft / w);
    if (p !== page) setPage(Math.max(0, Math.min(1, p)));
  };

  return (
    <section className="py-20">
      {/* ===== Mobile: 2 ecrane, fiecare cu 2 tile-uri ===== */}
      <div className="md:hidden w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] relative">
        {/* BUTOANELE */}
        <button
          aria-label="Anterior"
          onClick={() => scrollToPage(0)}
          disabled={page === 0}
          className="absolute z-20 left-3 top-1/2 -translate-y-1/2
               w-9 h-9 grid place-items-center rounded-full
               bg-black/45 ring-1 ring-white/20 backdrop-blur
               disabled:opacity-30 disabled:cursor-default"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6l-6 6 6 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          aria-label="Următor"
          onClick={() => scrollToPage(1)}
          disabled={page === 1}
          className="absolute z-20 right-3 top-1/2 -translate-y-1/2
               w-9 h-9 grid place-items-center rounded-full
               bg-black/45 ring-1 ring-white/20 backdrop-blur
               disabled:opacity-30 disabled:cursor-default"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* SCROLLER-UL */}
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="
              flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth
              gap-3 px-3
              touch-pan-x [overscroll-behavior-x:contain]
              [-ms-overflow-style:none] [scrollbar-width:none]
              [scroll-padding-left:12px] [scroll-padding-right:12px]
            "
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Ecran 1 */}
          <div className="shrink-0 snap-center [scroll-snap-stop:always] w-[calc(100vw-24px)] grid grid-cols-2 gap-3">
            <AboutTile img={ITEMS[0].img} />
            <AboutTile img={ITEMS[1].img} />
          </div>
          {/* Ecran 2 */}
          <div className="shrink-0 snap-center [scroll-snap-stop:always] w-[calc(100vw-24px)] grid grid-cols-2 gap-3">
            <AboutTile img={ITEMS[2].img} />
            <AboutTile img={ITEMS[3].img} />
          </div>
        </div>

        {/* Dacă nu mai vrei și HintSwipe, poți șterge următoarea linie */}
        <HintSwipe />
      </div>

      {/* ===== Desktop/tabletă: 4 coloane pe o singură linie ===== */}
      <div className="hidden md:block overflow-hidden">
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="grid grid-cols-4 w-screen gap-3 px-4">
            {ITEMS.map((it, i) => (
              <div key={i} className="col-span-1">
                <AboutTile img={it.img} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
