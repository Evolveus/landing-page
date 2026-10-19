import { useEffect, useState } from 'react';
import { Rv } from './chrome';
import { Icon } from '../_shared/Icon';
import { TRUST, BRAND_LOGO } from '../content';
import './home-features.css';
import NetworkTexture from './NetworkTexture';
import { organicNetwork } from './organicNetwork';

function CodePreview() {
  return <div className="hf-code">
    <div className="hf-window"><span><i /> programming.py</span><span>Python 3 ▾</span></div>
    <pre><code><span className="hf-comment"># A little logic. A lot of possibility.</span>{'\n'}<span className="hf-keyword">def</span> find_pair(nums, target):{'\n'}{'    seen = {}\n    '}<span className="hf-keyword">for</span> i, num <span className="hf-keyword">in</span> enumerate(nums):{'\n        '}<span className="hf-keyword">if</span> target - num <span className="hf-keyword">in</span> seen:{'\n            '}<span className="hf-keyword">return</span> [seen[target - num], i]{'\n        seen[num] = i'}</code></pre>
    <div className="hf-tests"><span>✓ Test case 01</span><span>✓ Test case 02</span><b>All tests passed</b></div>
  </div>;
}

// Sample units from different fields: topics link to the questions that test them and the outcomes they serve.
const t = (name, detail, ...stats) => ({ name, detail, stats });
const GRAPHS = [
  { field: 'Computer science', unit: 'Recursion', topics: [
    t('Recursion', 'The hub of this unit. 14 questions test it, and it underpins trees, sorting, and dynamic programming.', '14 questions', 'CO2 · Apply', '58% mastery'),
    t('Base cases', 'Missing or unreachable base cases cause 41% of failed test runs in this unit.', '6 questions', 'CO1 · Understand', 'Common misconception'),
    t('Tree traversal', 'Students who master recursion score 23% higher on traversal questions.', '9 questions', 'CO3 · Analyze', '64% mastery'),
    t('Call stack', 'Canvas questions let students draw the stack as it grows and unwinds.', '4 canvas questions', 'CO1 · Understand', '71% mastery'),
    t('Memoization', 'Conversational questions ask students to explain why caching helps.', '5 questions', 'CO4 · Evaluate', '39% mastery'),
    t('Merge sort', 'Coding questions run against hidden test cases in four languages.', '7 coding questions', 'CO3 · Apply', '62% mastery'),
    t('Divide & conquer', 'The pattern linking recursion to sorting and searching. A good topic to reteach.', '8 questions', 'CO3 · Analyze', 'Suggested focus'),
  ] },
  { field: 'Biology', unit: 'Cellular respiration', topics: [
    t('Cellular respiration', 'How cells turn glucose into usable energy, connecting every topic in this unit.', '12 questions', 'CO2 · Explain', '61% mastery'),
    t('Glycolysis', 'The first step, in the cytoplasm. Diagram questions ask students to label each stage.', '5 questions', 'CO1 · Recall', '78% mastery'),
    t('Krebs cycle', 'Students often confuse its inputs and outputs with glycolysis.', '6 questions', 'CO2 · Explain', 'Common misconception'),
    t('Mitochondria', 'Structure meets function: canvas questions let students sketch the membranes.', '4 canvas questions', 'CO1 · Describe', '74% mastery'),
    t('ATP yield', 'Calculation questions check reasoning, not just the final number.', '5 questions', 'CO3 · Apply', '47% mastery'),
    t('Fermentation', 'Compare aerobic and anaerobic pathways in a descriptive answer.', '3 written questions', 'CO4 · Compare', 'Suggested focus'),
    t('Electron transport', 'Where most ATP is made. Linked to the hardest questions in the unit.', '7 questions', 'CO3 · Analyze', '42% mastery'),
  ] },
  { field: 'Economics', unit: 'Market equilibrium', topics: [
    t('Equilibrium', 'Where supply meets demand. Every other topic in this unit shifts it.', '11 questions', 'CO2 · Apply', '66% mastery'),
    t('Demand curves', 'Graph questions ask students to draw how the curve moves, not just name it.', '6 canvas questions', 'CO1 · Understand', '72% mastery'),
    t('Elasticity', 'Students mix up price elasticity with slope on 1 in 3 answers.', '7 questions', 'CO3 · Analyze', 'Common misconception'),
    t('Price controls', 'Descriptive answers explain who gains and loses from a ceiling or floor.', '4 written questions', 'CO4 · Evaluate', '51% mastery'),
    t('Taxes & subsidies', 'Calculation questions trace the burden on buyers and sellers.', '5 questions', 'CO3 · Apply', '44% mastery'),
    t('Surplus', 'Linked to welfare analysis questions later in the course.', '5 questions', 'CO3 · Analyze', '58% mastery'),
    t('Supply shifts', 'Conversational questions walk through a real market shock step by step.', '6 questions', 'CO2 · Explain', 'Suggested focus'),
  ] },
  { field: 'Physics', unit: "Newton's laws", topics: [
    t("Newton's laws", 'The core of mechanics. Most questions in later units build on these three laws.', '15 questions', 'CO2 · Apply', '63% mastery'),
    t('Inertia', 'Students still expect motion to need a force on 38% of concept questions.', '4 questions', 'CO1 · Understand', 'Common misconception'),
    t('Free-body diagrams', 'Canvas questions let students draw every force before solving.', '6 canvas questions', 'CO2 · Represent', '69% mastery'),
    t('Friction', 'Static versus kinetic friction, tested with real-world scenarios.', '5 questions', 'CO3 · Apply', '57% mastery'),
    t('Momentum', 'Collision problems connect force and time to change in motion.', '6 questions', 'CO3 · Analyze', '49% mastery'),
    t('Circular motion', 'Where students most often invent a centrifugal force.', '5 questions', 'CO4 · Analyze', 'Suggested focus'),
    t('Action & reaction', 'Paired-force questions ask students to name both objects involved.', '4 questions', 'CO1 · Understand', '75% mastery'),
  ] },
];
// Each field gets its own arrangement so labels glide to new places on change.
const GRAPH_LAYOUTS = [
  [[39, 45], [14, 22], [76, 19], [22, 78], [62, 83], [86, 59], [53, 23]],
  [[55, 50], [18, 30], [82, 24], [14, 70], [40, 82], [80, 76], [42, 18]],
  [[45, 40], [80, 20], [16, 45], [70, 78], [30, 80], [88, 52], [22, 15]],
  [[50, 52], [24, 20], [16, 62], [78, 30], [84, 70], [46, 85], [60, 16]],
];
const GRAPH_BRIDGES = [[0, 1], [0, 6], [0, 3], [6, 2], [2, 5], [3, 4], [4, 5], [0, 5]];
const GRAPH_SETS = GRAPHS.map((graph, g) => {
  const topics = graph.topics.map((topic, i) => ({ ...topic, x: GRAPH_LAYOUTS[g][i][0], y: GRAPH_LAYOUTS[g][i][1] }));
  return { ...graph, topics, cloud: organicNetwork(topics.map((topic, i) => ({ ...topic, count: [58, 24, 38, 28, 22, 40, 32][i], width: [16, 11, 14, 13, 12, 12, 13][i], height: [20, 15, 13, 14, 12, 18, 12][i] })), 19 + g * 7) };
});

