import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type QA = { q: string; a: JSX.Element | string; id: string };

const FAQS: QA[] = [
  {
    id: "cand-unde",
    q: "1. UNDE ȘI CÂND ARE LOC EVENIMENTUL CELESTIO?",
    a: (
      <>
        Celestio se desfășoară pe <strong>25 decembrie 2025</strong>, la
        <strong> Sala Polivalentă Lascăr Pană</strong> din{" "}
        <strong>Baia Mare</strong>.<br />
        Accesul se face începând cu ora <strong>19:00</strong>.
      </>
    ),
  },
  {
    id: "tipuri-bilete",
    q: "2. CE TIPURI DE BILETE EXISTĂ?",
    a: (
      <>
        <ul className="space-y-2 mb-3">
          <li>
            <strong>General Access</strong>
          </li>
          <li>
            <strong>VIP</strong>
          </li>
        </ul>

        <ul className="list-disc pl-5 space-y-1 text-[15px] leading-relaxed text-white/90">
          <li>
            Biletele se pot achiziționa de pe{" "}
            <a
              href="https://www.livetickets.ro/bilete/celestio-christmass-edition"
              target="_blank"
              rel="noreferrer"
              className="
              relative inline-block align-middle
              font-semibold
              underline decoration-2 underline-offset-4 decoration-festival-glow/60
              focus:outline-none focus:ring-2 focus:ring-festival-glow/60 rounded-md
              transition
            "
            >
              <span
                className="
                px-1.5 py-0.5 rounded-md
                bg-festival-glow/15 ring-1 ring-inset ring-festival-glow/40
                hover:bg-festival-glow hover:text-black
                transition
              "
              >
                livetickets.ro
              </span>
            </a>
          </li>
          <li>La ambele categorii de bilete poți rezerva masa.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cum-rezerv",
    q: "3. CUM REZERV MASA?",
    a: (
      <>
        După achiziționarea biletului, suni la numărul {""}
        <strong>0756861597</strong> pentru a rezerva masa dorită. <br />
        <br />
        Tipurile de mese sunt:
        <br />
        <br />
        <strong>General Access</strong> - masă standing, fără scaune, consumație
        minimă de <strong>500 lei</strong>.
        <br /> <strong>VIP</strong> - masă exclusive cu canapele, consumație
        minimă de <strong>3000 lei</strong>.
        <p className="mt-3 text-white/70 italic">
          *Rezervările pentru mese se fac doar în baza biletului achiziționat.
        </p>
      </>
    ),
  },
  {
    id: "bilet-intrare",
    q: "4. POT LUA BILET DE LA INTRARE?",
    a: (
      <>
        Da, poți achiziționa bilete <strong>General Access</strong> dar și{" "}
        <strong>VIP</strong>, în limita stocului disponibil.
      </>
    ),
  },
];

function FaqItem({
  item,
  defaultOpen = false,
}: {
  item: QA;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="
        rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur
        hover:bg-white/[0.08] transition
      "
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-start gap-3"
        aria-expanded={open}
        aria-controls={`panel-${item.id}`}
      >
        <span className="flex-1 font-semibold font-display text-base sm:text-lg">
          {item.q}
        </span>
        <span
          className="
            mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center
            rounded-full ring-1 ring-white/10 bg-white/10
          "
        >
          <ChevronDown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
            size={18}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`panel-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-[15.5px] sm:text-[16.5px] leading-relaxed text-white/90">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="
        mx-auto max-w-3xl px-4 pt-12 pb-20
      "
    >
      <div className="text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">
          Întrebări frecvente
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
          FAQ Celestio
        </h2>
      </div>

      <div className="mt-8 space-y-3 sm:space-y-4">
        {FAQS.map((it, i) => (
          <FaqItem key={it.id} item={it} defaultOpen={i === 0} />
        ))}
      </div>
    </section>
  );
}
