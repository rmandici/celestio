import Countdown from "./Countdown";
import celestioLogo from "../assets/celestio_logo.png";
import { useEffect } from "react";

function useScrollBlur() {
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const t = Math.min(1, y / (h * 0.6)); // 0 → 1 în ~60% din ecran
      const max = 14; // blur maxim (px) — ajustează
      const blur = (t * max).toFixed(2) + "px";
      document.body.style.setProperty("--scroll-blur", blur);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // setare inițială
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

export default function Hero() {
  useScrollBlur();
  return (
    <section className="relative min-h-viewport flex items-center" id="hero">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-white/70">
          Singurul festival de Afro House din Romania de Crăciun!{" "}
          <div>Baia Mare @Sala Polivalentă Lascăr Pană</div>
        </p>
        <a
          href="#home"
          className="inline-flex flex-col items-start gap-1 mt-10"
        >
          <img
            src={celestioLogo}
            alt="Celestio Festival"
            className="h-100 sm:h-120 md:h-140 w-auto object-contain"
            width={820} // pune dimensiunile reale ale png-ului dacă le știi
            height={420} // ajută la CLS
            loading="eager"
            decoding="async"
          />
          {/* dacă vrei subtitlu sub logo, păstrezi: */}
          <div className="font-display text-xs sm:text-sm tracking-wide mx-auto">
            Christmas Edition
          </div>
        </a>
        <p className="mt-3 text-xs uppercase tracking-[0.35em] text-festival-glow">
          25 Decembrie 2025
        </p>
        <div className="mt-8">
          <a
            className="btn-primary"
            href="https://www.livetickets.ro/bilete/celestio-christmass-edition"
            target="_blank"
          >
            Bilete disponibile acum
          </a>
        </div>
        {/* Countdown - desktop */}
        <div className="mt-10 flex justify-center">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
