import { Icon } from "../landing/_shared/Icon";
import { FLYER, useA4Export } from "./content";
import "./FlyerV4.css";

const WORKFLOW = ["Plan", "Create", "Deliver", "Evaluate", "Improve"];

export default function FlyerV4({ onHome }) {
  const { ref, exporting, exportPDF } = useA4Export(
    "evolveus-flyer-v4.pdf",
    "#f4f7fb",
  );
  const c = FLYER;

  return (
    <div className="v4-root">
      <div className="v4-toolbar">
        {onHome && <button className="v4-button v4-home" onClick={onHome}>← Home</button>}
        <button className="v4-button" onClick={exportPDF} disabled={exporting}>
          <Icon name="fileText" size={14} strokeWidth={2.2} />
          {exporting ? "Exporting…" : "Export A4 PDF"}
        </button>
      </div>

      <main className="v4-sheet" ref={ref}>
        <aside className="v4-rail">
          <div className="v4-brand">
            <span className="v4-brand-mark"><Icon name="check" size={17} strokeWidth={3} /></span>
            <div>
              <div className="v4-brand-name">{c.brand}</div>
              <div className="v4-brand-sub">{c.brandSub}</div>
            </div>
          </div>

          <div className="v4-rail-hero">
            <div className="v4-kicker">Assessment, evolved.</div>
            <h1>One system.<br />Every exam.<br /><em>Better outcomes.</em></h1>
            <p>{c.lede}</p>
          </div>

          <div className="v4-workflow">
            <div className="v4-overline">One continuous workflow</div>
            {WORKFLOW.map((step, index) => (
              <div className="v4-workflow-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <b>{step}</b>
              </div>
            ))}
          </div>

          <div className="v4-rail-note">
            <Icon name="shieldCheck" size={17} strokeWidth={2} />
            <div><b>Built for higher education</b><span>Secure, scalable and institution-ready.</span></div>
          </div>
        </aside>

        <section className="v4-content">
          <header className="v4-topline">
            <span>Platform overview</span>
            <span>Edition 2026</span>
          </header>

          <div className="v4-intro">
            <div>
              <div className="v4-overline v4-overline-blue">Complete assessment infrastructure</div>
              <h2>From question bank<br />to actionable insight.</h2>
            </div>
            <p>Replace disconnected tools with one dependable platform for faculty, students and administrators.</p>
          </div>

          <div className="v4-capabilities">
            {c.pillars.map((pillar) => (
              <article className="v4-capability" key={pillar.title}>
                <div className="v4-capability-head">
                  <span className="v4-capability-icon"><Icon name={pillar.icon} size={16} strokeWidth={2} /></span>
                  <span className="v4-capability-num">{pillar.n}</span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>

          <div className="v4-differentiators">
            <div className="v4-diff-title">
              <span>Why Evolveus</span>
              <h3>Control where it matters.<br />Automation where it helps.</h3>
            </div>
            <div className="v4-diff-list">
              <div><Icon name="brain" size={17} strokeWidth={2} /><span><b>Faculty-led AI grading</b>BYOK models, transparent rubrics and full score override.</span></div>
              <div><Icon name="bolt" size={17} strokeWidth={2} /><span><b>Exam-day reliability</b>Autosave, isolated sandboxes and high-availability delivery.</span></div>
              <div><Icon name="lock" size={17} strokeWidth={2} /><span><b>Your deployment choice</b>Managed cloud or self-hosted with complete data control.</span></div>
            </div>
          </div>

          <footer className="v4-footer">
            <div>
              <span>See the complete platform in action</span>
              <strong>Schedule a demonstration</strong>
            </div>
            <div className="v4-contact">
              <span><Icon name="globe" size={12} strokeWidth={2} />{c.contact.site}</span>
              <span><Icon name="edit" size={12} strokeWidth={2} />{c.contact.email}</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
