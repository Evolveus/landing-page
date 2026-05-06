import Logo from '../ui/Logo';
import '../../styles/impact.css';

const STATS = [
  { num:'2,000+', lbl:'QUIZZES CONDUCTED', sub:'Across departments, terms, formats.' },
  { num:'2,00,000', lbl:'RESPONSES PROCESSED', sub:'MCQ · Descriptive · Code.' },
  { num:'93%', lbl:'FACULTY AGREEMENT', sub:'With AI-graded descriptive scores.' },
  { num:'0.8s', lbl:'AVG. GRADE TIME', sub:'Per response, every format.' },
];

const CHART_ROWS = [
  { type:'MCQ', manualW:27, evalW:1, manualV:'6h', evalV:'0.4s', pct:'-92%' },
  { type:'Coding', manualW:78, evalW:1.5, manualV:'22h', evalV:'5s', pct:'-91%', flagship:false },
  { type:'Descriptive', manualW:60, evalW:1, manualV:'16h', evalV:'1.4s', pct:'-97%', flagship:true },
  { type:'Fill-in-blank', manualW:20, evalW:1, manualV:'5h', evalV:'0.6s', pct:'-92%' },
];

const FEATURES = [
  { icon:`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`, title:'True AI grading', desc:'Not just MCQ — descriptive, code, and semantic blanks.' },
  { icon:`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`, title:'Proctoring that scales', desc:'Lab-grade integrity for 50,000+ student institutions.' },
  { icon:`<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>`, title:'Single platform', desc:'Author → proctor → grade → analyze. No glue code.' },
  { icon:`<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`, title:'Loop-closing analytics', desc:'Insights feed back into the question bank automatically.' },
];

