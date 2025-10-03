import React, { useEffect, useState } from "react";

const links = [
  { href: "#news", label: "News" },
  { href: "#lineup", label: "Line Up" },
  { href: "#tickets", label: "Tickets" },
  { href: "#info", label: "Info" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Blochează scroll-ul paginii când meniul mobil e deschis
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/10">
      <nav className="relative mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-display text-xl tracking-wide">
          CELESTIO
        </a>

        {/* Desktop nav */}
        <ul className="hidden sm:flex gap-6 text-sm uppercase tracking-wider">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-festival-glow">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Burger button (mobile only) */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-festival-glow/60"
        >
          {open ? (
            // X icon
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={`sm:hidden absolute left-0 right-0 top-full origin-top overflow-hidden border-t border-white/10
                      bg-black/70 backdrop-blur-lg transition-all duration-300
                      ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <ul className="px-4 py-3 flex flex-col gap-3 text-sm uppercase tracking-wider text-right">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="block rounded-md px-2 py-2 hover:bg-white/5 hover:text-festival-glow"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay semi-transparent când meniul e deschis (mobil) */}
      {open && (
        <button
          aria-hidden
          tabIndex={-1}
          onClick={close}
          className="sm:hidden fixed inset-0 z-10 bg-black/40"
        />
      )}
    </header>
  );
}
