import aboutImg from "../assets/about-hero.jpg";

const About = () => {
  return (
    <section
      aria-labelledby="announcement-title"
      className="scroll-mt-20 md:scroll-mt-24 mt-10 mx-auto max-w-3xl text-left min-h-viewport"
      id="about"
    >
      <div className="grid gap-4 md:gap-1 md:grid-cols-2 items-start md:text-left text-center">
        {/* 1) stânga: titlu */}
        <h2 className="font-display md:text-left text-center text-3xl sm:text-4xl md:text-[40px] leading-tight text-white">
          <span className="underline decoration-2 underline-offset-[6px]">
            Ritmuri tribale.
          </span>
          <br />
          <span className="underline decoration-2 underline-offset-[6px]">
            Energie pură.
          </span>
          <br />
          <span className="underline decoration-2 underline-offset-[6px]">
            JOEZY vine la Celestio.
          </span>
        </h2>

        {/* 2) dreapta: paragraful 1 */}
        <div className="text-sm sm:text-[15px] leading-relaxed text-white/85 md:max-w-prose ">
          <p>
            Pe 25 decembrie, <strong>JOEZY</strong> revine în România și urcă pe
            scena
            <strong> Celestio Festival</strong> pentru un set care promite o
            explozie de energie, emoție și ritmuri afro-electronice. Cunoscut
            pentru fuziunea spectaculoasă dintre
            <em> Afro Beats</em> și <em> Electro Melodic</em>, Joezy a redefinit
            sunetul Afro House la nivel global.
          </p>
        </div>

        {/* 3) full width: paragrafele 2 + 3 */}
        <div className="md:col-span-2 text-sm sm:text-[15px] leading-relaxed text-white/85 space-y-4 border-t border-white/10 pt-6 md:text-left text-center">
          <p>
            Cu peste 60 de piese lansate la unele dintre cele mai importante
            labeluri internaționale, artistul creează o atmosferă hipnotică, în
            care fiecare beat devine o conexiune între oameni, dans și spirit.
            Pregătește-te pentru o noapte în care muzica depășește granițele
            unui party obișnuit!
          </p>

          <p className="text-white/80 text-center">
            <span className="font-semibold">
              JOEZY @ CELESTIO FESTIVAL — 25 DECEMBRIE | BAIA MARE @Sala
              Polivalentă Lascăr Pană
            </span>
          </p>
        </div>
      </div>

      {/* IMAGINEA MARE */}
      <div className="mt-10 relative rounded-2xl overflow-hidden ring-1 ring-white/10">
        <img
          src={aboutImg}
          loading="lazy"
          decoding="async"
          alt="Atmosferă Celestio Festival"
          className="w-full h-[42vh] sm:h-[50vh] md:h-[60vh] object-cover object-center"
        />
        {/* gradient subtil peste imagine pentru integrare cu fundalul */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-black/0 to-black/20" />
      </div>
    </section>
  );
};

export default About;
