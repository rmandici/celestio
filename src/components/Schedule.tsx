import joezy from "../assets/joezy.jpg";
import lepah from "../assets/lepah.jpg";
import volt from "../assets/volt.png";

export default function Schedule() {
  return (
    <section
      className="scroll-mt-16 md:scroll-mt-16 mx-auto max-w-5xl px-4 py-10 min-h-viewport"
      id="lineup"
    >
      {/* Text */}
      <div className="text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">
          Line-Up Announcement
        </p>

        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
          Celestio Festival aduce două nume care definesc scena electronică
          internațională
        </h2>

        <div className="mt-4 space-y-4 text-white/85 leading-relaxed max-w-3xl md:max-w-none">
          <p>
            <strong>Joezy</strong>, artistul francez care a revoluționat scena
            Afro House, aduce un sound hipnotic ce combină Afro Beats și Electro
            Melodic, creând o experiență senzorială intensă. Cu peste 60 de
            piese lansate pe labeluri internaționale și un vibe unic, Joezy
            transformă fiecare set într-o călătorie sonoră ce depășește
            granițele muzicii electronice.
          </p>
          <p>
            <strong>Christian Lepah</strong>, cu o carieră de peste 24 de ani,
            unul dintre cei mai apreciați DJ și producători ai scenei deep
            melodic internaționale, aduce un sunet rafinat, plin de emoție, ce
            creează conexiunea autentică cu publicul.{" "}
            <div className="opacity-80">
              🎶 Două lumi sonore diferite, unite prin aceeași energie și
              pasiune.
            </div>
          </p>
        </div>
      </div>

      {/* Bulele (fără text/caption) */}
      <div className="mt-10">
        <ul className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12">
          {/* stânga: Lepah (mai mică) */}
          <li className="shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full overflow-hidden ring-2 ring-white/10 shadow-lg shadow-black/40 hover:scale-105 transition">
              <img
                src={lepah}
                alt="Christian Lepah"
                className="w-full h-full object-cover"
              />
            </div>
          </li>

          {/* centru: Joezy (mare) */}
          <li className="shrink-0">
            <div className="w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full overflow-hidden ring-2 ring-white/15 shadow-2xl shadow-black/50 hover:scale-105 transition">
              <img
                src={joezy}
                alt="Joezy"
                className="w-full h-full object-cover"
              />
            </div>
          </li>

          {/* dreapta: Volt (mai mică) */}
          <li className="shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full overflow-hidden ring-2 ring-white/10 shadow-lg shadow-black/40 hover:scale-105 transition">
              <img
                src={volt}
                alt="Volt"
                className="w-full h-full object-cover"
              />
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-8 md:mt-16 grid text-center" id="tickets">
        <div>
          <a
            className="btn-primary "
            href="https://www.livetickets.ro/bilete/celestio-christmass-edition"
            target="_blank"
          >
            Bilete disponibile acum
          </a>
        </div>
        <div className="text-xs mt-2">*Bilete sunt în număr limitat!</div>
      </div>
    </section>
  );
}
