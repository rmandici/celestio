import Countdown from "./Countdown";
import celestioLogo from "../assets/celestio_logo.png";
import joeziLogo from "../assets/joezi_logo.png";
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
    <section className="relative min-h-viewport flex items-center">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <a className="inline-flex flex-col items-center gap-1">
          {/* logo + badge la dreapta (md+) */}
          <div className="relative inline-block">
            <img
              src={celestioLogo}
              alt="Celestio Festival"
              className="h-100 sm:h-120 md:h-140 w-auto object-contain block"
              width={820}
              height={420}
              loading="eager"
              decoding="async"
            />

            {/* Badge la dreapta, centrat pe verticală, NU afectează centrare logo */}
            <span
              className="
                      
                      hidden md:inline-block absolute sm:bottom-4 left-full -translate-y-1/2 -ml-5
                      font-display text-xs tracking-wide text-white/90
                      px-3 py-1 rounded-full
                      whitespace-nowrap
                    "
            >
              Christmas Edition
            </span>
          </div>
          <span
            className="my-auto inline-flex items-center gap-3
                   text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/85"
          >
            <i className="block h-px w-10 bg-white/25" />
            prezintă
            <i className="block h-px w-10 bg-white/25" />
          </span>
          <img
            src={joeziLogo}
            alt="JOEZI"
            className="
                    mt-auto h-16 sm:h-20 md:h-[90px] object-contain block
                                              /* alb pe fundal închis */
                    [filter:brightness(.95)_invert(1)_sepia(.25)_saturate(180%)_hue-rotate(330deg)_brightness(1.05)_contrast(.98)]  /* auriu cald pe md+ */
                  "
            width={250}
            height={150}
            loading="eager"
            decoding="async"
          />
        </a>
        <p className="text-xl md:text-3xl uppercase  text-white/70 my-auto pt-5">
          Singurul festival de Afro House din Romania de Crăciun!{" "}
        </p>
        <p className="pt-2 my-auto text-xs uppercase tracking-[0.35em] text-festival-glow">
          25 Decembrie 2025
        </p>
        <div className="my-auto pt-4">
          <a
            className="btn-primary"
            href="https://www.livetickets.ro/bilete/celestio-christmass-edition"
            target="_blank"
          >
            Bilete disponibile acum
          </a>
        </div>
        {/* Countdown - desktop */}
        <div className="my-auto pt-8">
          <div className="relative mx-auto max-w-4xl">
            {/* wrapperul ăsta dă înălțimea “reală” */}
            <div className="min-h-[56px] sm:min-h-[110px] md:min-h-[128px] flex items-center justify-center">
              <Countdown />
            </div>
          </div>
        </div>
        {/* SLOGAN (mobil: static în flux; md+: absolut jos peste poster) */}
        <div
          className="
    mt-4 px-2               /* mobil: intră normal în flux, puțin spațiu sus */
    md:mt-0 md:px-0         /* md+: reset */
    md:pointer-events-none
    
  "
        >
          <div
            className="
      mx-auto max-w-6xl text-center
      md:backdrop-blur-[2px] md:bg-black/20
      rounded-2xl
      py-2.5 md:py-4
    "
          >
            {/* linia 1 */}
            <p
              className="
        font-display text-glow text-transparent bg-clip-text
        bg-gradient-to-r from-[#FFD66E] to-[#FF9A3C]
        text-lg sm:text-xl md:text-3xl lg:text-4xl font-semibold tracking-wide
        leading-snug md:leading-tight
      "
            >
              <span className="block md:inline">RITMURI TRIBALE.</span>
              <span className="block md:inline md:mx-3">ENERGIE PURĂ.</span>
            </p>

            {/* linia 2 */}
            <p
              className="
        mt-0.5 md:mt-2
        font-display text-glow text-transparent bg-clip-text
        bg-gradient-to-r from-[#FFD66E] to-[#FF9A3C]
        text-lg sm:text-xl md:text-3xl lg:text-4xl font-semibold tracking-wide
      "
            >
              JOEZY VINE LA CELESTIO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
