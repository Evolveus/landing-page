import PageHeader from '../Layout/PageHeader';
import PageFooter from '../Layout/PageFooter';
import '../../styles/advanced.css';

export default function AdvancedPage() {
  return (
    <div className="page p5">
      <PageHeader label="ADVANCED CAPABILITIES · 05 / 06" />

      <div className="p5-top">
        <div className="line-heading">THE REASON INSTITUTIONS SWITCH</div>
        <h2 className="headline">Most platforms can grade an MCQ.<br /><em>Evalify</em> grades the essay too.</h2>
        <p className="p5-desc">Long-form descriptive answers are where manual grading hurts — hours per paper, inconsistent rubric application, no audit trail. Our descriptive evaluator changes the math.</p>
      </div>

      <div className="p5-main-card">
        <div className="p5-mc-top">
          <div className="p5-mc-info">
            <div className="p5-pills-row">
              {['Descriptive Evaluator','FLAGSHIP','LLM-GRADED','RUBRIC-DRIVEN'].map(l => (
                <div key={l} className="pill dark" style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', fontSize:8, padding:'3px 7px' }}>{l}</div>
              ))}
            </div>
            <h2 className="p5-mc-title">Long-form answers, graded with the consistency of a senior faculty — <em>at the speed of a script.</em></h2>
          </div>
          <div className="p5-mc-turnaround">
            <div className="p5-ta-lbl">TURNAROUND</div>
            <div className="p5-ta-val">50h <span className="p5-ta-arr">→</span> 14m</div>
            <div className="p5-ta-sub">420 descriptive papers · Spring '26 · CS-301 cohort</div>
          </div>
        </div>

        <div className="p5-mc-mid">
          <div className="w-evaluator">
            <div className="we-q">
              <span className="q-tag">Q4</span> Explain how a deadlock can occur in a multi-threaded system. (10 marks)
              <span className="q-meta">21CS084</span>
            </div>
            <div className="we-ans">
              <div className="we-ans-lbl">STUDENT ANSWER</div>
              <div className="we-ans-text">
                A deadlock happens when two threads each hold a resource the other wants. The four conditions are mutual exclusion, hold and wait, no preemption, and circular wait. <span className="hi">Thread A locks file1 and asks for file2 while thread B locks file2 and asks for file1.</span>
              </div>
            </div>
            <div className="we-rubric">
              <div className="we-rub-head"><span>RUBRIC EVALUATION</span><span>3/4 CRITERIA MET</span></div>
              {[
                { icon:'✓', label:'Defines deadlock correctly', score:'2/2', fill:100, pass:true },
                { icon:'✓', label:'Lists 4 Coffman conditions', score:'2/2', fill:100, pass:true },
                { icon:'✓', label:'Concrete example with resources', score:'2/2', fill:100, pass:true },
                { icon:'~', label:'Discusses prevention strategy', score:'1/4', fill:25, pass:false },
              ].map(({ icon, label, score, fill, pass }) => (
                <div key={label} className="we-rub-item">
                  <div className="we-rub-i-top">
                    <span className={pass ? 'check' : 'warn'}>{icon}</span> {label}
                    <span>{score}</span>
                  </div>
                  <div className="we-rub-bar">
                    <div className="we-rub-fill" style={{ width:`${fill}%`, background: pass ? '#10b981' : '#f59e0b' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="we-score-box">
              <div className="we-score-left">Evalify · auto-graded · 0.74s</div>
              <div className="we-score-val">Score 7 / 10</div>
            </div>
            <div className="we-approved">✓ Approved by faculty · Dr. B. Sharma · 12:41</div>
          </div>

          <div className="p5-hw">
            <div className="p5-hw-title">HOW DESCRIPTIVE GRADING WORKS</div>
            {[
              { n:'1', head:'Faculty defines rubric', body:'Criteria, weights, key points — set once per question.' },
              { n:'2', head:'LLM scores per criterion', body:'Each rubric line gets an independent score with rationale.' },
              { n:'3', head:'Faculty reviews & overrides', body:'Edge cases surface for review; everything else lands graded.' },
              { n:'✓', head:'Customizable rubrics per question', body:'Define criteria, weights, and key concepts. Model grades against your rubric.', check:true },
              { n:'✓', head:'Semantic understanding, not keyword match', body:'Recognizes equivalent phrasing, partial credit for partial reasoning.', check:true },
              { n:'✓', head:'Full audit trail with rationale', body:'Every score includes the rubric line and AI\'s justification — defensible at appeal.', check:true },
            ].map(({ n, head, body, check }) => (
              <div key={head} className="p5-hw-step">
                <div className={`p5-hw-num${check ? ' check' : ''}`}>{n}</div>
                <div className="p5-hw-text"><h4>{head}</h4><p>{body}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="p5-mc-bot">
          {[
            { num:'97%', lbl:'Rubric criteria addressed', sub:'per descriptive response, auto-detected' },
            { num:'3x', lbl:'Consistency vs. manual grading', sub:'same rubric = same score, every time' },
            { num:'6h→6m', lbl:'Result turnaround', sub:'from exam close to publish' },
            { num:'100%', lbl:'Audit-ready', sub:'rationale + rubric on every score' },
          ].map(({ num, lbl, sub }) => (
            <div key={lbl} className="p5-stat">
              <div className="p5-stat-num">{num}</div>
              <div className="p5-stat-lbl">{lbl}</div>
              <div className="p5-stat-sub">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p5-bottom-cards">
        <CodingCard />
        <ProctoringCard />
        <QuestionBankCard />
      </div>

      <PageFooter />
    </div>
  );
}

function CodingCard() {
  return (
    <div className="p5-bc">
      <div className="p5-bc-pill">⟨/⟩ Coding Evaluator</div>
      <h3 className="p5-bc-title">Test cases, partial credit, sub-second.</h3>
      <div className="p5-bc-widget">
        <div className="w-code-head"><span>solution.py</span><span className="w-code-score">4/5 ✓</span></div>
        {[['✓ linear graph','2ms',true],['✓ disconnected','3ms',true],['✓ cyclic','5ms',true],['✗ self-loop','-',false],['✓ 10K nodes','84ms',true]].map(([t,tm,ok]) => (
          <div key={t} className={`w-code-tc${ok ? '' : ' err'}`}>
            <span style={{ color: ok ? 'var(--success)' : 'var(--danger)' }}>{t}</span><span>{tm}</span>
          </div>
        ))}
        <div className="w-code-bot"><span>Partial credit</span><span>16 / 20</span></div>
      </div>
      <div className="p5-bc-list">
        {['Run isolated test cases per student','Award partial credit for logic','Python, Java, C++, JS, SQL'].map(l => (
          <div key={l} className="p5-bc-list-item"><svg viewBox="0 0 24 24" width="9" height="9" stroke="var(--indigo-600)" strokeWidth="2.5" fill="none"><path d="M20 6L9 17l-5-5"/></svg>{l}</div>
        ))}
      </div>
    </div>
  );
}

function ProctoringCard() {
  const events = [
    { time:'12:41', tag:'WARN', tagClass:'warn', desc:'Tab switch · 21CS084' },
    { time:'12:38', tag:'INFO', tagClass:'info', desc:'Fullscreen restored' },
    { time:'12:36', tag:'OK', tagClass:'ok', desc:'84 candidates · clear' },
    { time:'12:33', tag:'WARN', tagClass:'warn', desc:'Copy-paste blocked' },
  ];
  return (
    <div className="p5-bc">
      <div className="p5-bc-pill">👁 Proctoring</div>
      <h3 className="p5-bc-title">Detect suspicious behavior — instantly.</h3>
      <div className="p5-bc-widget">
        <div className="w-proc-head"><span>Live integrity</span><span className="w-proc-live">Streaming</span></div>
        {events.map(e => (
          <div key={e.time + e.desc} className="w-proc-event">
            <span className="w-proc-time">{e.time}</span>
            <span className={`w-proc-tag ${e.tagClass}`}>{e.tag}</span>
            <span className="w-proc-desc">{e.desc}</span>
          </div>
        ))}
      </div>
      <div className="p5-bc-list">
        {['Tab-switch & fullscreen detection','Kiosk mode + IP/subnet locks','Live integrity feed with replay'].map(l => (
          <div key={l} className="p5-bc-list-item"><svg viewBox="0 0 24 24" width="9" height="9" stroke="var(--indigo-600)" strokeWidth="2.5" fill="none"><path d="M20 6L9 17l-5-5"/></svg>{l}</div>
        ))}
      </div>
    </div>
  );
}

function QuestionBankCard() {
  return (
    <div className="p5-bc">
      <div className="p5-bc-pill">≡ Question Bank</div>
      <h3 className="p5-bc-title">One bank. Every department.</h3>
      <div className="p5-bc-widget">
        <div className="w-qb-head"><span>CS dept · question bank</span><span>2,418</span></div>
        {[
          { tag:'MCQ', name:'Binary Search Trees', count:'×34', active:false },
          { tag:'DESC', name:'OS - Synchronization', count:'×12', active:true },
          { tag:'CODE', name:'Dynamic Programming', count:'×8', active:false },
          { tag:'MCQ', name:'DBMS - Normalization', count:'×56', active:false },
        ].map(({ tag, name, count, active }) => (
          <div key={name} className={`w-qb-row${active ? ' active' : ''}`}>
            <div className="w-qb-left">
              <span className="w-qb-tag" style={active ? { color:'var(--text-main)' } : {}}>{tag}</span>
              <span className="w-qb-name" style={active ? { color:'var(--indigo-600)' } : {}}>{name}</span>
            </div>
            <span className="w-qb-count">{count}</span>
          </div>
        ))}
      </div>
      <div className="p5-bc-list">
        {['Centralized, taggable, reusable','Per-student randomization','AI authoring from syllabus PDFs'].map(l => (
          <div key={l} className="p5-bc-list-item"><svg viewBox="0 0 24 24" width="9" height="9" stroke="var(--indigo-600)" strokeWidth="2.5" fill="none"><path d="M20 6L9 17l-5-5"/></svg>{l}</div>
        ))}
      </div>
    </div>
  );
}
