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
      <ul className="space-y-2">
        <li>
          <strong>General Access</strong> – acces general, număr limitat.
        </li>
        <li>
          <strong>VIP Tables</strong> – experiență premium cu mese exclusive,
          vizibilitate maximă, consumație minimă – <strong>3.000 RON</strong>.
        </li>
      </ul>
    ),
  },
  {
    id: "cum-rezerv",
    q: "3. CUM REZERV MASA?",
    a: (
      <>
        După achiziționarea biletului <strong>VIP</strong>, suni la numărul {""}
        <strong>075686159</strong> pentru a rezerva masa dorită.
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
        Da, dar biletele vor fi în număr limitat și doar{" "}
        <strong>General Access</strong>.<br />
        Biletele <strong>VIP</strong> se pot achiziționa doar online, în limita
        numărului disponibil.
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
