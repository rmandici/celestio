import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section className="relative min-h-viewport flex items-center" id="hero">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-white/70">
          Singurul festival de de Afro House din Romania de Crăciun!{" "}
          <div>Baia Mare @Sala Polivalentă Lascăr Pană</div>
        </p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-glow">
          CELESTIO FESTIVAL
        </h1>
        <p className="mt-3 text-xs uppercase tracking-[0.35em] text-festival-glow">
          25 Decembrie 2025
        </p>
        <div className="mt-8" id="tickets">
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
