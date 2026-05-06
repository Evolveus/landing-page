import PageHeader from '../Layout/PageHeader';
import PageFooter from '../Layout/PageFooter';
import '../../styles/problem.css';

const ProblemFeature = ({ icon, title, desc }) => (
  <div className="p2-feat">
    <div className="p2-feat-icon" dangerouslySetInnerHTML={{ __html: icon }} />
    <div className="p2-feat-text">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  </div>
);

const PROBLEMS = [
  { icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`, title: 'No AI in the grading loop', desc: 'Most platforms stop at OMR and spreadsheets. Descriptive answers mean manual labour — no AI, no consistency, no scale.' },
  { icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`, title: 'No real-time insight', desc: 'Faculty wait days for compiled reports; weak areas surface only after the term ends.' },
  { icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/></svg>`, title: 'Scale breaks workflows', desc: 'Lab-by-lab coordination, multiple invigilators, and brittle exam software at scale.' },
  { icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>`, title: 'Platforms stuck without AI', desc: 'Competitors offer static rubrics at best. No LLM-graded essays, no semantic fill-in-the-blank, no coding auto-evaluation — just keyword matching.' },
];

const SOLUTIONS = [
  { icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10zM2 12h20"/></svg>`, title: 'Online + offline-ready', desc: 'Conduct exams in proctored online or air-gapped lab mode — same authoring, same analytics.' },
  { icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/><circle cx="12" cy="12" r="3"/></svg>`, title: 'Centralised intelligence', desc: 'Every response, every grade, every student rolls up into one performance graph.' },
  { icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`, title: 'Automated workflows', desc: 'MCQ, descriptive, and coding evaluations run end-to-end — no manual intervention.', highlight: true },
  { icon: `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/></svg>`, title: 'Adaptive by design', desc: 'Insights feed back into question banks, so each cohort\'s exams sharpen over time.' },
];

export default function ProblemSolutionPage() {
  return (
    <div className="page p2">
      <PageHeader label="THE CASE FOR EVALIFY · 02 / 06" />

      <div className="p2-header-area">
        <div className="p2-headline-col">
          <div className="line-heading">THE SHIFT</div>
          <h2 className="headline p2-headline">
            Active learning<br />has evolved.<br />Evaluation<br />platforms haven't —<br /><em>especially on AI.</em>
          </h2>
        </div>
        <div className="p2-desc-col">
          <p className="p2-desc">
            Modern institutions still run assessment on stitched-together tools; paper for some courses, half a dozen quiz apps for others, spreadsheets to glue it all back together. Evalify replaces that with one platform that scales from a 30-seat classroom to a 50,000-student university.
          </p>
        </div>
      </div>

      <div className="p2-cols">
        <div className="p2-col light">
          <div className="p2-col-head">
            <div className="pill" style={{ background:'#fee2e2', color:'var(--danger)' }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>
              Today's &nbsp; PROBLEM
            </div>
            <h3 className="p2-col-title">Challenges institutions face today</h3>
            <p className="p2-col-sub">Fragmented tools, manual grading, and zero feedback loops produce operational drag and inconsistent outcomes.</p>
          </div>
          <div className="p2-features">
            {PROBLEMS.map(f => <ProblemFeature key={f.title} {...f} />)}
          </div>
        </div>

        <div className="p2-col dark solution-card">
          <div className="p2-col-head">
            <div className="pill" style={{ background:'rgba(16,185,129,0.2)', color:'#a7f3d0' }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>
              With Evalify &nbsp; SOLUTION
            </div>
            <h3 className="p2-col-title">A unified <em>evaluation</em> platform</h3>
            <p className="p2-col-sub">The entire evaluation lifecycle — authoring, configuration, proctoring, grading, analytics — in one intelligent platform.</p>
          </div>
          <div className="p2-features">
            {SOLUTIONS.map(f => (
              <div key={f.title} className={`p2-feat${f.highlight ? ' highlight' : ''}`}>
                <div className="p2-feat-icon" dangerouslySetInnerHTML={{ __html: f.icon }} />
                <div className="p2-feat-text">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p2-shift-strip">
        <div className="p2-shift-label">THE SHIFT IN NUMBERS</div>
        <div className="p2-shift-items">
          {[
            { metric: 'Grading time per exam', before: '6 hrs', after: '6 min' },
            { metric: 'Tools needed per assessment', before: '6+ apps', after: '1 platform' },
            { metric: 'Result visibility for faculty', before: 'Days later', after: 'Real-time' },
            { metric: 'AI-powered evaluation', before: 'None', after: 'Descriptive · Coding · Semantic FIB' },
          ].map(({ metric, before, after }, i, arr) => (
            <div key={metric} style={{ display: 'contents' }}>
              <div className="p2-shift-item">
                <div className="p2-shift-metric">{metric}</div>
                <div className="p2-shift-compare">
                  <span className="shift-before">{before}</span>
                  <span className="shift-arrow">→</span>
                  <span className="shift-after">{after}</span>
                </div>
              </div>
              {i < arr.length - 1 && <div className="p2-shift-divider" />}
            </div>
          ))}
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
