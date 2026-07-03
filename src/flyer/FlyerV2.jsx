import { Icon } from "../landing/_shared/Icon";
import { FLYER, useA4Export } from "./content";
import "./FlyerV2.css";

export default function FlyerV2({ onHome }) {
  const { ref, exporting, exportPDF } = useA4Export("evolveus-flyer-v2.pdf", "#f4f5fb");
  const c = FLYER;
  const features = [
    { ...c.aiEval, variant: "fill" },
    { ...c.performance, variant: "plain" },
  ];

  return (
    <div className="v2-root">
      <div className="v2-toolbar">
        {onHome && (
          <button className="v2-btn v2-btn-ghost" onClick={onHome}>← Home</button>
        )}
        <button className="v2-btn" onClick={exportPDF} disabled={exporting}>
          {exporting ? "Exporting…" : (<><Icon name="fileText" size={14} strokeWidth={2} /> Export A4 PDF</>)}
        </button>
      </div>

      <div className="v2-sheet" ref={ref}>
        <div className="v2-header">
          <div className="v2-brand">
            <div className="v2-brand-mark"><Icon name="checkCircle" size={17} strokeWidth={2.2} /></div>
            <div>
              <div className="v2-brand-name">{c.brand}</div>
              <div className="v2-brand-sub">{c.brandSub}</div>
            </div>
          </div>
          <div className="v2-edition">
            {c.edition.map((e) => (<div key={e}>{e}</div>))}
          </div>
        </div>

        <div className="v2-hero">
          <div className="v2-hero-inner">
            <div>
              <div className="v2-eyebrow">✦ {c.eyebrow}</div>
              <h1 className="v2-h1">
                {c.headline.pre} <em>{c.headline.em}</em><br />
                {c.headline.post}
              </h1>
            </div>
            <p className="v2-lede">{c.lede}</p>
          </div>
        </div>

        <div className="v2-label">The platform · six pillars</div>
        <div className="v2-pillars">
          {c.pillars.map((p) => (
            <div className="v2-pillar" key={p.title}>
              <div className="v2-pillar-top">
                <div className="v2-pillar-icon"><Icon name={p.icon} size={16} strokeWidth={1.9} /></div>
                <div className="v2-pillar-num">{p.n}</div>
              </div>
              <div className="v2-pillar-title">{p.title}</div>
              <div className="v2-pillar-body">{p.body}</div>
            </div>
          ))}
        </div>

        <div className="v2-label">Where Evolveus goes further</div>
        <div className="v2-cols">
          {features.map((f) => (
            <div className={`v2-feature ${f.variant}`} key={f.title}>
              <div className="v2-feature-head">
                <div className="v2-feature-icon"><Icon name={f.icon} size={15} strokeWidth={2} /></div>
                <div className="v2-feature-title">{f.title}</div>
              </div>
              <p className="v2-feature-body">{f.body}</p>
              <ul className="v2-list">
                {f.bullets.map((b) => (
                  <li key={b}><Icon name="check" size={11} strokeWidth={2.6} />{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="v2-label">Deploy your way</div>
        <div className="v2-deploy">
          {c.deploy.map((d) => (
            <div className="v2-deploy-card" key={d.name}>
              <div className="v2-deploy-head">
                <span className="v2-deploy-icon"><Icon name={d.icon} size={13} strokeWidth={1.9} /></span>
                <span className="v2-deploy-name">{d.name}</span>
              </div>
              <div className="v2-deploy-tag">{d.tag}</div>
            </div>
          ))}
        </div>

        <div className="v2-spacer" />

        <div className="v2-footer">
          <div>
            <div className="v2-footer-label">Ready to see it live?</div>
            <div className="v2-footer-cta">Schedule a demonstration</div>
          </div>
          <div className="v2-footer-contact">
            <div className="v2-footer-line"><Icon name="globe" size={12} strokeWidth={2} /> {c.contact.site}</div>
            <div className="v2-footer-line"><Icon name="edit" size={12} strokeWidth={2} /> {c.contact.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
