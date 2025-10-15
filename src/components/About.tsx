import React, { useEffect, useRef, useState } from "react";
import HintTap from "./HintTap";
// TODO: schimbă cu imaginile tale
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import about3 from "../assets/about3.jpg";
import about4 from "../assets/about4.jpg";
import HintSwipe from "./HintSwipe";

type Item = { img: string; text: string };

const ITEMS: Item[] = [
  {
    img: about1,
    text: "Pe 25 decembrie, JOEZI revine în România și urcă pe scena Celestio Festival pentru un set care promite o explozie de energie, emoție și ritmuri afro-electronice.",
  },
  {
    img: about2,
    text: "Artistul francez care a revoluționat scena Afro House, aduce un sound hipnotic ce combină Afro Beats și Electro Melodic, creând o experiență senzorială intensă.",
  },
  {
    img: about3,
    text: "Cu peste 60 de piese lansate la unele dintre cele mai importante labeluri internaționale, artistul creează o atmosferă hipnotică, în care fiecare beat devine o conexiune între oameni, dans și spirit.\r\nPregătește-te pentru o noapte în care muzica depășește granițele unui party obișnuit! ",
  },
  {
    img: about4,
    text: "JOEZI @ Celestio Festival — 25 DECEMBRIE | BAIA MARE @Sala Polivalentă Lascăr Pană.",
  },
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

function AboutTile({ img, text }: Item) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [open, setOpen] = useState(false);

  return (
    <div
      ref={ref}
      className={[
        "relative overflow-hidden",
        "h-[58vh] md:h-[64vh] lg:h-[68vh]", // înălțime panou
        "rounded-none md:rounded-3xl ring-1 ring-white/10",
        "shadow-[0_25px_120px_rgba(0,0,0,0.75)]",
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        "cursor-pointer select-none",
      ].join(" ")}
      onClick={() => setOpen((v) => !v)}
      role="button"
      aria-pressed={open}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
    >
      <img
        src={img}
        alt=""
        className={[
          "absolute inset-0 w-full h-full object-cover",
          "transition-transform duration-700 ease-out",
          open ? "scale-[1.04]" : "scale-[1.0]",
          "pointer-events-none",
        ].join(" ")}
        draggable={false}
        loading="lazy"
        decoding="async"
      />
      {/* vignetă ușoară permanentă */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.55)_100%)]" />
      {/* overlay la click: blur + text */}
      <div
        className={[
          "absolute inset-0 grid place-items-center text-center p-5 sm:p-6",
          "transition-all duration-500 ease-out",
          open
            ? "opacity-100 backdrop-blur-md bg-black/45"
            : "opacity-0 backdrop-blur-0 bg-transparent",
        ].join(" ")}
        aria-hidden={!open}
      >
        <p className="max-w-[32ch] md:max-w-[40ch] text-white/95 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {text}
        </p>
      </div>
      <HintTap hidden={open} />
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
        {/* BUTOANELE – frați ai scroller-ului, poziționate în wrapperul relativ */}
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
            <AboutTile img={ITEMS[0].img} text={ITEMS[0].text} />
            <AboutTile img={ITEMS[1].img} text={ITEMS[1].text} />
          </div>
          {/* Ecran 2 */}
          <div className="shrink-0 snap-center [scroll-snap-stop:always] w-[calc(100vw-24px)] grid grid-cols-2 gap-3">
            <AboutTile img={ITEMS[2].img} text={ITEMS[2].text} />
            <AboutTile img={ITEMS[3].img} text={ITEMS[3].text} />
          </div>
        </div>
        <HintSwipe />
      </div>

      {/* ===== Desktop/tabletă: 4 coloane pe o singură linie, full-width ===== */}
      <div className="hidden md:block overflow-hidden">
        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {/* GRID IMAGINI – neschimbat, fără pt-8 */}
          <div className="grid grid-cols-4 w-screen gap-3 px-4">
            {ITEMS.map((it, i) => (
              <div key={i} className="col-span-1">
                <AboutTile img={it.img} text={it.text} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
