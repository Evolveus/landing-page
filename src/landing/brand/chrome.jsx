import { useEffect, useState } from 'react';
import { useScrollProgress, useStuck } from './pageMotion';
import { Icon } from '../_shared/Icon';
import { BRAND, BRAND_LOGO, BRAND_NAV, BRAND_FOOTER } from '../content';

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

/* The brand lockup. `light` swaps in the white mark for dark grounds. */
export function Lockup({ light = false }) {
  return (
    <>
      <img
        className="rg-mark"
        src={light ? BRAND_LOGO.markLight : BRAND_LOGO.mark}
        alt=""
        width="79"
        height="128"
        aria-hidden="true"
      />
      <span className="rg-brand-name">{BRAND.name}</span>
    </>
  );
}

/* Section header: margin marker + title, split by a full rule. */
export function SectionHead({ code, kicker, title, lede }) {
  return (
    <header className="rg-sechead rg-rule" data-rv>
      <Rv className="rg-secmark">
        <span className="rg-secmark-code">
          <span className="rg-bub rg-bub--fill" />
          <span className="rg-mono">{code}</span>
        </span>
        <span className="rg-mono rg-secmark-kicker">{kicker}</span>
      </Rv>
      <div className="rg-sechead-body">
        <Rv as="h2" className="rg-h2 rg-rv--mask" delay={60}>{title}</Rv>
        {lede && <Rv className="rg-lede" delay={120}>{lede}</Rv>}
      </div>
    </header>
  );
}

/* The nav.

   `base` prefixes the section anchors. On the home page the sections are
   on this document, so it is empty. On any other page it is "/", which
   turns each link into a real navigation back to the home page's anchor. */
export function Nav({ base = '', extra = [] }) {
  const stuck = useStuck();
  const progress = useScrollProgress();
  const [menu, setMenu] = useState(false);

  // Close the mobile menu once the viewport is wide enough to show the full nav.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1081px)');
    const sync = () => mq.matches && setMenu(false);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const links = [
    ...BRAND_NAV.map((l) => ({ ...l, href: `${base}${l.href}` })),
    ...extra,
  ];

  return (
    <nav className={`rg-nav ${stuck ? 'is-stuck' : ''}`}>
      <div className="rg-wrap rg-nav-in">
        <a className="rg-brand" href={base || '#top'} aria-label={BRAND.name}>
          <Lockup />
        </a>
        <div className="rg-nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} aria-current={l.current ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
        </div>
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
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
              <span className="rg-bub" />
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* The footer. `base` behaves as it does in the nav. */
export function Footer({ base = '', extra = [] }) {
  const columns = BRAND_FOOTER.columns.map((col) => ({
    ...col,
    links: col.links.map((l) => ({ ...l, href: `${base}${l.href}` })),
  }));
  if (extra.length) {
    columns[0] = { ...columns[0], links: [...columns[0].links, ...extra] };
  }

  return (
    <footer className="rg-foot">
      <div className="rg-wrap rg-foot-in">
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
