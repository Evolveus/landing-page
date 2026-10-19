import { useEffect, useState } from 'react';
import { Rv } from './chrome';
import { Icon } from '../_shared/Icon';
import { TRUST, BRAND_LOGO } from '../content';
import './home-features.css';
import NetworkTexture from './NetworkTexture';

function CodePreview() {
  return <div className="hf-code">
    <div className="hf-window"><span><i /> programming.py</span><span>Python 3 ▾</span></div>
    <pre><code><span className="hf-comment"># A little logic. A lot of possibility.</span>{'\n'}<span className="hf-keyword">def</span> find_pair(nums, target):{'\n'}{'    seen = {}\n    '}<span className="hf-keyword">for</span> i, num <span className="hf-keyword">in</span> enumerate(nums):{'\n        '}<span className="hf-keyword">if</span> target - num <span className="hf-keyword">in</span> seen:{'\n            '}<span className="hf-keyword">return</span> [seen[target - num], i]{'\n        seen[num] = i'}</code></pre>
    <div className="hf-tests"><span>✓ Test case 01</span><span>✓ Test case 02</span><b>All tests passed</b></div>
  </div>;
}

const GRAPH_TOPICS = [
  { name: 'Data structures', x: 50, y: 49, detail: 'Explore the concepts, assessment questions, and outcomes connected to data structures.' },
  { name: 'Arrays', x: 19, y: 27, detail: 'Indexing, traversal, searching, and sorting connect foundational concepts to coding questions.' },
  { name: 'Trees', x: 79, y: 26, detail: 'Binary trees, traversal, and balanced structures connect to hierarchical problem solving.' },
  { name: 'Problem solving', x: 19, y: 73, detail: 'Follow the connections between reasoning, decomposition, and applied assessment tasks.' },
  { name: 'Learning outcomes', x: 50, y: 86, detail: 'Trace assessment questions back to the understanding and skills they are designed to measure.' },
  { name: 'Graphs', x: 81, y: 72, detail: 'Explore how paths, connectivity, and traversal relate to real-world applications.' },
  { name: 'Algorithms', x: 49, y: 13, detail: 'Complexity, recursion, and algorithm design link the topic clusters together.' },
];

// Deterministic concept clusters keep the diagram stable across renders.
const GRAPH_CONCEPTS = GRAPH_TOPICS.flatMap((topic, cluster) => Array.from({ length: 36 }, (_, n) => {
  const angle = n * 2.3999632297 + cluster * .47;
  const radius = 3 + Math.sqrt(n + 1) * 2.6;
  return { cluster, x: topic.x + Math.cos(angle) * radius, y: topic.y + Math.sin(angle) * radius * 1.05, size: n % 9 === 0 ? 3 : n % 3 === 0 ? 2 : 1.3 };
}));
const GRAPH_BRIDGES = [[1, 6], [6, 2], [1, 3], [2, 5], [3, 4], [4, 5], [1, 5], [2, 4], [3, 6], [5, 6]];

