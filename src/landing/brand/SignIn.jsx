import './register.css';
import { Icon } from '../_shared/Icon';
import { Rv, Nav, Footer, Eyebrow } from './chrome';
import { useReveal } from './pageMotion';
import { INSTITUTIONS, SIGNIN_PAGE } from '../content';

/* ═══════════════════════════════════════════════════════════════
   SIGN IN — at /signin. Each institution runs its own Evolveus at its
   own address, so this page only asks which one, and sends the visitor
   there. The list is INSTITUTIONS in ../content.js.
   ═══════════════════════════════════════════════════════════════ */

export default function SignIn() {
  const root = useReveal();

  return (
    <div className="rg" ref={root}>
      {/* No form here: its '#contact' links go to the home page's. */}
      <Nav base="/" />

      <main className="rg-signin" id="top">
        <div className="rg-wrap rg-signin-in">
          <Eyebrow>{SIGNIN_PAGE.eyebrow}</Eyebrow>
          <Rv as="h1" className="rg-display rg-signin-h rg-rv--mask" delay={60}>{SIGNIN_PAGE.title}</Rv>
          <Rv as="p" className="rg-lede" delay={120}>{SIGNIN_PAGE.lede}</Rv>

          <Rv as="ul" className="rg-inst" delay={180}>
            {INSTITUTIONS.map((inst) => (
              <li key={inst.id}>
                <a href={inst.url}>
                  <img src={inst.logo} alt="" />
                  <span className="rg-inst-name">
                    <b>{inst.name}</b>
                    <span>{inst.place}</span>
                  </span>
                  <span className="rg-mono rg-inst-host">{new URL(inst.url).host}</span>
                  <Icon name="arrowRight" size={16} />
                </a>
              </li>
            ))}
          </Rv>

          <Rv as="p" className="rg-signin-missing" delay={240}>
            {SIGNIN_PAGE.missing}{' '}
            <a href="/#contact">{SIGNIN_PAGE.missingLink}</a>
          </Rv>
        </div>
      </main>

      <Footer base="/" />
    </div>
  );
}
