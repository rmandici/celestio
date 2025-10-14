import { motion } from "framer-motion";

export default function HintTap({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className={[
        // poziționare pe tile
        "absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none",
        // dimensiuni explicite ca să „existe” pentru absolut-ele interne
        "w-10 h-10",
        // fade când tile-ul e deschis
        "transition-opacity duration-300",
        hidden ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="relative w-full h-full">
        {/* Ripple 1 */}
        <motion.span
          className="absolute inset-0 rounded-full bg-white/10"
          initial={{ scale: 0.7, opacity: 0.6 }}
          animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Ripple 2 (desincronizat, discret) */}
        <motion.span
          className="absolute inset-0 rounded-full ring-1 ring-white/30"
          initial={{ scale: 0.9, opacity: 0.5 }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{
            duration: 2.0,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.25,
          }}
        />
        {/* pastila centrală */}
        <div className="absolute inset-0 rounded-full grid place-items-center bg-black/55 ring-1 ring-white/25 backdrop-blur">
          {/* mână „tap” clară */}
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            initial={{ y: 0 }}
            animate={{ y: [0, -3, 0, 0, -3, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }}
            aria-hidden
          >
            <path
              d="M8 12v-2.2a2.2 2.2 0 1 1 4.4 0V12"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M12.4 12v-1.2a1.2 1.2 0 0 1 2.4 0V12.5"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M6.5 13l2.3 5.8c.3.8 1.1 1.2 2 1.2h3.6c.7 0 1.3-.4 1.6-1l1.4-2.8a1.8 1.8 0 0 0-.9-2.3l-2.5-1.1"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      </div>
    </div>
  );
}
