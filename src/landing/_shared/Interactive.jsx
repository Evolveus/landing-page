import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { useReveal } from './useParallax';

/* ============== AnimatedNumber ============== */
export function AnimatedNumber({ value, duration = 1400, suffix = '', prefix = '', format }) {
  const [n, setN] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, duration]);
  const display = format ? format(n) : Math.round(n).toLocaleString();
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

/* ============== Tabs ============== */
export function Tabs({ items, className = '', tabClass = '', activeClass = '', panelClass = '' }) {
  const [active, setActive] = useState(0);
  return (
    <div className={`x-tabs ${className}`}>
      <div className="x-tabs-bar" role="tablist">
        {items.map((it, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            className={`x-tab ${tabClass} ${active === i ? `is-active ${activeClass}` : ''}`}
            onClick={() => setActive(i)}
          >
            {it.icon && <Icon name={it.icon} size={14} />}
            <span>{it.label}</span>
          </button>
        ))}
      </div>
      <div className={`x-tab-panel ${panelClass}`} role="tabpanel">
        {items[active].content}
      </div>
    </div>
  );
}

/* ============== Accordion ============== */
export function Accordion({ items, className = '' }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={`x-acc ${className}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`x-acc-item ${isOpen ? 'is-open' : ''}`}>
            <button
              className="x-acc-head"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              {it.icon && <span className="x-acc-icon"><Icon name={it.icon} size={16} /></span>}
              <span className="x-acc-title">{it.title}</span>
              <span className="x-acc-toggle">
                <Icon name="arrowDown" size={16} />
              </span>
            </button>
            <div className="x-acc-body" style={{ maxHeight: isOpen ? '500px' : '0' }}>
              <div className="x-acc-body-inner">{it.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============== RubricDemo — Descriptive Evaluation Flagship ============== */
const DEFAULT_RUBRIC = [
  { label: 'Defines deadlock correctly', max: 2, scored: 2, met: true, note: 'Mentions mutual blocking on shared resources.' },
  { label: 'Lists 4 Coffman conditions', max: 2, scored: 2, met: true, note: 'Mutual exclusion, hold-and-wait, no preemption, circular wait.' },
  { label: 'Concrete example with resources', max: 2, scored: 2, met: true, note: 'Thread A/B, file1/file2 — concrete enough.' },
  { label: 'Discusses prevention strategy', max: 4, scored: 1, met: false, note: 'Briefly mentions prevention; no specifics on banker\'s algorithm or ordering.' },
];

export function RubricDemo() {
  const [rubric, setRubric] = useState(DEFAULT_RUBRIC);
  const [activeIdx, setActiveIdx] = useState(null);
  const [running, setRunning] = useState(false);
  const [doneSteps, setDoneSteps] = useState(0);

  const total = rubric.reduce((a, c) => a + c.scored, 0);
  const max = rubric.reduce((a, c) => a + c.max, 0);
  const pct = (total / max) * 100;

  const adjust = (i, delta) => {
    setRubric(r => r.map((row, j) =>
      j === i
        ? { ...row, scored: Math.max(0, Math.min(row.max, row.scored + delta)), met: row.scored + delta >= row.max }
        : row
    ));
  };

  const replay = () => {
    if (running) return;
    setRunning(true);
    setDoneSteps(0);
    let i = 0;
    const tick = () => {
      i++;
      setDoneSteps(i);
      if (i < rubric.length) {
        setTimeout(tick, 600);
      } else {
        setRunning(false);
      }
    };
    setTimeout(tick, 400);
  };

  return (
    <div className="x-rubric">
      <div className="x-rubric-head">
        <div>
          <div className="x-rubric-tag">DESCRIPTIVE EVALUATOR · LIVE DEMO</div>
          <div className="x-rubric-q">Q4 — Explain how a deadlock can occur in a multi-threaded system.</div>
        </div>
        <button className="x-rubric-replay" onClick={replay} disabled={running}>
          <Icon name={running ? 'clock' : 'refresh'} size={14} />
          {running ? 'Grading...' : 'Replay grading'}
        </button>
      </div>

      <div className="x-rubric-answer">
        <div className="x-rubric-eyebrow">STUDENT ANSWER · 86 words</div>
        <p>
          A deadlock happens when two threads each hold a resource the other wants. The four
          conditions are mutual exclusion, hold and wait, no preemption, and circular wait.{' '}
          <mark>Thread A locks file1 and asks for file2 while thread B locks file2 and asks for file1.</mark>
        </p>
      </div>

      <div className="x-rubric-eyebrow">RUBRIC · {rubric.filter(r => r.met).length} of {rubric.length} criteria met · click rows to inspect</div>
      <div className="x-rubric-list">
        {rubric.map((row, i) => {
          const animatedDone = !running || doneSteps > i;
          return (
            <div
              key={row.label}
              className={`x-rubric-row ${activeIdx === i ? 'is-active' : ''} ${row.met ? 'is-met' : 'is-partial'} ${animatedDone ? 'is-done' : 'is-pending'}`}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            >
              <div className="x-rubric-row-head">
                <span className="x-rubric-tick">
                  {animatedDone
                    ? (row.met ? <Icon name="check" size={12} /> : <Icon name="alert" size={12} />)
                    : <span className="x-rubric-spin" />}
                </span>
                <span className="x-rubric-label">{row.label}</span>
                <span className="x-rubric-score">{row.scored} / {row.max}</span>
                <button
                  className="x-rubric-btn"
                  onClick={(e) => { e.stopPropagation(); adjust(i, -1); }}
                  aria-label="decrease"
                  disabled={row.scored === 0}
                >−</button>
                <button
                  className="x-rubric-btn"
                  onClick={(e) => { e.stopPropagation(); adjust(i, 1); }}
                  aria-label="increase"
                  disabled={row.scored === row.max}
                >+</button>
              </div>
              {activeIdx === i && (
                <div className="x-rubric-note">
                  <strong>AI rationale:</strong> {row.note}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="x-rubric-foot">
        <div className="x-rubric-bar"><div className="x-rubric-fill" style={{ width: `${pct}%` }} /></div>
        <div className="x-rubric-total">
          <span>Final score</span>
          <strong>{total} / {max}</strong>
        </div>
      </div>
    </div>
  );
}

/* ============== CodeRunner — replayable test execution ============== */
export function CodeRunner({ accent }) {
  const [step, setStep] = useState(5);
  const [running, setRunning] = useState(false);
  const tests = [
    { id: 'TC-01', s: 'pass', ms: '12ms', p: '2.0 / 2.0' },
    { id: 'TC-02', s: 'pass', ms: '8ms', p: '2.0 / 2.0' },
    { id: 'TC-03', s: 'pass', ms: '15ms', p: '2.0 / 2.0' },
    { id: 'TC-04', s: 'fail', ms: '9ms', p: '0.0 / 2.0', msg: 'expected [1,2,3], got [1,3,2]' },
    { id: 'TC-05', s: 'pass', ms: '11ms', p: '2.0 / 2.0' },
  ];

  const run = () => {
    if (running) return;
    setRunning(true);
    setStep(0);
    let i = 0;
    const tick = () => {
      i++;
      setStep(i);
      if (i < tests.length) setTimeout(tick, 550);
      else setRunning(false);
    };
    setTimeout(tick, 400);
  };

  return (
    <div className="x-runner" style={accent ? { '--x-accent': accent } : undefined}>
      <div className="x-runner-bar">
        <span className="x-runner-lang">PYTHON 3.11</span>
        <span className="x-runner-meta">CS301 · BST Validation</span>
        <button className="x-runner-btn" onClick={run} disabled={running}>
          <Icon name={running ? 'clock' : 'bolt'} size={13} />
          {running ? 'Running…' : 'Run tests'}
        </button>
      </div>
      <div className="x-runner-body">
        {tests.map((t, i) => {
          const done = i < step;
          return (
            <div key={t.id} className={`x-runner-row ${done ? 'is-done' : 'is-pending'} x-runner-${t.s}`}>
              <span className="x-runner-icon">
                {done
                  ? <Icon name={t.s === 'pass' ? 'check' : 'alert'} size={12} />
                  : <span className="x-runner-spin" />}
              </span>
              <span className="x-runner-id">{t.id}</span>
              <span className="x-runner-ms">{done ? t.ms : '—'}</span>
              <span className="x-runner-pts">{done ? t.p : ''}</span>
            </div>
          );
        })}
        <div className="x-runner-total">
          <span>Final score</span>
          <strong>{step >= 5 ? '8.0' : '—'} / 10.0</strong>
        </div>
        <div className="x-runner-bar-track">
          <div className="x-runner-bar-fill" style={{ width: `${(step / 5) * 80}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ============== Testimonial ============== */
export function Testimonial({ quote, who, role, institution, className = '' }) {
  return (
    <figure className={`x-quote ${className}`}>
      <blockquote className="x-quote-text">
        <span className="x-quote-mark">"</span>
        {quote}
      </blockquote>
      <figcaption className="x-quote-cite">
        <strong>{who}</strong>
        {role && <span> — {role}</span>}
        {institution && <span> · {institution}</span>}
      </figcaption>
    </figure>
  );
}

/* ============== ContactCard ============== */
export function ContactCard({ className = '' }) {
  return (
    <div className={`x-contact ${className}`}>
      <div className="x-contact-row">
        <span className="x-contact-icon"><Icon name="bookOpen" size={16} /></span>
        <div>
          <div className="x-contact-key">Email</div>
          <a href="mailto:info@evolveus.in" className="x-contact-val">info@evolveus.in</a>
        </div>
      </div>
      <div className="x-contact-row">
        <span className="x-contact-icon"><Icon name="rss" size={16} /></span>
        <div>
          <div className="x-contact-key">Phone</div>
          <a href="tel:+919791470801" className="x-contact-val">+91 97914 70801</a>
          <span className="x-contact-sep"> · </span>
          <a href="tel:+919344769532" className="x-contact-val">+91 93447 69532</a>
        </div>
      </div>
      <div className="x-contact-row">
        <span className="x-contact-icon"><Icon name="globe" size={16} /></span>
        <div>
          <div className="x-contact-key">Web</div>
          <a href="https://evolveus.in" className="x-contact-val">evolveus.in</a>
        </div>
      </div>
    </div>
  );
}

/* ============== BeforeAfter — toggleable comparison ============== */
export function BeforeAfter({ rows, className = '' }) {
  const [side, setSide] = useState('after');
  return (
    <div className={`x-ba ${className}`}>
      <div className="x-ba-toggle" role="tablist">
        <button
          className={`x-ba-btn ${side === 'before' ? 'is-active' : ''}`}
          onClick={() => setSide('before')}
          role="tab"
          aria-selected={side === 'before'}
        >Without Evolveus</button>
        <button
          className={`x-ba-btn ${side === 'after' ? 'is-active' : ''}`}
          onClick={() => setSide('after')}
          role="tab"
          aria-selected={side === 'after'}
        >With Evolveus</button>
        <span className={`x-ba-slider ${side === 'after' ? 'is-right' : ''}`} />
      </div>
      <div className="x-ba-rows">
        {rows.map((r, i) => (
          <div key={i} className="x-ba-row">
            <div className="x-ba-metric">{r.metric}</div>
            <div className={`x-ba-value ${side === 'before' ? 'is-before' : 'is-after'}`}>
              <span className="x-ba-side-label">{side === 'before' ? 'Then' : 'Now'}</span>
              <span className="x-ba-side-value">{side === 'before' ? r.before : r.after}</span>
            </div>
            <div className="x-ba-note">{r.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
