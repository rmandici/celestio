import joeziImg from "../assets/aboutJoezi.png";

export default function JoeziSection() {
  return (
    <section
      id="joezi"
      className="flex items-center"
      aria-labelledby="joezi-title"
    >
      <div className="w-full mx-auto max-w-6xl px-4">
        <div
          className="
            relative h-full overflow-hidden rounded-3xl
            bg-black/45 backdrop-blur
            shadow-[0_25px_120px_rgba(0,0,0,0.75)]
          "
        >
          {/* două coloane pe md+, stivuite pe mobil */}
          <div className="grid h-full md:grid-cols-2">
            {/* imagine – ~40vh pe mobil ca să rămânem în 80% total */}
            <div className="relative h-[40vh] sm:h-[44vh] md:h-auto md:min-h-[70vh]">
              <img
                src={joeziImg}
                alt="Joezi live"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.7)_100%)]" />
            </div>

            {/* text – mobil compact, md+ generos */}
            <div className="p-5 sm:p-8 md:p-12 flex items-center">
              <div className="w-full text-center md:text-left">
                <p className="text-[9px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.35em] text-festival-glow">
                  Invitat special
                </p>

                <h2
                  id="joezi-title"
                  className="
        mt-2
        font-display
        text-2xl sm:text-4xl md:text-6xl
        leading-snug sm:leading-tight
        text-white
      "
                >
                  JOEZI — Afro House redefinit
                </h2>

                <div
                  className="
        mt-3 sm:mt-4
        space-y-3 sm:space-y-4
        text-white/90
        text-sm sm:text-lg md:text-xl
        leading-relaxed
        max-w-prose mx-auto md:mx-0
      "
                >
                  <p>
                    Pe <strong>25 decembrie</strong>, <strong>JOEZI</strong>{" "}
                    revine în România și urcă pe scena{" "}
                    <strong>Celestio Festival</strong> pentru un set care
                    promite o explozie de energie, emoție și ritmuri
                    afro-electronice.
                  </p>
                  <p>
                    Cunoscut pentru fuziunea spectaculoasă dintre{" "}
                    <em>Afro Beats</em> și
                    <em> Electro Melodic</em>, Joezi a redefinit sunetul
                    <strong> Afro House</strong> la nivel global.
                  </p>
                </div>

                <div
                  className="
        mt-5 sm:mt-6
        flex flex-wrap gap-2 sm:gap-3
        justify-center md:justify-start
      "
                >
                  <a
                    href="#tickets"
                    className="
          inline-flex items-center
          px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3.5
          rounded-full
          bg-festival-glow text-black
          text-xs sm:text-sm md:text-lg
          font-semibold hover:shadow-glow transition
        "
                  >
                    Ia-ți bilet
                  </a>
                  <a
                    href="https://www.youtube.com/results?search_query=joezi+afro+house"
                    target="_blank"
                    rel="noreferrer"
                    className="
          inline-flex items-center
          px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3.5
          rounded-full
          ring-1 ring-white/20 text-white
          text-xs sm:text-sm md:text-lg
          hover:bg-white/10 transition
        "
                  >
                    Vezi seturi
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ornament discret jos pe desktop */}
          <div className="absolute inset-x-8 bottom-6 hidden md:flex items-center gap-3 opacity-60">
            <span className="h-px flex-1 bg-white/15" />
            <span className="h-1 w-1 rounded-full bg-festival-glow" />
            <span className="h-px flex-1 bg-white/15" />
          </div>
        </div>
      </div>
    </section>
  );
}
