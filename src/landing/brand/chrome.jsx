import { useEffect, useRef, useState } from 'react';
import { useNavScroll, useTheme } from './pageMotion';
import { Icon } from '../_shared/Icon';
import { ContactForm } from '../_shared/ContactForm';
import { FootMural, GraphiteDefs } from './footMural';
import { BRAND, BRAND_LOGO, SITE_NAV, SITE_RESOURCES, SIGNIN_LINK, BRAND_FOOTER } from '../content';

/* ═══════════════════════════════════════════════════════════════
   CHROME — the parts every EvolveUs brand page shares: the reveal
   machinery, the nav, and the footer.

   Pages under /landing/brand differ in their middle. The frame
   around that middle is defined once, here, so the nav on the
   comparison page cannot drift from the nav on the home page.
   ═══════════════════════════════════════════════════════════════ */

export const Rv = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => (
  <Tag className={`rg-rv ${className}`} data-rv style={{ '--d': `${delay}ms` }} {...rest}>
    {children}
  </Tag>
);

/* The brand lockup. `light` swaps in the white mark for the footer's dark
   ground. Without it (the header), both the light-theme and dark-theme
   marks are rendered and CSS shows the one that matches the theme. */
export function Lockup({ light = false }) {
  const mark = (src, cls = '') => (
    <img
      className={`rg-mark ${cls}`}
      src={src}
      alt=""
      width="79"
      height="128"
      aria-hidden="true"
    />
  );
  return (
    <>
      {light
        ? mark(BRAND_LOGO.markLight)
        : <>{mark(BRAND_LOGO.mark, 'rg-on-light')}{mark(BRAND_LOGO.markDark, 'rg-on-dark')}</>}
      <span className="rg-brand-name">{BRAND.name}</span>
    </>
  );
}

/* The small marker above a page or section headline: a filled bubble and
   a mono label. */
export const Eyebrow = ({ children }) => (
  <Rv className="rg-eyebrow">
    <span className="rg-bub rg-bub--fill" />
    <span className="rg-mono">{children}</span>
  </Rv>
);

/* A link as seen from a page with the given base: an in-page link
   ('#…') is taken to that base; a path is left as it is. */
const onPage = (base, href) => (href.startsWith('#') ? `${base}${href}` : href);
// True for a link to the page being shown.
const isHere = (href) => typeof window !== 'undefined' && href === window.location.pathname;

/* Section header: margin marker + title, split by a full rule. `walk`,
   if given ({ href, label }), adds a small link under the marker, back
   to the matching step of the walkthrough on the home page. */
export function SectionHead({ code, kicker, title, lede, walk }) {
  return (
    <header className="rg-sechead rg-rule" data-rv>
      <Rv className="rg-secmark">
        <span className="rg-secmark-code">
          <span className="rg-bub rg-bub--fill" />
          <span className="rg-mono">{code}</span>
        </span>
        <span className="rg-mono rg-secmark-kicker">{kicker}</span>
        {walk && (
          <a className="rg-mono rg-secmark-walk" href={walk.href}>
            {walk.label}
            <Icon name="arrowUpRight" size={12} />
          </a>
        )}
      </Rv>
      <div className="rg-sechead-body">
        <Rv as="h2" className="rg-h2 rg-rv--mask" delay={60}>{title}</Rv>
        {lede && <Rv className="rg-lede" delay={120}>{lede}</Rv>}
      </div>
    </header>
  );
}

/* The dark contact band at the foot of a page: the pitch on the left,
   the form on the right. `cta` is the page's { eyebrow, headline, sub };
   `sub` and `contact` override the plain sub line and the email link. */
