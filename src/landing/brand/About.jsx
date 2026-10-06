import './register.css';
import { Icon } from '../_shared/Icon';
import { Rv, SectionHead, Nav, Footer, Eyebrow } from './chrome';
import { UsageFigures } from './figures';
import { useReveal, useSmoothScroll } from './pageMotion';
import { ABOUT_PAGE, BRAND } from '../content';

/* ═══════════════════════════════════════════════════════════════
   ABOUT — who makes Evolveus and why, at /about. Facts only, from
   docs/evolveus-context.md: what it covers, where it runs today, the
   founding notes' reasons, and where it is going.
   ═══════════════════════════════════════════════════════════════ */

export default function About() {
  const root = useReveal();
  useSmoothScroll();
  const { covers, today, why, next, contact } = ABOUT_PAGE;

  return (
    <div className="rg" ref={root}>
      <Nav home="/" />

      <header className="rg-pagehead" id="top">
        <div className="rg-wrap">
          <Eyebrow>{ABOUT_PAGE.eyebrow}</Eyebrow>
          <Rv as="h1" className="rg-display rg-pagehead-h rg-rv--mask" delay={60}>{ABOUT_PAGE.title}</Rv>
          <Rv as="p" className="rg-lede" delay={120}>{ABOUT_PAGE.lede}</Rv>
        </div>
      </header>

      {/* What it covers now, as a short list of what one exam needs. */}
      <section className="rg-sec">
        <div className="rg-wrap">
          <SectionHead code="§01"kicker={covers.kicker} title={covers.title} lede={covers.text} />
          <ul className="rg-about-covers">
            {covers.items.map((it, i) => (
              <Rv as="li" key={it.label} delay={i * 70}>
                <b>{it.label}</b>
                <span>{it.text}</span>
              </Rv>
            ))}
          </ul>
        </div>
      </section>

      {/* Today: the words, then the count so far as answer-sheet figures. */}
      <section className="rg-sec">
        <div className="rg-wrap">
          <SectionHead code="§02"kicker={today.kicker} title={today.title} lede={today.text} />
          <div className="rg-about-figs">
            <UsageFigures />
          </div>
        </div>
      </section>

      <section className="rg-sec">
        <div className="rg-wrap">
          <SectionHead code="§03"kicker={why.kicker} title={why.title} />
          <Rv as="ol" className="rg-role-list rg-about-why">
            {why.lines.map((line, i) => (
              <li key={line}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {line}
              </li>
            ))}
          </Rv>
        </div>
      </section>

      <section className="rg-sec">
        <div className="rg-wrap">
          <SectionHead code="§04"kicker={next.kicker} title={next.title} lede={next.text} />
        </div>
      </section>

      <section className="rg-sec rg-sec--dark" id="contact">
        <div className="rg-wrap rg-about-contact">
          <div>
            <Rv as="h2" className="rg-h2">{contact.title}</Rv>
            <Rv as="p" className="rg-lede" delay={60}>{contact.text}</Rv>
          </div>
          <Rv className="rg-about-contact-ways" delay={120}>
            <a className="rg-btn" href="/#contact">
              Book a walkthrough
              <Icon name="arrowRight" size={15} />
            </a>
            <a className="rg-about-mail" href={`mailto:${BRAND.email}`}>
              <Icon name="mail" size={14} />
              {BRAND.email}
            </a>
          </Rv>
        </div>
      </section>

      <Footer />
    </div>
  );
}
