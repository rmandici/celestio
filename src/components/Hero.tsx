import React from "react";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 pt-16 pb-14 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-white/70">
        Hope Valley Park, England
      </p>
      <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-glow">
        CELESTIO FESTIVAL
      </h1>
      <p className="mt-3 text-xs uppercase tracking-[0.35em] text-festival-glow">
        25 August 2025
      </p>
      <div className="mt-8" id="tickets">
        <a className="btn-primary" href="#tickets">
          Book Tickets
        </a>
      </div>
    </section>
  );
}