export function ContactSection({ cta, sub = cta.sub, contact, submitLabel = 'Request a walkthrough' }) {
  return (
    <section className="rg-sec rg-sec--dark" id="contact">
      <div className="rg-wrap">
        <div className="rg-cta-grid">
          <div>
            <Eyebrow>{cta.eyebrow}</Eyebrow>
            <Rv as="h2" className="rg-h2 rg-cta-h rg-rv--mask" delay={60}>{cta.headline}</Rv>
            <Rv as="p" className="rg-lede" delay={120} style={{ marginTop: 22 }}>{sub}</Rv>
            <Rv className="rg-cta-contact" delay={180}>
              {contact ?? (
                <a href={`mailto:${BRAND.email}`}>
                  <Icon name="mail" size={14} />
                  {BRAND.email}
                </a>
              )}
            </Rv>
          </div>
          <Rv delay={160}>
            <ContactForm submitLabel={submitLabel} />
          </Rv>
        </div>
      </div>
    </section>
  );
}

/* Each print piece drawn in pencil, so the menu shows what you get: the
   booklet lying open, the one sheet, the slide on its stand. Boards are
   60 x 46; strokes are listed in drawing order. */
const RESOURCE_SKETCHES = {
  '/brochure': [
    'M30 11 C 22 7, 12 7, 5 10 L 5 38 C 12 35, 22 35, 30 39',
    'M30 11 C 38 7, 48 7, 55 10 L 55 38 C 48 35, 38 35, 30 39',
    'M30 11 L 30 39',
    'M10 17 L 25 16 M10 23 L 24 22 M10 29 L 21 28',
    'M35 16 L 50 17 M35 22 L 49 23',
  ],
  '/flyer': [
    'M18 41 L 18 5 L 36 4 L 43 11 L 43 41 Z',
    'M36 4 L 36 11 L 43 11',
    'M23 18 L 38 17 M23 24 L 38 24 M23 30 L 33 30',
  ],
  '/ppt': [
    'M5 6 L 55 5 L 55 32 L 5 33 Z',
    'M30 33 L 30 38 L 22 44 M30 38 L 38 44',
    'M13 27 L 13 21 M19 27 L 19 15 M25 27 L 25 18',
    'M33 14 L 47 14 M33 20 L 44 20',
  ],
};

const Sketch = ({ strokes }) => (
  <svg className="rg-drop-sketch" viewBox="0 0 60 46" aria-hidden="true">
    {strokes.map((d, i) => (
      <path key={d} d={d} pathLength="1" style={{ '--i': i }} />
    ))}
  </svg>
);

/* "Resources" in the nav: a button that opens a small menu of the print
   pieces. Click, tap or Enter opens it; on a mouse, hovering opens it
   too, and it waits a moment before closing so the pointer can travel
   down into the menu. Escape, a click elsewhere, or focus leaving it
   closes it. The chevron marks it as the one item that opens rather
   than goes somewhere. */
function ResourcesMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const btn = useRef(null);
  const timer = useRef(0);
  // Set while the menu is open only because the pointer is over it, so a
  // click that follows the hover keeps it open rather than shutting it.
  const byHover = useRef(false);
  const here = SITE_RESOURCES.some((r) => isHere(r.href));

  useEffect(() => {
    if (!open) {
      byHover.current = false;
      return undefined;
    }
    const onDown = (e) => { if (!root.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      btn.current?.focus();
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Hover only counts for a mouse; a tap fires pointerenter too, and the
  // click that follows would close the menu again.
  const hover = (next) => (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(timer.current);
    if (next) {
      if (!open) byHover.current = true;
      setOpen(true);
    } else {
      timer.current = setTimeout(() => setOpen(false), 150);
    }
  };

  const toggle = () => {
    if (byHover.current) byHover.current = false;
    else setOpen((o) => !o);
  };

  return (
    <div
      className={`rg-drop ${open ? 'is-open' : ''}`}
      ref={root}
      onPointerEnter={hover(true)}
      onPointerLeave={hover(false)}
      onBlur={(e) => { if (!root.current?.contains(e.relatedTarget)) setOpen(false); }}
    >
      <button
        type="button"
        className="rg-drop-btn"
        ref={btn}
        aria-expanded={open}
        aria-controls="rg-drop-resources"
        aria-current={here ? 'page' : undefined}
        onClick={toggle}
      >
        Resources
        <Icon name="chevronDown" size={12} />
      </button>
      <div className="rg-drop-panel" id="rg-drop-resources" hidden={!open}>
        {SITE_RESOURCES.map((r, i) => (
          <a
            key={r.href}
            href={r.href}
            aria-current={isHere(r.href) ? 'page' : undefined}
            style={{ '--n': i }}
          >
            <Sketch strokes={RESOURCE_SKETCHES[r.href]} />
            <span className="rg-drop-label">{r.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* The nav.

   `base` prefixes the "#contact" button. A page with its own contact
   section leaves it empty; any other page passes "/", which sends the
   button to the home page's form. `home` is where the logo goes; a page
   that is not the home page but has its own contact section passes "/".
   `clear` drops the nav's glass while the page is at the top; only the
   home page sets it, for the bubbles down the sides of its opening. */
export function Nav({ base = '', home, clear = false }) {
  const [stuck, progress] = useNavScroll();
  const [theme, toggleTheme] = useTheme();
  const [menu, setMenu] = useState(false);

  // Close the mobile menu once the viewport is wide enough to show the full nav.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1081px)');
    const sync = () => mq.matches && setMenu(false);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <nav className={['rg-nav', clear && 'is-clear', stuck && 'is-stuck', menu && 'is-menu'].filter(Boolean).join(' ')}>
      <GraphiteDefs />
      <div className="rg-wrap rg-nav-in">
        <a className="rg-brand" href={home ?? (base || '#top')} aria-label={BRAND.name}>
          <Lockup />
        </a>
        <div className="rg-nav-links">
          {SITE_NAV.map((l) => (
            <a key={l.href} href={l.href} aria-current={isHere(l.href) ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
          <ResourcesMenu />
        </div>
        <button
          className="rg-theme"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
        </button>
        <a
          className="rg-btn rg-btn--sm rg-btn--soft"
          href={SIGNIN_LINK.href}
          aria-current={isHere(SIGNIN_LINK.href) ? 'page' : undefined}
        >
          {SIGNIN_LINK.label}
        </a>
        <a className="rg-btn rg-btn--sm" href={`${base}#contact`}>
          Book a walkthrough
          <Icon name="arrowRight" size={14} />
        </a>

        <button
          className={`rg-burger ${menu ? 'is-open' : ''}`}
          onClick={() => setMenu((m) => !m)}
          aria-expanded={menu}
          aria-controls="rg-menu"
          aria-label={menu ? 'Close menu' : 'Open menu'}
        >
          <i /><i /><i />
        </button>
      </div>

      <i className="rg-nav-bar" ref={progress} aria-hidden="true" />

      <div className="rg-menu" id="rg-menu" hidden={!menu}>
        <div className="rg-wrap">
          {SITE_NAV.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
              <span className="rg-bub" />
              {l.label}
            </a>
          ))}
          <span className="rg-mono rg-menu-group">Resources</span>
          {SITE_RESOURCES.map((l) => (
            <a key={l.href} className="rg-menu-sub" href={l.href} onClick={() => setMenu(false)}>
              {l.label}
            </a>
          ))}
          <a href={SIGNIN_LINK.href} onClick={() => setMenu(false)}>
            <span className="rg-bub" />
            {SIGNIN_LINK.label}
          </a>
        </div>
      </div>
    </nav>
  );
}

/* The footer. `base` behaves as it does in the nav. */
export function Footer({ base = '' }) {
  const columns = BRAND_FOOTER.columns.map((col) => ({
    ...col,
    links: col.links.map((l) => ({ ...l, href: onPage(base, l.href) })),
  }));

  return (
    <footer className="rg-foot">
      <div className="rg-wrap rg-foot-in">
        <FootMural />
        <div className="rg-foot-grid">
          <div>
            <div className="rg-brand"><Lockup light /></div>
            <p className="rg-foot-tag">{BRAND_FOOTER.tagline}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul className="rg-foot-links">
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rg-foot-base">
          <span className="rg-mono">© {new Date().getFullYear()} {BRAND.name} · {BRAND.domain}</span>
          <span className="rg-foot-omr" aria-hidden="true">
            <i className="on" /><i /><i /><i className="on" /><i /><i className="on" />
          </span>
        </div>
      </div>
    </footer>
  );
}
