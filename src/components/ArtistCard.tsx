type Props = {
  src: string;
  alt: string;
  text: string;
  title?: string;
  // înălțimea UNUI rând (poza / text). Totalul figurii = 2 * rowHeight
  rowHeight?: number; // px, default 420
  objectPosition?: string; // ex. "50% 34%"
  className?: string; // extra classes (optional)
};

export default function ArtistInfoCard({
  src,
  alt,
  text,
  title,
  rowHeight = 420,
  objectPosition,
  className = "",
}: Props) {
  return (
    <figure
      // h = 2 * rowHeight, fără overflow
      className={`group relative rounded-xl z-10 hover:z-50 isolate ${className}`}
      style={{ height: `calc(${rowHeight}px)` }}
    >
      {/* grid cu 2 rânduri: la hover se deschide rândul textului */}
      <div
        className="
          grid w-full h-full
          [grid-template-rows:1fr_0fr]
          group-hover:[grid-template-rows:1fr_1fr]
          transition-[grid-template-rows] duration-700 ease-out
        "
      >
        {/* Rând 1 – POZA (urcă la hover) */}
        <div
          className="relative h-[unset] overflow-visible
                     translate-y-1/2 group-hover:translate-y-0
                     transition-transform duration-700 ease-out"
          style={{ height: `${rowHeight}px` }}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 z-10 w-full h-full object-cover rounded-t-xl"
            style={objectPosition ? { objectPosition } : undefined}
          />
        </div>

        {/* Rând 2 – TEXT (coboară la hover) */}
        <div
          className="relative h-[unset] overflow-visible
             -translate-y-1/2 group-hover:translate-y-0
             transition-transform duration-700 ease-out"
          style={{ height: `${rowHeight}px` }}
        >
          <div
            className="
                    absolute inset-0 z-0 rounded-b-xl
                    bg-black/70 backdrop-blur ring-1 ring-white/10
                    p-5 sm:p-6 flex flex-col justify-center

                    /* ASCUNS COMPLET sub poză până iese în zona lui */
                    [clip-path:inset(100%_0_0_0)]          /* totul tăiat la start */
                    group-hover:[clip-path:inset(0_0_0_0)] /* devine complet vizibil doar la hover */

                    opacity-0 group-hover:opacity-100      /* opțional, pentru un fade plăcut */
                    transition-[clip-path,opacity] duration-700 ease-out"
          >
            {title && (
              <h3 className="font-display text-3xl font-semibold mb-2 text-center">
                {title}
              </h3>
            )}
            <p className="text-[17px] leading-relaxed text-white/85 text-center">
              {text}
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