export default function ImpactPage() {
  return (
    <div className="page p7">
      <div className="p7-bg-glow" />

      <div className="header p7-header">
        <Logo light />
        <div className="header-meta" style={{ color:'rgba(255,255,255,0.35)' }}>IMPACT &amp; CONTACT · 06 / 06</div>
      </div>

      <div className="p7-body">
        <div className="p7-top">
          <div className="p7-pill">
            <span className="p7-pill-dot" />
            <span className="p7-pill-impact">impact</span>
            <span className="p7-pill-sep">|</span>
            BUILT FOR REAL-WORLD SCALE
          </div>
          <h1 className="p7-headline">Beyond traditional <em>evaluation.</em></h1>
          <p className="p7-desc">Evalify goes beyond standard MCQ-based systems — handling descriptive answers, executable code, semantic fill-in-the-blanks, and the full operational lifecycle modern institutions need.</p>
        </div>

        <div className="p7-compare">
          <div className="p7-cmp-side">
            <div className="p7-cmp-label">BEFORE EVALIFY</div>
            <div className="p7-cmp-num">50<span className="p7-cmp-unit">hrs</span></div>
            <div className="p7-cmp-desc">Manual grading of 420 descriptive papers, mid-term cycle</div>
          </div>
          <div className="p7-cmp-arrow">→</div>
          <div className="p7-cmp-side">
            <div className="p7-cmp-label">WITH EVALIFY</div>
            <div className="p7-cmp-num">14<span className="p7-cmp-unit">min</span></div>
            <div className="p7-cmp-desc">Auto-graded with rubric rationale + faculty review queue</div>
          </div>
          <div className="p7-cmp-reduction">
            <div className="p7-cmp-pct">-86%</div>
            <div className="p7-cmp-rlab">FACULTY HOURS<br />RECLAIMED</div>
          </div>
        </div>

        <div className="p7-stats-strip">
          {STATS.map(({ num, lbl, sub }, i) => (
            <div key={lbl} style={{ display:'contents' }}>
              <div className="p7-stat">
                <div className="p7-stat-num">{num}</div>
                <div className="p7-stat-lbl">{lbl}</div>
                <div className="p7-stat-sub">{sub}</div>
              </div>
              {i < STATS.length - 1 && <div className="p7-stat-div" />}
            </div>
          ))}
        </div>

        <div className="p7-chart">
          <div className="p7-chart-top">
            <div>
              <div className="p7-chart-sup">WHERE THE TIME GOES</div>
              <div className="p7-chart-title">Manual grading time vs. Evalify, by question type</div>
            </div>
            <div className="p7-chart-baseline">BASELINE: 420-PAPER MID-TERM</div>
          </div>
          <div className="p7-chart-body">
            {CHART_ROWS.map(({ type, manualW, evalW, manualV, evalV, pct, flagship }) => (
              <div key={type} className="p7-chart-row">
                <div className="p7-crow-label">
                  <div className="p7-crow-type">
                    {type} {flagship && <span className="p7-badge-flagship">FLAGSHIP</span>}
                  </div>
                  <div className="p7-crow-subs">
                    <span className="p7-crow-manual">MANUAL</span>
                    <span className="p7-crow-eval">EVALIFY</span>
                  </div>
                </div>
                <div className="p7-crow-bars">
                  <div className="p7-bar-manual" style={{ width:`${manualW}%` }} />
                  <div className="p7-bar-eval" style={{ width:`${evalW}%` }} />
                </div>
                <div className="p7-crow-vals">
                  <span className="p7-val-manual">{manualV}</span>
                  <span className="p7-val-eval">{evalV}</span>
                </div>
                <div className="p7-crow-pct">{pct}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p7-features">
          <div className="p7-features-label">WHAT MAKES EVALIFY DIFFERENT</div>
          <div className="p7-feat-cards">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="p7-feat-card">
                <div className="p7-feat-icon">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" dangerouslySetInnerHTML={{ __html: icon }} />
                </div>
                <div className="p7-feat-title">{title}</div>
                <div className="p7-feat-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p7-bottom">
          <div className="p7-cta">
            <div className="p7-cta-label">GET IN TOUCH</div>
            <h2 className="p7-cta-title">Bring Evalify to your institution.</h2>
            <p className="p7-cta-desc">Book a 30-minute walkthrough — we'll tailor the demo to your departments, exam formats, and integrity requirements.</p>
            <div className="p7-cta-btns">
              <a href="#" className="p7-btn-primary">Book a demo →</a>
              <a href="#" className="p7-btn-secondary">Download datasheet</a>
            </div>
          </div>

          <div className="p7-contact-card">
            <div className="p7-contact-label">CONTACT</div>
            <div className="p7-contact-item">
              <div className="p7-contact-icon p7-ci-email">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div className="p7-contact-info">
                <div className="p7-contact-type">EMAIL</div>
                <div className="p7-contact-val">aksaykanthan@gmail.com</div>
              </div>
            </div>
            <div className="p7-contact-item">
              <div className="p7-contact-icon p7-ci-phone">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 .01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/></svg>
              </div>
              <div className="p7-contact-info">
                <div className="p7-contact-val">+91 93447 69532</div>
              </div>
            </div>
            <div className="p7-contact-item">
              <div className="p7-contact-icon p7-ci-web">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              </div>
              <div className="p7-contact-info">
                <div className="p7-contact-type">WEB</div>
                <div className="p7-contact-val">evalify.in</div>
              </div>
            </div>
            <div className="p7-contact-team">
              <div className="p7-team-avatars">
                <div className="p7-avatar" style={{ background:'#6366f1' }}>AK</div>
                <div className="p7-avatar" style={{ background:'#0d9488' }}>RS</div>
                <div className="p7-avatar" style={{ background:'#7c3aed' }}>+3</div>
              </div>
              <div className="p7-team-text">Our team will reply within 24 hours.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p7-footer">
        <div className="p7-footer-left">
          <Logo light />
          <span className="p7-footer-sub">AI Evaluation Platform for Modern Institutions</span>
        </div>
        <div className="p7-footer-right">© 2026 EVALIFY · v2.4 · Brochure · 06 / 06</div>
      </div>
    </div>
  );
}
