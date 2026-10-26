import { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface GalleryImage {
  src: string;
  alt: string;
  badge?: string;
}

interface Props {
  images: GalleryImage[];
}

/* ─────────────────────────────────────────────
   CSS  (scoped via .empg- prefix)
───────────────────────────────────────────── */
const css = `
  .empg {
    --empg-gold:        #c9a84c;
    --empg-dark:        #111111;
    --empg-overlay-bg:  rgba(10, 10, 10, 0.72);
    --empg-radius:      6px;
    --empg-thumb-w:     100px;
    --empg-thumb-gap:   .5rem;
    --empg-border-w:    2px;
    display: flex;
    flex-direction: column;
    gap: .75rem;
    min-width: 0;
    max-width: 100%;
  }

  /* ── Main image ── */
  .empg__main {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--empg-radius);
    overflow: hidden;
    background: #1a1a1a;
  }
  .empg__main-img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    object-fit: cover;
    display: block;
    transition: opacity .25s ease;
  }
  .empg__main-img.is-loading { opacity: 0; }

  /* ── Badge (top-left) ── */
  .empg__badge {
    position: absolute;
    top: .875rem;
    left: .875rem;
    background: var(--empg-overlay-bg);
    border: 1px solid var(--empg-gold);
    color: var(--empg-gold);
    font-size: .6rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    padding: .3rem .75rem;
    border-radius: 3px;
    pointer-events: none;
    backdrop-filter: blur(4px);
    z-index: 2;
  }

  /* ── Counter (bottom-right) ── */
  .empg__counter {
    position: absolute;
    bottom: .875rem;
    right: .875rem;
    background: var(--empg-overlay-bg);
    color: #fff;
    font-size: .75rem;
    font-weight: 600;
    letter-spacing: .06em;
    padding: .3rem .7rem;
    border-radius: 3px;
    pointer-events: none;
    backdrop-filter: blur(4px);
    z-index: 2;
  }

  /* ── Arrow buttons ── */
  .empg__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(10, 10, 10, .65);
    border: 1px solid rgba(201, 168, 76, .4);
    border-radius: 3px;
    color: var(--empg-gold);
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease, opacity .2s ease;
    padding: 0;
    user-select: none;
  }
  .empg__arrow:hover:not(:disabled) {
    background: rgba(201, 168, 76, .15);
    border-color: var(--empg-gold);
  }
  .empg__arrow:disabled {
    opacity: .25;
    cursor: default;
  }
  .empg__arrow--prev { left: .75rem; }
  .empg__arrow--next { right: .75rem; }

  /* ── Thumbnails row ── */
  .empg__thumbs {
    display: flex;
    gap: var(--empg-thumb-gap);
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: thin;
    scrollbar-color: var(--empg-gold) transparent;
    scroll-behavior: smooth;
  }
  .empg__thumbs::-webkit-scrollbar { height: 3px; }
  .empg__thumbs::-webkit-scrollbar-track { background: transparent; }
  .empg__thumbs::-webkit-scrollbar-thumb { background: var(--empg-gold); border-radius: 2px; }

  /* ── Thumbnail button ── */
  .empg__thumb {
    flex: 0 0 var(--empg-thumb-w);
    aspect-ratio: 16 / 9;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    border: var(--empg-border-w) solid transparent;
    padding: 0;
    background: #1a1a1a;
    transition: border-color .2s ease, opacity .2s ease;
    outline: none;
  }
  .empg__thumb:focus-visible { border-color: var(--empg-gold); }
  .empg__thumb.is-active     { border-color: var(--empg-gold); }
  .empg__thumb:not(.is-active)       { opacity: .6; }
  .empg__thumb:not(.is-active):hover { opacity: 1; }

  .empg__thumb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function EmpGallery({ images }: Props) {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reset para a primeira foto sempre que trocar de empreendimento
  useEffect(() => {
    setActive(0);
    setLoading(false);
    if (thumbsRef.current) {
      thumbsRef.current.scrollLeft = 0;
    }
  }, [images]);

  if (!images.length) return null;

  // Garante que o índice nunca ultrapassa o total de imagens disponíveis
  const safeActive = Math.min(active, images.length - 1);
  const current = images[safeActive];
  const total   = images.length;

  /* ── Navigate to index, auto-scroll strip ── */
  function goTo(idx: number) {
    if (idx === active || idx < 0 || idx >= total) return;
    setLoading(true);
    setActive(idx);

    // scroll the selected thumb into view inside the strip
    const thumb = thumbRefs.current[idx];
    if (thumb) {
      thumb.scrollIntoView({ inline: "nearest", behavior: "smooth", block: "nearest" });
    }
  }

  return (
    <>
      <style>{css}</style>

      <div className="empg">
        {/* ── Main image ── */}
        <div className="empg__main">
          <img
            key={safeActive}
            className={"empg__main-img" + (loading ? " is-loading" : "")}
            src={current.src}
            alt={current.alt}
            onLoad={() => setLoading(false)}
          />

          {current.badge && (
            <span className="empg__badge">{current.badge}</span>
          )}

          <span className="empg__counter">{safeActive + 1} / {total}</span>

          {/* Prev arrow */}
          <button
            className="empg__arrow empg__arrow--prev"
            aria-label="Imagem anterior"
            disabled={safeActive === 0}
            onClick={() => goTo(safeActive - 1)}
          >
            ‹
          </button>

          {/* Next arrow */}
          <button
            className="empg__arrow empg__arrow--next"
            aria-label="Próxima imagem"
            disabled={safeActive === total - 1}
            onClick={() => goTo(safeActive + 1)}
          >
            ›
          </button>
        </div>

        {/* ── Thumbnails ── */}
        {total > 1 && (
          <div className="empg__thumbs" ref={thumbsRef} role="list">
            {images.map((img, idx) => (
              <button
                key={idx}
                ref={el => { thumbRefs.current[idx] = el; }}
                role="listitem"
                className={"empg__thumb" + (idx === safeActive ? " is-active" : "")}
                aria-label={`Ver imagem ${idx + 1}: ${img.alt}`}
                aria-pressed={idx === safeActive}
                onClick={() => goTo(idx)}
              >
                <img className="empg__thumb-img" src={img.src} alt={img.alt} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
