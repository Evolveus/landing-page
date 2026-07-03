import { Icon } from "../landing/_shared/Icon";
import { FLYER, useA4Export } from "./content";
import "./FlyerV1.css";

export default function FlyerV1({ onHome }) {
  const { ref, exporting, exportPDF } = useA4Export("evolveus-flyer-v1.pdf", "#080c0b");
  const c = FLYER;

  return (
    <div className="v1-root">
      <div className="v1-toolbar">
        {onHome && (
          <button className="v1-btn v1-btn-ghost" onClick={onHome}>
            ← Home
          </button>
        )}
        <button className="v1-btn" onClick={exportPDF} disabled={exporting}>
          {exporting ? "Exporting…" : (<><Icon name="fileText" size={14} strokeWidth={2} /> Export A4 PDF</>)}
        </button>
      </div>

      <div className="v1-sheet" ref={ref}>
        <div className="v1-masthead">
          <div className="v1-brand">
            <span className="v1-brand-dot" />
            <div>
              <div className="v1-brand-name">{c.brand}</div>
              <div className="v1-brand-sub">{c.brandSub}</div>
            </div>
          </div>
          <div className="v1-edition">
            {c.edition.map((e) => (<div key={e}>{e}</div>))}
          </div>
        </div>
        <div className="v1-rule" />

        <div className="v1-hero">
          <div>
            <div className="v1-eyebrow">▹ {c.eyebrow}</div>
            <h1 className="v1-h1">
              {c.headline.pre}<br />
              <em>{c.headline.em}</em> {c.headline.post}
            </h1>
          </div>
          <p className="v1-lede">{c.lede}</p>
        </div>

        <div className="v1-label"><span>//</span> The platform · six pillars</div>
        <div className="v1-pillars">
          {c.pillars.map((p) => (
            <div className="v1-pillar" key={p.title}>
              <div className="v1-pillar-top">
                <div className="v1-pillar-icon"><Icon name={p.icon} size={15} strokeWidth={1.9} /></div>
                <div className="v1-pillar-num">{p.n}</div>
              </div>
              <div className="v1-pillar-title">{p.title}</div>
              <div className="v1-pillar-body">{p.body}</div>
            </div>
          ))}
        </div>

        <div className="v1-cols">
          {[c.aiEval, c.performance].map((f) => (
            <div className="v1-feature" key={f.title}>
              <div className="v1-feature-head">
                <div className="v1-feature-icon"><Icon name={f.icon} size={15} strokeWidth={2} /></div>
                <div className="v1-feature-title">{f.title}</div>
              </div>
              <p className="v1-feature-body">{f.body}</p>
              <ul className="v1-list">
                {f.bullets.map((b) => (
                  <li key={b}><Icon name="check" size={11} strokeWidth={2.6} />{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="v1-label"><span>//</span> Deploy your way</div>
        <div className="v1-deploy">
          {c.deploy.map((d) => (
            <div className="v1-deploy-card" key={d.name}>
              <div className="v1-deploy-head">
                <span className="v1-deploy-icon"><Icon name={d.icon} size={13} strokeWidth={1.9} /></span>
                <span className="v1-deploy-name">{d.name}</span>
              </div>
              <div className="v1-deploy-tag">{d.tag}</div>
            </div>
          ))}
        </div>

        <div className="v1-spacer" />

        <div className="v1-footer">
          <div>
            <div className="v1-footer-label">Ready to see it live?</div>
            <div className="v1-footer-cta">Schedule a demonstration</div>
          </div>
          <div className="v1-footer-contact">
            <div className="v1-footer-line"><Icon name="globe" size={12} strokeWidth={2} /> {c.contact.site}</div>
            <div className="v1-footer-line"><Icon name="edit" size={12} strokeWidth={2} /> {c.contact.email}</div>
          </div>
        </div>
        <div className="v1-colophon">
          <span>{c.brand} © 2026</span>
          <span>Managed Cloud · Self-Hosted · BYOK AI</span>
        </div>
      </div>
    </div>
  );
}
