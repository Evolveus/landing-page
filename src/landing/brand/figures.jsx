import { Rv } from './chrome';

/* ═══════════════════════════════════════════════════════════════
   FIGURES — the answer-sheet exhibits shared by the brand pages:
   themed screenshots, the specimen mat they sit on, and figures
   written as roll-number digit grids.
   ═══════════════════════════════════════════════════════════════ */

/* A product screenshot in both themes. Each light image has a dark twin
   beside it (name-dark.webp); CSS hides the one that does not match, and
   a hidden lazy image is never downloaded. */
export function ThemedImg({ src, alt }) {
  const dark = src.replace(/\.webp$/, '-dark.webp');
  return (
    <>
      <img className="rg-on-light" src={src} alt={alt} loading="lazy" />
      <img className="rg-on-dark" src={dark} alt={alt} loading="lazy" />
    </>
  );
}

/* A real product card, set on a mat drawn like a specimen answer sheet:
   timing marks down the left edge, registration marks in the corners, and
   a figure label in the head. Whole screens use the browser frame in Roles
   instead; a single card in a browser frame reads as a shrunken page. */
export function Exhibit({ fig, label, children }) {
  return (
    <div className="rg-exhibit">
      <div className="rg-exhibit-head">
        <span className="rg-mono">Fig. {fig}</span>
        <span className="rg-mono">{label}</span>
      </div>
      <div className="rg-exhibit-body">{children}</div>
    </div>
  );
}

export function Shot({ src, alt, caption, fig, label, className = '', delay = 0 }) {
  return (
    <Rv as="figure" className={`rg-shot-fig ${className}`} delay={delay}>
      <Exhibit fig={fig} label={label}>
        <ThemedImg src={src} alt={alt} />
      </Exhibit>
      {caption && <figcaption className="rg-shot-cap">{caption}</figcaption>}
    </Rv>
  );
}

/* A figure written the way a roll number is filled on an answer sheet:
   one box per digit with the digit written in, and a column of 0 to 9
   bubbles under it with the matching one shaded. The shading runs left
   to right when the strip scrolls into view (see .rg-omr in the CSS).
   Commas become a narrow gap; a trailing "+" is written after the boxes. */
export function OmrNumber({ text }) {
  const plus = text.endsWith('+');
  const groups = text.replace('+', '').split(',');
  let col = 0;
  return (
    <span className="rg-omr" role="img" aria-label={text}>
      {groups.map((g, gi) => (
        <span className="rg-omr-group" key={gi}>
          {[...g].map((d) => {
            const c = col++;
            return (
              <span className="rg-omr-col" key={c} style={{ '--c': c }}>
                <span className="rg-omr-box">{d}</span>
                {Array.from({ length: 10 }, (_, n) => (
                  <i key={n} className={n === Number(d) ? 'on' : ''} />
                ))}
              </span>
            );
          })}
        </span>
      ))}
      {plus && <span className="rg-omr-plus">+</span>}
    </span>
  );
}
