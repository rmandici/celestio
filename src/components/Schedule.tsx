import joezi from "../assets/1.png";
import lepah from "../assets/2.png";
import volt from "../assets/3.png";
import CubeAnimation from "./CubeAnimation";
import ArtistCard from "./ArtistCard";

export default function Schedule() {
  return (
    <section
      className="scroll-mt-16 md:scroll-mt-16 mx-auto max-w-5xl px-4 py-20 min-h-viewport overflow-visible"
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

      {/* Strip de imagini side-by-side */}
      <div className="-mt-[98px] relative z-0 overflow-visible pb-44 sm:pb-80 md:pb-[300px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4">
          <ArtistCard
            src={lepah}
            alt="Christian Lepah"
            title="Christian Lepah"
            text="Christian Lepah, cu o carieră de peste 24 de ani, unul dintre cei mai apreciați DJ și producători ai scenei deep melodic internaționale, aduce un sunet rafinat, plin de emoție, ce creează conexiunea autentică cu publicul."
            className="h-72 sm:h-80 md:h-[420px]"
          />

          <ArtistCard
            src={joezi}
            alt="Joezi"
            title="Joezi"
            text="Joezi, artistul francez care a revoluționat scena Afro House, aduce un sound hipnotic ce combină Afro Beats și Electro Melodic, creând o experiență senzorială intensă. Cu peste 60 de piese lansate pe labeluri internaționale și un vibe unic, Joezi transformă fiecare set într-o călătorie sonoră ce depășește granițele muzicii electronice."
            className="h-72 sm:h-80 md:h-[420px]"
          />

          <ArtistCard
            src={volt}
            alt="Volt"
            title="Volt"
            text="Descriere demo pentru Volt. Înlocuiește cu textul final când îl ai."
            className="h-72 sm:h-80 md:h-[420px] mb-10"
          />
        </div>
      </div>
      <div className="mt-8 md:mt-2 grid text-center" id="tickets">
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

      <div className="mt-8 md:mt-12">
        <CubeAnimation />
      </div>
    </section>
  );
}
