import { motion } from "framer-motion";

export default function HintSwipe() {
  return (
    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/80 pointer-events-none">
      <motion.span
        initial={{ x: 0, opacity: 0.9 }}
        animate={{ x: [-8, 8, -8], opacity: [1, 0.8, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
        className="inline-flex"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="-mr-1"
        >
          <path
            d="M14 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="ml-1"
        >
          <path
            d="M10 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
      <span className="text-xs">swipe</span>
    </div>
  );
}
