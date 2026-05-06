import PageHeader from '../Layout/PageHeader';
import PageFooter from '../Layout/PageFooter';
import '../../styles/capabilities.css';

const FORMATS = [
  { label: 'Multiple Choice', icon: `<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>` },
  { label: 'Descriptive', icon: `<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>` },
  { label: 'Coding', icon: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>` },
  { label: 'Fill-in-the-blank', icon: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>` },
];

export default function CapabilitiesPage() {
  return (
    <div className="page p4">
      <PageHeader label="CORE CAPABILITIES · 04 / 06" />

      <div className="p4-top">
        <div className="line-heading">DESIGNED FOR INSTITUTIONAL SCALE</div>
        <h2 className="headline">Three pillars. <em>One</em> powerful evaluation system.</h2>
      </div>

      <div className="p4-cards">
        <div className="p4-card">
          <div className="p4-pillar-lbl">Pillar 01</div>
          <div className="p4-card-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
              <rect x="9" y="3" width="6" height="4" rx="1"/>
              <path d="M9 12h6M9 16h4"/>
            </svg>
          </div>
          <h3 className="p4-card-title">Examination<br />Management</h3>
          <ul className="p4-bullets">
            <li>Create &amp; schedule exams instantly</li>
            <li>Multi-format question support</li>
            <li>Secure, timed environments</li>
            <li>Negative marking — global or per-question</li>
            <li>Linear quiz support</li>
          </ul>
        </div>

        <div className="p4-card p4-card--featured">
          <div className="p4-pillar-lbl">Pillar 02</div>
          <div className="p4-feat-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <h3 className="p4-card-title">Performance<br />Analytics</h3>
          <p className="p4-feat-tagline">See exactly where every student stands — in real time.</p>
          <ul className="p4-bullets">
            <li>Real-time cohort dashboards</li>
            <li>Identify weak areas instantly</li>
            <li>Per-question difficulty breakdown</li>
            <li>Exportable audit-ready reports</li>
          </ul>
          <div className="p4-feat-badge">★ &nbsp;Core Differentiator</div>
        </div>

        <div className="p4-card">
          <div className="p4-pillar-lbl">Pillar 03</div>
          <div className="p4-card-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3 className="p4-card-title">Security &amp;<br />Compliance</h3>
          <ul className="p4-bullets">
            <li>Kiosk mode + IP/subnet restrictions</li>
            <li>RBAC — faculty, admin, student roles</li>
            <li>Full audit logs with score override tracking</li>
          </ul>
        </div>
      </div>

      <div className="p4-ai-methods">
        <div className="p4-aim-label">AI EVALUATION METHODS</div>
        <div className="p4-aim-cards">
          {[
            { title: 'Descriptive', desc: 'LLM-scored per rubric criterion. Faculty defines weights and guidelines; Evalify applies them consistently at scale.' },
            { title: 'Coding', desc: 'Submitted code executed against isolated test cases. Partial credit awarded based on number of tests passed.' },
            { title: 'Semantic Fill-in-the-Blank', desc: 'Accepts synonyms and semantically equivalent answers — not just exact matches. No manual review needed.' },
          ].map(({ title, desc }) => (
            <div key={title} className="p4-aim-card">
              <div className="p4-aim-card-title">{title}</div>
              <div className="p4-aim-card-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p4-formats">
        <div className="p4-f-left">
          <div className="p4-f-label">SUPPORTED FORMATS</div>
          <div className="p4-f-desc">Author once, deliver in any<br />modality your institution needs.</div>
        </div>
        <div className="p4-f-pills">
          {FORMATS.map(({ label, icon }) => (
            <div key={label} className="p4-f-pill">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" dangerouslySetInnerHTML={{ __html: icon }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
