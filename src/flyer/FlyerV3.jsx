import { Icon } from "../landing/_shared/Icon";
import { FLYER, useA4Export } from "./content";
import "./FlyerV3.css";

export default function FlyerV3({ onHome }) {
  const { ref, exporting, exportPDF } = useA4Export("evolveus-flyer-v3.pdf", "#f6f4ec");
  const c = FLYER;
  const features = [
    { ...c.aiEval, variant: "dark" },
    { ...c.performance, variant: "blue" },
  ];

  return (
    <div className="v3-root">
      <div className="v3-toolbar">
        {onHome && (
          <button className="v3-btn v3-btn-ghost" onClick={onHome}>← Home</button>
        )}
        <button className="v3-btn" onClick={exportPDF} disabled={exporting}>
          {exporting ? "Exporting…" : (<><Icon name="fileText" size={14} strokeWidth={2.2} /> Export A4 PDF</>)}
        </button>
      </div>

      <div className="v3-sheet" ref={ref}>
        <div className="v3-masthead">
          <div className="v3-brand">
            <div className="v3-brand-mark"><Icon name="checkCircle" size={17} strokeWidth={2.4} /></div>
            <div>
              <div className="v3-brand-name">{c.brand}</div>
              <div className="v3-brand-sub">{c.brandSub}</div>
            </div>
          </div>
          <div className="v3-edition">
            {c.edition.map((e) => (<div key={e}>{e}</div>))}
          </div>
        </div>

        <div className="v3-hero">
          <div>
            <div className="v3-eyebrow">{c.eyebrow}</div>
            <h1 className="v3-h1">
              {c.headline.pre} <em>{c.headline.em}</em> {c.headline.post}
            </h1>
          </div>
          <p className="v3-lede">{c.lede}</p>
        </div>

        <div className="v3-label"><b>◢</b> The platform · six pillars</div>
        <div className="v3-pillars">
          {c.pillars.map((p) => (
            <div className="v3-pillar" key={p.title}>
              <div className="v3-pillar-top">
                <div className="v3-pillar-icon"><Icon name={p.icon} size={15} strokeWidth={2} /></div>
                <div className="v3-pillar-num">{p.n}</div>
              </div>
              <div className="v3-pillar-title">{p.title}</div>
              <div className="v3-pillar-body">{p.body}</div>
            </div>
          ))}
        </div>

        <div className="v3-cols">
          {features.map((f) => (
            <div className={`v3-feature ${f.variant}`} key={f.title}>
              <div className="v3-feature-head">
                <div className="v3-feature-icon"><Icon name={f.icon} size={15} strokeWidth={2.2} /></div>
                <div className="v3-feature-title">{f.title}</div>
              </div>
              <p className="v3-feature-body">{f.body}</p>
              <ul className="v3-list">
                {f.bullets.map((b) => (
                  <li key={b}><Icon name="check" size={11} strokeWidth={2.8} />{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="v3-label"><b>◢</b> Deploy your way</div>
        <div className="v3-deploy">
          {c.deploy.map((d) => (
            <div className="v3-deploy-card" key={d.name}>
              <div className="v3-deploy-head">
                <span className="v3-deploy-icon"><Icon name={d.icon} size={13} strokeWidth={2} /></span>
                <span className="v3-deploy-name">{d.name}</span>
              </div>
              <div className="v3-deploy-tag">{d.tag}</div>
            </div>
          ))}
        </div>

        <div className="v3-spacer" />

        <div className="v3-footer">
          <div>
            <div className="v3-footer-label">Ready to see it live?</div>
            <div className="v3-footer-cta">Schedule a demonstration</div>
          </div>
          <div className="v3-footer-contact">
            <div className="v3-footer-line"><Icon name="globe" size={12} strokeWidth={2.2} /> {c.contact.site}</div>
            <div className="v3-footer-line"><Icon name="edit" size={12} strokeWidth={2.2} /> {c.contact.email}</div>
          </div>
        </div>
        <div className="v3-colophon">
          <span>{c.brand} © 2026</span>
          <span>Managed Cloud · Self-Hosted · BYOK AI</span>
        </div>
      </div>
    </div>
  );
}