function curve(a, b, bend) {
  const x1 = a.x * 8, y1 = a.y * 4, x2 = b.x * 8, y2 = b.y * 4;
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend * .5;
  return `M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}`;
}

function GraphLayer({ graph, selected, outgoing }) {
  const { topics, cloud } = graph;
  return <svg className={`hf-graph-layer ${outgoing ? 'is-outgoing' : ''}`} viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true">
    <g className="hf-graph-bridges">{GRAPH_BRIDGES.map(([a, b]) => <path key={`${a}-${b}`} d={curve(topics[a], topics[b], .18)} className={selected === a || selected === b ? 'is-selected' : ''} />)}</g>
    <g className="hf-graph-edges">{cloud.edges.map(({ a, b }, i) => <path key={i} className={selected === a.cluster && selected === b.cluster ? 'is-selected' : ''} d={curve(a, b, i % 2 ? .22 : -.22)} />)}</g>
    {cloud.nodes.map((node, i) => <path key={i} className={`hf-concept ${selected === node.cluster ? 'is-active' : ''}`} d={`M${node.x * 8} ${node.y * 4}h0`} style={{ strokeWidth: node.size * 2.4, animationDelay: `${(i % 9) * 40}ms` }} />)}
  </svg>;
}

function KnowledgeGraph() {
  const [field, setField] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(false);
  const show = (next) => { setPrevious(field); setField(next); setSelected(0); };
  useEffect(() => {
    if (hovered) return;
    const timer = window.setTimeout(() => show((field + 1) % GRAPH_SETS.length), 2000);
    return () => window.clearTimeout(timer);
  }, [field, hovered]);
  useEffect(() => {
    if (previous === null) return;
    const done = window.setTimeout(() => setPrevious(null), 700);
    return () => window.clearTimeout(done);
  }, [previous, field]);
  const graph = GRAPH_SETS[field];
  const topic = graph.topics[selected];
  return <div className={`hf-knowledge-graph hf-dense-graph ${hovered ? 'is-held' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setHovered(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false); }}>
    <div className="hf-graph-map" aria-label={`Sample knowledge graph: ${graph.field}, ${graph.unit}`}>
      <div className="hf-graph-field" key={`field-${field}`}><span>{graph.field}</span><b>{graph.unit}</b></div>
      {previous !== null && previous !== field && <GraphLayer key={`out-${previous}`} graph={GRAPH_SETS[previous]} selected={-1} outgoing />}
      <GraphLayer key={field} graph={graph} selected={selected} />
      {graph.topics.map((item, i) => <button key={i} type="button" style={{ left: `${item.x}%`, top: `${item.y}%` }} className={`hf-graph-node ${i === 0 ? 'is-hub' : ''} ${selected === i ? 'is-selected' : ''}`} aria-pressed={selected === i} onClick={() => setSelected(i)}><i /><span key={`${field}-${i}`}>{item.name}</span></button>)}
      <div className="hf-graph-dots">{GRAPH_SETS.map((g, i) => <button key={g.field} type="button" aria-label={`Show ${g.field}`} className={i === field ? 'is-active' : ''} onClick={() => i !== field && show(i)} />)}</div>
    </div>
    <div className="hf-graph-detail" aria-live="polite" key={`${field}-${selected}`}><b>{topic.name}</b><p>{topic.detail}</p><div className="hf-graph-stats">{topic.stats.map((stat) => <span key={stat}>{stat}</span>)}</div></div>
  </div>;
}

const ORBIT_LABELS = ['Class analytics', 'Language support', 'Descriptive evaluation', 'Canvas & conversation', 'Chatbot + WebMCP', 'Safe Exam Browser', 'Scale & low latency', 'Knowledge connections', 'Shared question bank', 'Questions from your notes', 'Learning outcomes', 'Faculty review'];
const ORBIT_ICONS = ['▥', '{ }', '✓', '◇', '✳', '▣', '↗', '⌘', '▤', '✦', '◎', '✓'];

function OrbitVisual({ index }) {
  switch (index) {
    case 0: return <div className="hp-orbit-bars">{[35, 65, 50, 85, 72, 95, 80].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>;
    case 1: return <div className="hp-language-tiles"><span>Py</span><span>JS</span><span>C++</span><span>Java</span></div>;
    case 2: return <><div className="hp-answer-lines"><i /><i /><i /></div><span className="hp-review-check">✓ Rubric aligned <span>Feedback with every mark</span></span></>;
    case 3: return <div className="hp-orbit-formats"><span>Sketch an idea <b>⌁</b></span><span>Talk it through <b>···</b></span></div>;
    case 4: return <div className="hp-orbit-chat"><span>Where does my class need help?</span><div className="hp-typing"><i /><i /><i /></div></div>;
    case 5: return <div className="hp-orbit-security"><span>A focused assessment space</span><b>✓ Browser connected</b></div>;
    case 6: return <div className="hp-orbit-scale"><svg viewBox="0 0 220 80" fill="none" aria-hidden="true"><path d="M0 55h35l10-24 12 40 14-58 12 42h34l10-24 12 40 14-58 12 42h55" /></svg><span>More students. Low latency.</span></div>;
    case 7: return <svg className="hp-orbit-graph" viewBox="0 0 220 110" fill="none" aria-hidden="true"><g className="hp-graph-links">{[[110, 55, 42, 26], [110, 55, 180, 22], [110, 55, 46, 88], [110, 55, 176, 86], [42, 26, 46, 88], [180, 22, 176, 86], [110, 55, 112, 12]].map(([x1, y1, x2, y2], i) => <path key={i} d={`M${x1} ${y1}Q${(x1 + x2) / 2 + (i % 2 ? 10 : -10)} ${(y1 + y2) / 2} ${x2} ${y2}`} />)}</g>{[[110, 55, 9], [42, 26, 5], [180, 22, 5], [46, 88, 5], [176, 86, 5], [112, 12, 3.5]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}</svg>;
    case 8: return <div className="hp-bank-stack">{['Data structures', 'Operating systems', 'Database systems'].map((v) => <span key={v}><i>▤</i>{v}<b>↗</b></span>)}</div>;
    case 9: return <div className="hp-notes-flow"><span>▤ Course notes</span><i>↓</i><span>✦ Draft questions</span></div>;
    case 10: return <div className="hp-outcome-grid">{['Understand', 'Apply', 'Analyze'].map((v, i) => <span key={v}><b>CO {i + 1}</b>{v}<i>✓</i></span>)}</div>;
    default: return <div className="hp-review-flow"><span>Answer evaluated <b>✓</b></span><span>Faculty reviewed <b>✓</b></span><span>Ready to publish <b>↗</b></span></div>;
  }
}

const ORBIT_SLOTS = ['languages', 'evaluation', 'assistant', 'graph'];
const orbitIndex = (slot, active) => (active + ((ORBIT_SLOTS.indexOf(slot) - active % 4 + 4) % 4) * 3) % ORBIT_LABELS.length;

function OrbitContent({ index, active, outgoing }) {
  return <div className={`hp-orbit-content ${outgoing ? 'is-outgoing' : ''}`} aria-hidden={outgoing || undefined}>
    <div className="hp-small-label"><span>{ORBIT_ICONS[index]}</span>{ORBIT_LABELS[index]}<i className="hp-panel-beacon" /></div>
    <div className="hp-orbit-visual" aria-hidden="true"><OrbitVisual index={index} /></div>
    <div className="hp-satellite-bottom"><i />{index === active ? 'In the spotlight' : 'Part of your assessment toolkit'}</div>
  </div>;
}

function OrbitPanel({ slot, active, previous }) {
  const index = orbitIndex(slot, active);
  const before = previous === null ? null : orbitIndex(slot, previous);
  return <div className={`hp-orbit-carrier hp-orbit-carrier--${slot}`}><div className="hp-orbit-revolution"><div className="hp-orbit-seat"><div className="hp-orbit-upright"><div className={`hp-satellite hp-satellite--${slot} ${index === active ? 'is-spotlit' : ''}`}>
    <div className="hp-crossfade">
      {before !== null && before !== index && <OrbitContent key={`out-${before}`} index={before} active={previous} outgoing />}
      <OrbitContent key={index} index={index} active={active} />
    </div>
  </div></div></div></div></div>;
}

function FeatureSlide({ index, outgoing }) {
  const feature = index < 7 ? FEATURES[SLIDE_ORDER[index]] : index > 7 ? HERO_EXTRAS[index - 8] : null;
  return <div className={`hp-slide ${outgoing ? 'is-outgoing' : ''}`} role="group" aria-roledescription="slide" aria-hidden={outgoing || undefined} aria-label={`${index + 1} of ${ORBIT_LABELS.length}: ${ORBIT_LABELS[index]}`}>
    <div className="hp-slide-heading"><span>{ORBIT_LABELS[index]}</span><span>{String(index + 1).padStart(2, '0')} / {ORBIT_LABELS.length}</span></div>
    <h2>{feature?.title || 'Connect the dots in learning.'}</h2>
    <div className={`hp-slide-visual hf-carousel-visual--${feature?.id || 'graph'}`}>
      {index === 7 ? <KnowledgeGraph /> : feature.id === 'coding' ? <div className="hf-language-cloud"><span className="hf-language-symbol">{'{ }'}</span><p>One assessment.<br /><b>Many languages.</b></p><div>{['Python', 'Java', 'C++', 'JavaScript', 'C', '…and more'].map((l) => <span key={l}>{l}</span>)}</div></div> : <div aria-hidden="true">{feature.visual}</div>}
    </div>
  </div>;
}

const SLIDE_ORDER = [2, 0, 1, 3, 4, 5, 6];

function FeatureCarousel() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);
  useEffect(() => {
    if (paused || hidden) return;
    const timer = window.setInterval(() => setActive((i) => { setPrevious(i); return (i + 1) % ORBIT_LABELS.length; }), 11000);
    return () => window.clearInterval(timer);
  }, [paused, hidden]);
  // Outgoing slide stays mounted underneath while the next one fades in, so the card never goes blank.
  useEffect(() => {
    if (previous === null) return;
    const done = window.setTimeout(() => setPrevious(null), 800);
    return () => window.clearTimeout(done);
  }, [previous, active]);
  return <section className="hp-showcase" data-motion="on" data-held={paused || hidden} data-feature={active} aria-label="Explore Evolveus features" aria-roledescription="carousel" onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>

    <div className="hp-stage">
      <div className="hp-studio-halo" aria-hidden="true" />
      <div className="hp-studio-track hp-studio-track--one" aria-hidden="true"><i /></div>
      <div className="hp-studio-track hp-studio-track--two" aria-hidden="true"><i /></div>
      <div className="hp-studio-track hp-studio-track--three" aria-hidden="true"><i /></div>
      <div className="hp-orbit hp-orbit--one" aria-hidden="true" /><div className="hp-orbit hp-orbit--two" aria-hidden="true" />
      <svg className="hp-connections" viewBox="0 0 1100 440" fill="none" aria-hidden="true">{[
        { d: 'M210 140C350 140 300 210 430 210', on: active % 4 === 0 },
        { d: 'M220 330C350 330 320 260 430 260', on: active % 4 === 1 },
        { d: 'M690 190C810 190 750 100 900 100', on: active % 4 === 2 },
        { d: 'M690 270C800 270 780 330 900 330', on: active % 4 === 3 },
      ].map((wire, i) => <g key={i} className={wire.on ? 'is-energized' : ''}><path d={wire.d} /><circle r="3"><animateMotion dur="3s" repeatCount="indefinite" path={wire.d} /></circle></g>)}</svg>
      <OrbitPanel slot="languages" active={active} previous={previous} />
      <OrbitPanel slot="evaluation" active={active} previous={previous} />
      <div className="hp-center-shell"><div className="hp-center-card">
        <div className="hp-card-top"><span className="hp-brand-logo"><img className="rg-on-light" src={BRAND_LOGO.mark} alt="" /><img className="rg-on-dark" src={BRAND_LOGO.markDark} alt="" /></span><span>Evolveus <small>Assessment studio</small></span></div>
        <div className="hp-crossfade hp-slide-stack">
          {previous !== null && previous !== active && <FeatureSlide key={`out-${previous}`} index={previous} outgoing />}
          <FeatureSlide key={active} index={active} />
        </div>
        <div className="hp-card-bottom"><span>Illustrative feature preview</span><span className="hp-auto-indicator"><i /> Auto preview</span></div>
      </div></div>
      <OrbitPanel slot="assistant" active={active} previous={previous} />
      <OrbitPanel slot="graph" active={active} previous={previous} />
    </div>

  </section>;

}

export function AssessmentHero() {
  return <header className="hp-hero" id="top"><NetworkTexture variant="hero" /><div className="rg-wrap">
    <div className="hp-hero-heading">
      <Rv as="h1" delay={60}><span>More ways to ask.</span><span className="hp-headline-accent">Deeper ways to understand.</span></Rv>
      <Rv className="hp-actions" delay={160}><a className="hp-primary-cta" href="#contact">Book a walkthrough <span><Icon name="arrowRight" size={17} /></span></a><a className="hp-secondary-cta" href="#features">Explore the platform <Icon name="arrowDown" size={14} /></a></Rv>
    </div>
    <Rv className="hp-showcase-reveal" delay={240}><FeatureCarousel /></Rv>
    <Rv className="hp-trust" delay={300}><span>Built for ambitious classrooms.</span><span className="hp-trust-divider" /><span>In use at</span><img src={TRUST.logo} alt={TRUST.org} /></Rv>
  </div></header>;
}

const FEATURES = [
  { id: 'coding', n: '01', title: 'Code in their language.', body: 'Set coding questions across a wide range of programming languages. Run answers against test cases and see how students solve the problem.', type: 'wide', visual: <><CodePreview /><div className="hf-languages"><span>Python</span><span>C++</span><span>Java</span><span>JavaScript</span><span>+ more languages</span></div></> },
  { id: 'written', n: '02', title: 'Go beyond the right answer.', body: 'Evaluate descriptive responses against your model answer and rubric, with clear remarks and faculty control over the final marks.', type: 'wide', visual: <div className="hf-paper"><div className="hf-paper-head"><span>Descriptive response</span><b>Reviewed ✓</b></div><p>A good explanation connects the concept to its application, showing <mark>why the approach works</mark> as well as how.</p><div className="hf-rubric"><span>Concept clarity <b>✓</b></span><span>Reasoning <b>✓</b></span><span>Application <b>✓</b></span></div><div className="hf-feedback">↳ Feedback grounded in your marking criteria.</div></div> },
  { id: 'analytics', n: '03', title: 'See the learning behind the marks.', body: 'Turn responses into useful analytics. Explore performance, find topic gaps, and decide what to teach next.', visual: <div className="hf-analytics"><div><span>Performance overview</span><span>By topic ↗</span></div><div className="hf-bars">{[42, 65, 51, 83, 60, 94, 76, 88].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div><footer>From individual answers to the whole class</footer></div> },
  { id: 'formats', n: '04', title: 'Make room for different minds.', body: 'Add canvas and conversational question types. Let students sketch an idea or work through it in a conversation.', visual: <div className="hf-formats"><span className="hf-canvas"><svg viewBox="0 0 180 90" fill="none" aria-hidden="true"><rect x="12" y="24" width="52" height="40" rx="5" /><path d="M65 44h44m-8-7 8 7-8 7" /><circle cx="141" cy="44" r="24" /><path d="m30 45 8 8 13-18m81 9 7 7 13-17" /></svg><small>Draw it out</small></span><span className="hf-conversation"><i>Walk me through your approach.</i><i>Let’s start with the first step…</i><small>Talk it through</small></span></div> },
  { id: 'assistant', n: '05', title: 'A conversation away.', body: 'Work with the built-in chatbot and connect through WebMCP to bring assistance into your assessment workflow.', visual: <div className="hf-assistant"><span className="hf-chat-question">Where does my class need help?</span><span className="hf-chat-answer"><b>✳ Evolveus assistant</b>Explore results. Find patterns.<br />Plan your next assessment.</span><div className="hf-command"><span>Ask Evolveus…</span><b>↵</b></div></div> },
  { id: 'seb', n: '06', title: 'Keep the focus on the exam.', body: 'Safe Exam Browser integration helps create a controlled assessment environment, with the tools students need to stay focused.', type: 'compact', visual: <div className="hf-seb"><span className="hf-lock">▣</span><div><b>Safe Exam Browser</b><span><i /> A focused exam environment</span></div><span className="hf-seb-check">✓</span></div> },
  { id: 'scale', n: '07', title: 'Big cohorts. A responsive experience.', body: 'Built for scalability and low latency, so assessments keep moving as more students join.', type: 'compact', visual: <div className="hf-scale"><span className="hf-scale-pulse" aria-hidden="true">{[15, 15, 35, 70, 30, 15, 15, 15, 35, 70, 30, 15, 15, 15, 35, 70, 30, 15].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</span><span>Built to keep up <b>↗</b></span></div> },
];

const HERO_EXTRAS = [
  { id: 'bank', title: 'Good questions deserve another semester.', visual: <OrbitVisual index={8} /> },
  { id: 'notes', title: 'Your course notes. A starting point for questions.', visual: <OrbitVisual index={9} /> },
  { id: 'outcomes', title: 'Connect every question to a learning outcome.', visual: <OrbitVisual index={10} /> },
  { id: 'review', title: 'Your expertise. The final say.', visual: <OrbitVisual index={11} /> },
];

export function AssessmentFeatures() {
  return <section className="hf-features" id="features" aria-labelledby="hf-features-title"><NetworkTexture /><div className="rg-wrap">
    <Rv className="hf-section-heading"><div><p className="hf-eyebrow">The assessment toolkit</p><h2 id="hf-features-title">Every question type.<br /><em>Every step covered.</em></h2></div><p>More than a place to take a test. Everything you need to bring out what your students know.</p></Rv>
    <div className="hf-feature-grid">{FEATURES.map((f, i) => <Rv as="article" key={f.id} className={`hf-feature hf-feature--${f.id} ${f.type ? `hf-feature--${f.type}` : ''}`} delay={i % 3 * 65}><div className="hf-feature-visual" aria-hidden="true">{f.visual}</div><div className="hf-feature-copy"><span className="hf-feature-number">{f.n} /</span><h3>{f.title}</h3><p>{f.body}</p></div></Rv>)}</div>
    <Rv className="hf-knowledge-section" id="knowledge-graph"><div><p className="hf-eyebrow">A connected view</p><h3>Knowledge doesn’t<br /><em>live in isolation.</em></h3><p>Explore how topics relate to questions and learning outcomes. Hover to pause, then select a topic to see its questions, outcomes, and how the class is doing. Sample units from four fields.</p><span className="hf-graph-caption">Interactive concept illustration</span></div><KnowledgeGraph /></Rv>
    <Rv className="hf-features-foot"><span>The whole assessment workflow, connected.</span><a className="hf-text-link" href="/product">Take a closer look <Icon name="arrowRight" size={15} /></a></Rv>
  </div></section>;
}
