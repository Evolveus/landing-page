import PageHeader from "../Layout/PageHeader";
import PageFooter from "../Layout/PageFooter";
import "../../styles/cover.css";

export default function CoverPage() {
  return (
    <div className="page p1">
      <PageHeader folio="01" />

      <div className="p1-grid-overlay" aria-hidden />

      <div className="p1-stage">
        <div className="p1-left">
          <h1 className="p1-display">
            <span>Evaluation,</span>
            <span>
              <em>evolved.</em>
            </span>
          </h1>

          <p className="p1-lede">
            One platform for every exam your institution runs — authored,
            proctored, graded, and analysed by intelligence designed for the way
            faculty actually work.
          </p>

          <div className="p1-meta">
            <div className="p1-meta-row">
              <span className="p1-meta-key">A brochure on</span>
              <span className="p1-meta-val">
                AI-driven assessment for higher education
              </span>
            </div>
            <div className="p1-meta-row">
              <span className="p1-meta-key">Pages</span>
              <span className="p1-meta-val">07</span>
            </div>
            <div className="p1-meta-row">
              <span className="p1-meta-key">Read time</span>
              <span className="p1-meta-val">~ 6 minutes</span>
            </div>
          </div>

          <div className="p1-trusted">
            <div className="caption">In partnership with</div>
            <img
              src="/Amrita_Logo_Banner.svg"
              alt="Amrita Vishwa Vidyapeetham"
              className="p1-partner-logo"
            />
          </div>
        </div>

        <aside className="p1-right">
          <CoverWidget />
        </aside>
      </div>

      <PageFooter chapter="Cover" />
    </div>
  );
}

function CoverWidget() {
  return (
    <figure className="p1-figure">
      <figcaption className="p1-fig-cap">
        <span className="caption">FIG. 01 — Live, mid-grade</span>
      </figcaption>

      <div className="p1-screen">
        <div className="p1-scr-top">
          <span className="p1-scr-dot" />
          <span className="p1-scr-dot" />
          <span className="p1-scr-dot" />
          <span className="p1-scr-tab">CS-301 · Mid-term · Q4</span>
        </div>

        <div className="p1-scr-body">
          <div className="p1-scr-eyebrow">DESCRIPTIVE — 10 marks</div>
          <p className="p1-scr-q">
            Explain how a deadlock can occur in a multi-threaded system.
          </p>

          <div className="p1-scr-rubric">
            <div className="p1-rub-row">
              <span className="p1-rub-tick" data-state="ok">
                ✓
              </span>
              <span className="p1-rub-label">Defines deadlock correctly</span>
              <span className="p1-rub-score">2 / 2</span>
            </div>
            <div className="p1-rub-row">
              <span className="p1-rub-tick" data-state="ok">
                ✓
              </span>
              <span className="p1-rub-label">Lists 4 Coffman conditions</span>
              <span className="p1-rub-score">2 / 2</span>
            </div>
            <div className="p1-rub-row">
              <span className="p1-rub-tick" data-state="ok">
                ✓
              </span>
              <span className="p1-rub-label">Concrete worked example</span>
              <span className="p1-rub-score">2 / 2</span>
            </div>
            <div className="p1-rub-row">
              <span className="p1-rub-tick" data-state="warn">
                ~
              </span>
              <span className="p1-rub-label">Discusses prevention</span>
              <span className="p1-rub-score">1 / 4</span>
            </div>
          </div>

          <div className="p1-scr-foot">
            <div className="p1-scr-time">graded · 0.74s</div>
            <div className="p1-scr-total">
              <span>Score</span>
              <strong>7 / 10</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="p1-fig-ann">
        420 descriptive papers, returned in 14 minutes.
      </div>
    </figure>
  );
}
