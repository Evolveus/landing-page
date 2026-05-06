import PageHeader from '../Layout/PageHeader';
import PageFooter from '../Layout/PageFooter';
import '../../styles/systemflow.css';

const STEPS = [
  { step: '01', title: 'Question Creation', desc: 'Build question banks with flexibility across formats. Bulk-upload from Excel, or let AI generate exam-ready questions directly from your syllabus.', tags: ['Bulk import', 'AI generation'], icon: `<path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>` },
  { step: '02', title: 'Exam Configuration', desc: 'Configure with custom rules, patterns, and scoring methods. Set time limits, attempt restrictions, randomized ordering, and subnet-based access.', tags: ['Time limits', 'Randomization'], icon: `<circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07M8.46 8.46a5 5 0 000 7.07"/>` },
  { step: '03', title: 'Secure Exam', desc: 'Conduct exams in a secure, timed, proctored environment. Tab switches, full-screen exits, and unauthorized access are detected and logged in real time.', tags: ['Proctoring', 'Kiosk mode'], icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>` },
  { step: '04', title: 'Automated Evaluation', desc: 'Evaluate instantly with AI-powered accuracy. From objective scoring to LLM-based descriptive grading — results delivered without manual intervention.', tags: ['MCQ', 'Descriptive'], icon: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`, active: true },
  { step: '05', title: 'Analytics & Insights', desc: 'Real-time insights with dashboards. Per-student breakdowns, class-wide trends, exportable reports — faculty act on data, not just collect it.', tags: ['Dashboards', 'Per-student'], icon: `<path d="M18 20V10M12 20V4M6 20v-6"/>` },
  { step: '06', title: 'Performance Optimization', desc: 'Use insights to improve outcomes, personalise learning, drive excellence. Identify weak areas and course-correct before they compound.', tags: ['Adaptive', 'Outcomes'], icon: `<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>` },
];

export default function SystemFlowPage() {
  return (
    <div className="page p3">
      <PageHeader label="SYSTEM FLOW · 03 / 06" />

      <div className="p3-top">
        <div className="p3-top-row">
          <div className="line-heading">END-TO-END LIFECYCLE</div>
          <div className="p3-top-meta">
            <span className="p3-meta-num">06</span>
            <span className="p3-meta-lbl">STEPS</span>
            <span className="p3-meta-sep">·</span>
            <span className="p3-meta-lbl">Continuous loop</span>
          </div>
        </div>
        <h2 className="headline">One platform powering every stage of<br /><em>institutional</em> evaluation.</h2>
        <p className="p3-desc">Each step feeds the next. Authoring decisions inform configuration; proctoring data sharpens evaluation; analytics close the loop back into the question bank.</p>
      </div>

      <div className="p3-journey">
        {['Create','Configure','Conduct','Evaluate','Analyze','Optimize'].map((label, i) => (
          <span key={label}>
            <span className={i === 2 || i === 3 ? 'active-phase' : ''}>{label}</span>
            {i < 5 && <span className="p3-j-arrow"> → </span>}
          </span>
        ))}
      </div>

      <div className="p3-cards">
        <div className="p3-row">
          {STEPS.slice(0,3).map(s => <StepCard key={s.step} {...s} />)}
        </div>
        <div className="p3-row">
          {STEPS.slice(3).map(s => <StepCard key={s.step} {...s} />)}
        </div>
      </div>

      <div className="p3-loop">
        <div className="p3-loop-text">
          <h3>CLOSED LOOP</h3>
          <h2>Insights flow back into authoring.</h2>
          <p>Weak topic areas surfaced in analytics auto-suggest new question generation prompts — sharper exams every cycle.</p>
        </div>
        <div className="p3-loop-graphic">
          <svg viewBox="0 0 200 80">
            <path d="M10 50 C40 50, 60 20, 100 20 C140 20, 160 70, 190 40" stroke="#818cf8" strokeWidth="6" strokeDasharray="4 4" fill="none" opacity="0.15"/>
            <path d="M10 50 C40 50, 60 20, 100 20 C140 20, 160 70, 190 40" stroke="#a5b4fc" strokeWidth="2.5" strokeDasharray="4 4" fill="none"/>
            <circle cx="10" cy="50" r="5" fill="#c7d2fe"/>
            <circle cx="45" cy="30" r="3.5" fill="#818cf8"/>
            <circle cx="100" cy="20" r="5" fill="#fff"/>
            <circle cx="130" cy="40" r="3.5" fill="#818cf8"/>
            <circle cx="160" cy="65" r="5" fill="#c7d2fe"/>
            <circle cx="190" cy="40" r="5" fill="#10b981"/>
            <circle cx="190" cy="40" r="9" fill="#10b981" opacity="0.2"/>
            <text x="100" y="9" className="node-lbl" textAnchor="middle">DATA → INSIGHT</text>
            <text x="152" y="79" className="node-lbl" textAnchor="middle">INSIGHT → AUTHORING</text>
          </svg>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}

function StepCard({ step, title, desc, tags, icon, active }) {
  return (
    <div className={`p3-card${active ? ' active' : ''}`}>
      <div className="p3-card-head">
        <div className="p3-step-lbl">STEP {step}</div>
        <div className="p3-card-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" dangerouslySetInnerHTML={{ __html: icon }} />
        </div>
      </div>
      <h3 className="p3-card-title">{title}</h3>
      <p className="p3-card-desc">{desc}</p>
      <div className="p3-card-tags">
        {tags.map(t => <span key={t} className="p3-tag">{t}</span>)}
      </div>
    </div>
  );
}
