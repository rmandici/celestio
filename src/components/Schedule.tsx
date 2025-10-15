import joezi from "../assets/1.png";
import lepah from "../assets/2.png";
import volt from "../assets/3.png";
import CubeAnimation from "./CubeAnimation";
import ArtistCard from "./ArtistCard";
import { useState } from "react";
import HintTap from "./HintTap";

/* ===== Card mobil: tap -> blur + text (ca la About) ===== */
function MobileArtistCard({
  src,
  alt,
  title,
  text,
  objectPosition, // <— NEW (ex: "50% 20%")
  heightClass = "h-[54vh] sm:h-[58vh]", // <— NEW (înălțime mobil puțin mai mare)
}: {
  src: string;
  alt: string;
  title?: string;
  text: string;
  objectPosition?: string;
  heightClass?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl ring-1 ring-white/10",
        "cursor-pointer select-none shadow-[0_18px_70px_rgba(0,0,0,0.65)]",
        heightClass, // <— folosește înălțimea primită
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
        src={src}
        alt={alt}
        className={[
          "absolute inset-0 w-full h-full object-cover",
          "transition-transform duration-500",
          open ? "scale-[1.04]" : "scale-100",
        ].join(" ")}
        style={objectPosition ? { objectPosition } : undefined} // <— aplică poziția
        loading="lazy"
        decoding="async"
      />
      {/* vignetă permanentă ușoară */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.65)_100%)]" />
      {/* overlay text la tap */}
      <div
        className={[
          "absolute inset-0 grid place-items-center text-center px-5 py-6",
          "transition-all duration-400",
          open ? "opacity-100 backdrop-blur-md bg-black/45" : "opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="max-w-[44ch] sm:max-w-[48ch]">
          {title && (
            <h3 className="font-display text-2xl sm:text-[26px] font-semibold mb-3">
              {title}
            </h3>
          )}
          <p
            className="
        text-white/90
        text-[15.5px] sm:text-[17px] md:text-[18px]
        leading-[1.6]
      "
          >
            {text}
          </p>
        </div>
      </div>
      <HintTap hidden={open} placement="bottom-right" />
    </div>
  );
}

export default function Schedule() {
  return (
    <section
      className="
        max-w-7xl px-4 mx-auto
        pt-20 md:pt-20 pb-16
        overflow-visible
        
      "
    >
      {/* Text */}
      <div className="text-center md:text-left">
        <div className="text-xs uppercase tracking-[0.35em] text-white/60 md:inline-block md:align-baseline">
          Line-Up Announcement
        </div>
        <div>
          <h2
            className="
      mt-2 md:mt-0
      md:inline md:mx-auto md:text-center md:align-baseline 
      font-display text-3xl sm:text-4xl font-bold text-white
    "
          >
            Celestio Festival aduce două nume care definesc scena electronică
            internațională
          </h2>
        </div>
      </div>

      {/* ======= Mobil (md:hidden): tap + blur + text ======= */}
      <div className="md:hidden mt-6">
        <div className="grid grid-cols-1 gap-4">
          <MobileArtistCard
            src={lepah}
            alt="Christian Lepah"
            title="Christian Lepah"
            text="Christian Lepah, cu o carieră de peste 24 de ani, unul dintre cei mai apreciați DJ și producători ai scenei deep melodic internaționale, aduce un sunet rafinat, plin de emoție, ce creează conexiunea autentică cu publicul."
          />
          <MobileArtistCard
            src={joezi}
            alt="Joezi"
            title="Joezi"
            text="Cu peste 60 de piese lansate pe labeluri internaționale și un vibe unic, Joezi transformă fiecare set într-o călătorie sonoră ce depășește granițele muzicii electronice."
          />
          <MobileArtistCard
            src={volt}
            alt="Volt"
            title="Volt"
            text="Descriere demo pentru Volt. Înlocuiește cu textul final când îl ai."
          />
        </div>
      </div>

      {/* ======= Desktop (md+): componenta ta originală cu hover ======= */}
      <div className="hidden md:block -mt-[150px] relative z-0 overflow-visible pb-44 sm:pb-80 md:pb-[300px]">
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
            text="Cu peste 60 de piese lansate pe labeluri internaționale și un vibe unic, Joezi transformă fiecare set într-o călătorie sonoră ce depășește granițele muzicii electronice."
            className="h-72 sm:h-80 md:h-[420px]"
          />
          <ArtistCard
            src={volt}
            alt="Volt"
            title="Volt"
            text="Descriere demo pentru Volt. Înlocuiește cu textul final când îl ai."
            className="h-72 sm:h-80 md:h-[420px]"
          />
        </div>
      </div>

      {/* CTA bilete */}
      <div className="pt-20 md:pt-0 grid text-center" id="tickets">
        <div>
          <a
            className="btn-primary"
            href="https://www.livetickets.ro/bilete/celestio-christmass-edition"
            target="_blank"
          >
            Bilete disponibile acum
          </a>
        </div>
        <div className="text-xs mt-2">*Bilete sunt în număr limitat!</div>
      </div>

      {/* Decor / animație */}
      {/* <div className="mt-8 md:mt-12">
        <CubeAnimation />
      </div> */}
    </section>
  );
}
