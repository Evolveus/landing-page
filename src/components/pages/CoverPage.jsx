import PageHeader from '../Layout/PageHeader';
import PageFooter from '../Layout/PageFooter';
import '../../styles/cover.css';

export default function CoverPage() {
  return (
    <div className="page p1">
      <div className="p1-grid" />
      <div className="p1-glow" />
      <PageHeader label="COVER · 01 / 06" />

      <div className="p1-body">
        <div className="p1-content">
          <div className="pill indigo" style={{ marginBottom: 22 }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>
            AI EVALUATION PLATFORM &nbsp;&nbsp; v2.4 &nbsp;·&nbsp; 2026
          </div>

          <h1 className="headline-huge">
            Smart <br />evaluation.<br />
            <em>Better</em><br />
            learning outcomes.
          </h1>

          <p className="p1-desc">
            Create, conduct, and evaluate exams — all in one place.
          </p>

          <div className="p1-stats-strip">
            <div className="ss-item ss-item-main">
              <strong>2K+</strong><span>Exams Evaluated</span>
            </div>
            <div className="ss-item">
              <strong>80%</strong><span>Faster Grading</span>
            </div>
            <div className="ss-item">
              <strong>100%</strong><span>Audit Ready</span>
            </div>
          </div>

          <div className="p1-actions">
            <a href="#" className="btn-primary-lrg">Book a Demo →</a>
            <a href="#" className="btn-secondary-txt">See Evalify in action →</a>
          </div>

          <div className="p1-trusted">
            <div className="trusted-text">Trusted by</div>
            <div className="trusted-logos">
              <div className="t-logo">
                <svg viewBox="0 0 260 30">
                  <text x="0" y="20" fontFamily="sans-serif" fontWeight="800" fontSize="14" fill="currentColor" letterSpacing="-0.5">Amrita Vishwa Vidyapeetham</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Widgets */}
        <div className="p1-widgets">
          {/* Alert */}
          <div className="widget w-alert">
            <div className="w-alert-icon">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <div>
              <div className="w-alert-title">Tab switch detected</div>
              <div className="w-alert-sub">Roll · 21CS084 · 12:14:08</div>
            </div>
          </div>

          {/* Performance */}
          <div className="widget w-perf">
            <div className="w-perf-head">
              <span className="w-perf-tag">FALL · CS-301</span>
              <span className="w-perf-live">Live</span>
            </div>
            <div className="w-perf-title">Mid-term performance</div>
            <div className="w-perf-stats">
              <div className="wp-stat"><span className="lbl">AVG. SCORE</span><span className="val">78.4</span><span className="sub">+4.2</span></div>
              <div className="wp-stat"><span className="lbl">SUBMITTED</span><span className="val">412/420</span><span className="sub neutral">98%</span></div>
              <div className="wp-stat"><span className="lbl">FLAGGED</span><span className="val">3</span><span className="sub neutral">0.7%</span></div>
            </div>
            <div className="w-perf-dist-title"><span>Score distribution</span><span>n = 420</span></div>
            <div className="w-perf-bars">
              {[20,30,40,60,100,90,60,40,20,10].map((h, i) => (
                <div key={i} className={`w-bar${h >= 60 ? ' active' : ''}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* AI Generator */}
          <div className="widget w-ai">
            <div className="w-ai-head">
              <div className="w-ai-icon">
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M12 2v20M17 5l-5-3-5 3M17 19l-5 3-5-3M2 12h20"/>
                </svg>
              </div>
              <div className="w-ai-title">AI Question Generator</div>
            </div>
            <div className="w-ai-body">
              Generate <strong>15 MCQs</strong> on <em>Binary Search Trees</em>, mixed Bloom levels, with negative marking.
            </div>
            <div className="w-ai-tags">
              <span className="w-ai-tag">BST</span>
              <span className="w-ai-tag">Apply</span>
              <span className="w-ai-tag">Analyze</span>
            </div>
            <div className="w-ai-prog-bar"><div className="w-ai-prog-fill" /></div>
            <div className="w-ai-prog-lbl">11/15</div>
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