function KnowledgeGraph() {
  const [selected, setSelected] = useState(0);
  return <div className="hf-knowledge-graph hf-dense-graph">
    <div className="hf-graph-map" aria-label="Explore a sample knowledge graph with interconnected topic and concept clusters">
      <svg viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true">
        <g className="hf-graph-bridges">{GRAPH_BRIDGES.map(([a, b]) => <line key={`${a}-${b}`} x1={GRAPH_TOPICS[a].x * 8} y1={GRAPH_TOPICS[a].y * 4} x2={GRAPH_TOPICS[b].x * 8} y2={GRAPH_TOPICS[b].y * 4} className={selected === a || selected === b ? 'is-selected' : ''} />)}</g>
        {GRAPH_TOPICS.slice(1).map((topic, i) => <line className={selected === 0 || selected === i + 1 ? 'is-selected' : ''} key={topic.name} x1="400" y1="196" x2={topic.x * 8} y2={topic.y * 4} />)}
        {GRAPH_CONCEPTS.map((node, i) => {
          const hub = GRAPH_TOPICS[node.cluster];
          const next = GRAPH_CONCEPTS[node.cluster * 36 + (i + 1) % 36];
          const cross = GRAPH_CONCEPTS[(i * 17 + 43) % GRAPH_CONCEPTS.length];
          const neighbor = GRAPH_CONCEPTS[node.cluster * 36 + (i + 7) % 36];
          return <g key={i} className={`hf-concept ${selected === node.cluster ? 'is-active' : ''}`}><line x1={hub.x * 8} y1={hub.y * 4} x2={node.x * 8} y2={node.y * 4} /><line x1={node.x * 8} y1={node.y * 4} x2={next.x * 8} y2={next.y * 4} /><line className="hf-dense-crosslink" x1={node.x * 8} y1={node.y * 4} x2={cross.x * 8} y2={cross.y * 4} /><line x1={node.x * 8} y1={node.y * 4} x2={neighbor.x * 8} y2={neighbor.y * 4} /><circle cx={node.x * 8} cy={node.y * 4} r={node.size} /></g>;
        })}
        {GRAPH_TOPICS.map((topic, i) => <ellipse className={`hf-cluster-halo ${selected === i ? 'is-active' : ''}`} key={topic.name} cx={topic.x * 8} cy={topic.y * 4} rx="74" ry="38" />)}
      </svg>
      {GRAPH_TOPICS.map((topic, i) => <button key={topic.name} type="button" style={{ left: `${topic.x}%`, top: `${topic.y}%` }} className={`hf-graph-node ${selected === i ? 'is-selected' : ''}`} aria-pressed={selected === i} onClick={() => setSelected(i)}><i />{topic.name}</button>)}
    </div>
    <div className="hf-graph-detail" aria-live="polite"><b>{GRAPH_TOPICS[selected].name}</b><p>{GRAPH_TOPICS[selected].detail}</p></div>
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
    case 7: return <svg className="hp-orbit-graph" viewBox="0 0 220 120" fill="none" aria-hidden="true"><path d="m110 60-65-35m65 35 65-35m-65 35-65 35m65-35 65 35M45 25v70m130-70v70" /><circle cx="110" cy="60" r="15" /><circle cx="45" cy="25" r="7" /><circle cx="175" cy="25" r="7" /><circle cx="45" cy="95" r="7" /><circle cx="175" cy="95" r="7" /></svg>;
    case 8: return <div className="hp-bank-stack">{['Data structures', 'Operating systems', 'Database systems'].map((v) => <span key={v}><i>▤</i>{v}<b>↗</b></span>)}</div>;
    case 9: return <div className="hp-notes-flow"><span>▤ Course notes</span><i>↓</i><span>✦ Draft questions</span></div>;
    case 10: return <div className="hp-outcome-grid">{['Understand', 'Apply', 'Analyze'].map((v, i) => <span key={v}><b>CO {i + 1}</b>{v}<i>✓</i></span>)}</div>;
    default: return <div className="hp-review-flow"><span>Answer evaluated <b>✓</b></span><span>Faculty reviewed <b>✓</b></span><span>Ready to publish <b>↗</b></span></div>;
  }
}

function OrbitPanel({ slot, active, leaving }) {
  const position = ['languages', 'evaluation', 'assistant', 'graph'].indexOf(slot);
  const offset = ((position - active % 4 + 4) % 4) * 3;
  const index = (active + offset) % ORBIT_LABELS.length;
  return <div className={`hp-orbit-carrier hp-orbit-carrier--${slot}`}><div className="hp-orbit-revolution"><div className="hp-orbit-seat"><div className="hp-orbit-upright"><div className={`hp-satellite hp-satellite--${slot} ${offset === 0 ? 'is-spotlit' : ''} ${leaving ? 'is-changing' : ''}`}>
    <div className="hp-orbit-content" key={index}>
      <div className="hp-small-label"><span>{ORBIT_ICONS[index]}</span>{ORBIT_LABELS[index]}<i className="hp-panel-beacon" /></div>
      <div className="hp-orbit-visual" aria-hidden="true"><OrbitVisual index={index} /></div>
      <div className="hp-satellite-bottom"><i />{index === active ? 'In the spotlight' : 'Part of your assessment toolkit'}</div>
    </div>
  </div></div></div></div></div>;
}

function FeatureCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [hidden, setHidden] = useState(() => document.hidden);
  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);
  const [leaving, setLeaving] = useState(false);
  const labels = ORBIT_LABELS;
  const order = [2, 0, 1, 3, 4, 5, 6];
  const feature = active < 7 ? FEATURES[order[active]] : active > 7 ? HERO_EXTRAS[active - 8] : null;
  useEffect(() => {
    if (paused || !motionEnabled || hidden) return;
    let transition;
    const timer = window.setInterval(() => {
      setLeaving(true);
      transition = window.setTimeout(() => {
        setActive((i) => (i + 1) % ORBIT_LABELS.length);
        setLeaving(false);
      }, 380);
    }, 11000);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(transition);
    };
  }, [paused, motionEnabled, hidden]);
  return <section className="hp-showcase" data-motion={motionEnabled ? 'on' : 'off'} data-held={paused || !motionEnabled || hidden} data-feature={active} data-phase={leaving ? 'leaving' : 'showing'} aria-label="Explore Evolveus features" aria-roledescription="carousel" onFocusCapture={(event) => { if (!event.target.closest('.hp-motion-control')) { setPaused(true); setLeaving(false); } }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setPaused(false); setLeaving(false); } }}>

    <button type="button" className="hp-motion-control" aria-pressed={motionEnabled} onClick={() => setMotionEnabled((enabled) => !enabled)}>{motionEnabled ? 'Pause animation' : 'Play animation'}</button>
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
      <OrbitPanel slot="languages" active={active} leaving={leaving} />
      <OrbitPanel slot="evaluation" active={active} leaving={leaving} />
      <div className="hp-center-shell"><div className="hp-center-card">
        <div className="hp-card-top"><span className="hp-brand-logo"><img className="rg-on-light" src={BRAND_LOGO.mark} alt="" /><img className="rg-on-dark" src={BRAND_LOGO.markDark} alt="" /></span><span>Evolveus <small>Assessment studio</small></span></div>
        <div className={`hp-slide ${leaving ? 'is-leaving' : ''}`} key={active} role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${labels.length}: ${labels[active]}`}>
          <div className="hp-slide-heading"><span>{labels[active]}</span><span>{String(active + 1).padStart(2, '0')} / {labels.length}</span></div>
          <h2>{feature?.title || 'Connect the dots in learning.'}</h2>
          <div className={`hp-slide-visual hf-carousel-visual--${feature?.id || 'graph'}`}>
            {active === 7 ? <KnowledgeGraph /> : feature.id === 'coding' ? <div className="hf-language-cloud"><span className="hf-language-symbol">{'{ }'}</span><p>One assessment.<br /><b>Many languages.</b></p><div>{['Python', 'Java', 'C++', 'JavaScript', 'C', '…and more'].map((l) => <span key={l}>{l}</span>)}</div></div> : <div aria-hidden="true">{feature.visual}</div>}
          </div>
        </div>
        <div className="hp-card-bottom"><span>Illustrative feature preview</span><span className="hp-auto-indicator"><i /> Auto preview</span></div>
      </div></div>
      <OrbitPanel slot="assistant" active={active} leaving={leaving} />
      <OrbitPanel slot="graph" active={active} leaving={leaving} />
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
    <Rv className="hf-knowledge-section" id="knowledge-graph"><div><p className="hf-eyebrow">A connected view</p><h3>Knowledge doesn’t<br /><em>live in isolation.</em></h3><p>Explore how topics relate to questions and learning outcomes. Select a node in this sample knowledge graph to see the connections.</p><span className="hf-graph-caption">Interactive concept illustration</span></div><KnowledgeGraph /></Rv>
    <Rv className="hf-features-foot"><span>The whole assessment workflow, connected.</span><a className="hf-text-link" href="/product">Take a closer look <Icon name="arrowRight" size={15} /></a></Rv>
  </div></section>;
}
