import { BRAND, BRAND_LOGO, COMPARE_COLUMNS, COMPARE_ROWS, TRUST, WATCHED } from "../landing/content";
import { DECK, PARTS, slideOfQuestion } from "./content";

/* The deck's slides, in order. Each is drawn on a fixed 1440×810 canvas
   (see deck.css) and takes `dark` for the screenshots and logos that
   come in two versions. Copy is in ./content.js. */

const pad = (n) => String(n).padStart(2, "0");

/* ── Shared pieces ─────────────────────────────────────── */

/* The running head: the brand, and the paper as an answer sheet. One
   bubble per question, grouped into the paper's parts; the ones already
   answered are shaded, so the sheet fills in as the deck goes on. */
function Head({ dark, q, done }) {
  return (
    <header className="dk-head">
      <span className="dk-brand">
        <img src={dark ? BRAND_LOGO.markDark : BRAND_LOGO.mark} alt="" />
        {BRAND.name}
      </span>
      {(q || done) && (
        <ol className="dk-sheetrow" aria-label={done ? "All questions answered" : `Question ${q}`}>
          {PARTS.map((p) => (
            <li key={p.name} className={p.qs.includes(q) ? "on" : ""}>
              <span>{p.name}</span>
              <span className="dk-sheetrow-b">
                {p.qs.map((n) => (
                  <i key={n} className={n === q ? "now" : done || n < q ? "done" : ""} />
                ))}
              </span>
            </li>
          ))}
        </ol>
      )}
    </header>
  );
}

export function Frame({ n, total, dark, q, done, panel, bare, className = "", children }) {
  return (
    <section className={`dk-slide${panel ? " dk-slide--panel" : ""} ${className}`}>
      {!bare && <Head dark={dark || panel} q={q} done={done} />}
      <div className="dk-body">{children}</div>
      <footer className="dk-foot">
        <span>{BRAND.domain}</span>
        <span>{n} / {total}</span>
      </footer>
    </section>
  );
}

/* A question from the room, numbered in the margin as on a paper, with
   who tends to ask it and the short answer straight under it. */
function Ask({ c }) {
  return (
    <header className="dk-ask">
      <span className="dk-ask-n">Q{c.q}</span>
      <div>
        <h2 className="dk-h2">{c.title}</h2>
        <p className="dk-answer-line">{c.answer}</p>
      </div>
      <span className="dk-ask-who">Asked by<b>{c.asks}</b></span>
    </header>
  );
}

/* The deck's one pencil note: a handwritten line with an arrow back to
   what it names. */
function Note({ text, className = "" }) {
  return (
    <span className={`dk-note ${className}`}>
      <svg viewBox="0 0 40 16" aria-hidden="true">
        <path className="dk-pencil" d="M38 9 C 28 10, 16 9, 4 7" />
        <path className="dk-pencil" d="M10 2 L 3 7 L 10 12" />
      </svg>
      {text}
    </span>
  );
}

/* A real screen on the specimen mat (DESIGN.md §5): timing marks down
   the left edge and a registration square, with a plain caption. */
function Mat({ label, children, className = "" }) {
  return (
    <figure className={`dk-mat-fig ${className}`}>
      <div className="dk-mat">
        <div className="dk-mat-body">{children}</div>
      </div>
      <figcaption className="dk-cap">{label}</figcaption>
    </figure>
  );
}

const Sample = () => <span className="dk-cap dk-sample">{DECK.sample}</span>;

/* Title and text rows, numbered in the margin. */
function Rows({ items, className = "" }) {
  return (
    <ol className={`dk-stu-list ${className}`}>
      {items.map((it, i) => (
        <li key={it.title}>
          <span className="dk-n">{pad(i + 1)}</span>
          <h3 className="dk-h3">{it.title}</h3>
          <p>{it.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Cover ─────────────────────────────────────────────── */

/* Answer-sheet bubbles across the whole cover, in groups of four like a
   row of options, faint, and thinning out towards the middle so the
   name sits on clear paper. The shading is fixed, so it is the same at
   every showing. */
const FIELD_COLS = 13;
const FIELD_ROWS = 22;
const FIELD = Array.from({ length: FIELD_ROWS * FIELD_COLS }, (_, i) => {
  const r = Math.floor(i / FIELD_COLS);
  const c = i % FIELD_COLS;
  const dx = (c - (FIELD_COLS - 1) / 2) / (FIELD_COLS / 2);
  const dy = (r - (FIELD_ROWS - 1) / 2) / (FIELD_ROWS / 2);
  // Clear around the name in the middle, and under "In use at" below it.
  const clear = dx * dx + dy * dy < 0.62 || (r >= FIELD_ROWS - 4 && Math.abs(dx) < 0.36);
  return { clear, on: (i * 7 + r * 3) % 9 < 2 ? -1 : (i * 5 + c) % 4 };
});

function Field() {
  return (
    <div className="dk-field" aria-hidden="true">
      {FIELD.map((g, i) => (
        <span key={i} className={g.clear ? "is-clear" : ""}>
          {[0, 1, 2, 3].map((o) => <i key={o} className={o === g.on ? "on" : ""} />)}
        </span>
      ))}
    </div>
  );
}

export function Cover({ dark }) {
  const c = DECK.cover;
  return (
    <div className="dk-cover">
      <Field />
      <div className="dk-cover-main">
        <h1 className="dk-cover-name">
          <img src={dark ? BRAND_LOGO.markDark : BRAND_LOGO.mark} alt="" />
          {BRAND.name}
        </h1>
        <p className="dk-cover-sub">{c.sub}</p>
      </div>
      <div className="dk-org">
        <span>{c.inUse}</span>
        <img className={dark ? "dk-logo-dark" : ""} src={TRUST.logo} alt={TRUST.org} />
      </div>
    </div>
  );
}

/* ── What the office answers for ───────────────────────── */
export function Worries() {
  const w = DECK.worries;
  return (
    <>
      <h2 className="dk-h2">{w.title}</h2>
      <div className="dk-table dk-worries" role="table">
        <div className="dk-tr dk-th" role="row">
          {w.head.map((h) => <span key={h} role="columnheader">{h}</span>)}
        </div>
        {w.rows.map((r) => (
          <div className="dk-tr" role="row" key={r.when}>
            <span className="dk-worry-when" role="cell">{r.when}</span>
            <span role="cell">{r.what}</span>
            <span className="dk-worry-who" role="cell">{r.who}</span>
            <span className="dk-qlinks" role="cell">
              {r.qs.map((n) => (
                <a key={n} href={`#${slideOfQuestion(n)}`} aria-label={`Go to question ${n}`}>{n}</a>
              ))}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Q1 · Papers on time ───────────────────────────────── */
export function Setting() {
  const st = DECK.setting;
  const { pdf } = st;
  return (
    <>
      <Ask c={st} />
      <div className="dk-set">
        <figure className="dk-pdf">
          <div className="dk-card">
            <div className="dk-card-head">
              <span>{pdf.label}</span>
            </div>
            <div className="dk-pdf-file">
              <span className="dk-pdf-icon" aria-hidden="true">PDF</span>
              <span><b>{pdf.file}</b><small>{pdf.size}</small></span>
              <span className="dk-pdf-ask">{pdf.ask}</span>
            </div>
            <ol className="dk-drafts">
              {pdf.drafts.map((d, i) => (
                <li key={d.q}>
                  <span className="dk-draft-n">{pad(i + 1)} · {d.type}</span>
                  <p>{d.q}</p>
                  <span className="dk-acts">
                    {pdf.actions.map((x) => <span key={x}>{x}</span>)}
                  </span>
                </li>
              ))}
            </ol>
            <div className="dk-card-foot">{pdf.more}</div>
          </div>
          <Sample />
        </figure>
        <div className="dk-set-side">
          <Rows items={st.items} className="dk-rows-tight" />
        </div>
      </div>
    </>
  );
}

/* ── Q2 · Every department ─────────────────────────────── */

/* A small drawing of what each kind of answer looks like on screen. */
function TypeSketch({ id }) {
  switch (id) {
    case "objective":
      return (
        <span className="dk-ts-bubs" aria-hidden="true">
          {[1, 3, 0].map((on, r) => (
            <span key={r}>{[0, 1, 2, 3].map((o) => <i key={o} className={o === on ? "on" : ""} />)}</span>
          ))}
        </span>
      );
    case "written":
      return <span className="dk-ts-lines" aria-hidden="true"><i /><i /><i /></span>;
    case "code":
      return <span className="dk-ts-code" aria-hidden="true">{"def solve(n):\n  return n * 2"}</span>;
    case "file":
      return <span className="dk-pdf-icon dk-ts-file" aria-hidden="true">FILE</span>;
    case "canvas":
      return (
        <svg className="dk-ts-canvas" viewBox="0 0 120 56" aria-hidden="true">
          <rect x="46" y="18" width="28" height="20" rx="2" />
          <path d="M60 18V3m-4 5 4-5 4 5M60 38v15m-4-5 4 5 4-5M74 28h26m-5-4 5 4-5 4M46 28H24m5-4-5 4 5 4" />
        </svg>
      );
    default:
      return (
        <span className="dk-ts-chat" aria-hidden="true">
          <i>Walk me through it.</i>
          <i>First, supply falls...</i>
        </span>
      );
  }
}

export function Types() {
  const t = DECK.types;
  return (
    <>
      <Ask c={t} />
      <ul className="dk-types">
        {t.cells.map((c) => (
          <li key={c.id}>
            <div className="dk-ts"><TypeSketch id={c.id} /></div>
            <h3 className="dk-h3">{c.kind}</h3>
            <p>{c.eg}</p>
            <p className="dk-types-how">{c.how}</p>
          </li>
        ))}
      </ul>
      <p className="dk-footline">{t.foot}</p>
    </>
  );
}

/* ── Q3 · Fits the university ──────────────────────────── */
export function Structure({ dark }) {
  const s = DECK.structure;
  return (
    <>
      <Ask c={s} />
      <div className="dk-structure">
        <div>
          <ol className="dk-tree">
            {s.tree.map((x) => <li key={x}>{x}</li>)}
          </ol>
          <p className="dk-tree-note">{s.assign}</p>
          <Mat label={s.shot.label}>
            <img src={dark ? s.shot.srcDark : s.shot.src} alt={s.shot.alt} />
          </Mat>
        </div>
        <div>
          <Rows items={s.roles} className="dk-rows-tight" />
          <p className="dk-footline dk-footline--rule">{s.audit}</p>
        </div>
      </div>
    </>
  );
}

/* ── Q4 · Copying ──────────────────────────────────────── */
export function Security() {
  const s = DECK.security;
  return (
    <>
      <Ask c={s} />
      <div className="dk-during">
        <Rows items={s.locks} className="dk-rows-tight" />
        <div>
          <div className="dk-card dk-watched">
            <div className="dk-card-head"><span>{s.watched}</span></div>
            <ul>
              {WATCHED.map((x) => <li key={x}><span className="dk-flag" />{x}</li>)}
            </ul>
          </div>
          <p className="dk-it-caveat dk-plain">{s.plain}</p>
        </div>
      </div>
    </>
  );
}

/* ── Q5 · A disputed flag ──────────────────────────────── */
export function Replay({ dark }) {
  const r = DECK.replay;
  const { log, shot, track } = r;
  return (
    <>
      <Ask c={r} />
      <figure className="dk-track">
        <div className="dk-card">
          <div className="dk-card-head">
            <span>{track.head}</span>
            <span className="dk-track-at">
              {track.steps[track.now].t} · {track.steps[track.now].l}
            </span>
          </div>
          <div className="dk-track-line">
            <span className="dk-track-done" style={{ width: `${track.steps[track.now].at}%` }} />
            {track.steps.map((s, i) => (
              <span
                key={s.l}
                className={`dk-tick${s.flag ? " dk-tick--flag" : ""}${i % 2 ? " dk-tick--low" : ""}${i === track.now ? " dk-tick--now" : ""}`}
                style={{ left: `${s.at}%` }}
              >
                <i />
                <span><b>{s.t}</b>{s.l}</span>
              </span>
            ))}
          </div>
        </div>
        <figcaption className="dk-track-cap">
          <span>{track.plain}</span>
          <span className="dk-cap">{DECK.sample}</span>
        </figcaption>
      </figure>
      <div className="dk-replay-low">
        <div className="dk-card dk-log">
          <div className="dk-card-head"><span>{log.label}</span></div>
          <table>
            <tbody>
              {log.rows.map((x) => (
                <tr key={x.t}>
                  <td className="dk-time">{x.t}</td>
                  <td>{x.who}</td>
                  <td><span className="dk-flag" />{x.kind}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dk-card-foot">{log.foot}</div>
        </div>
        <Mat label={shot.label} className="dk-replay-shot">
          <div className="dk-crop dk-crop--attempt">
            <img src={dark ? shot.srcDark : shot.src} alt={shot.alt} />
          </div>
        </Mat>
      </div>
    </>
  );
}

/* ── Q6 · When something goes wrong ────────────────────── */
export function Failure() {
  const f = DECK.failure;
  return (
    <>
      <Ask c={f} />
      <div className="dk-failure">
        <div className="dk-table dk-ifthen" role="table">
          <div className="dk-tr dk-th" role="row">
            {f.head.map((h) => <span key={h} role="columnheader">{h}</span>)}
          </div>
          {f.rows.map((r) => (
            <div className="dk-tr" role="row" key={r.if}>
              <span className="dk-if" role="cell">{r.if}</span>
              <span role="cell">{r.then}</span>
            </div>
          ))}
        </div>
        <aside className="dk-one">
          <b className="dk-big">{f.load.n}</b>
          <p className="dk-big-l">{f.load.l}</p>
          <p>{f.load.body}</p>
        </aside>
      </div>
    </>
  );
}

/* ── Q7 · How soon ─────────────────────────────────────── */
export function Speed() {
  const p = DECK.speed;
  const s = p.sheet;
  const longest = Math.max(...p.bars.rows.map((r) => r.min));
  return (
    <>
      <Ask c={p} />
      <div className="dk-paper">
        <div>
          {/* Drawn to scale, so the short bar is as short as it should be. */}
          <div className="dk-hours">
            <span className="dk-hours-l">{p.bars.label}</span>
            {p.bars.rows.map((r) => (
              <div className="dk-hours-row" key={r.who}>
                <span>{r.who}</span>
                <span className="dk-hours-bar"><i style={{ width: `${(r.min / longest) * 100}%` }} /></span>
                <b>{r.t}</b>
              </div>
            ))}
          </div>
          <ol className="dk-parts">
            {p.parts.map((x) => (
              <li key={x.part}>
                <span className="dk-part">{x.part}</span>
                <h3 className="dk-h3">{x.kind}</h3>
                <p>{x.how}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* One student's paper, drawn as a marked answer sheet. */}
        <figure className="dk-sheet">
          <div className="dk-card">
            <div className="dk-card-head">
              <span>{s.head}</span>
              <Sample />
            </div>
            <div className="dk-sheet-part">
              <div className="dk-sheet-row">
                <span>Part A · {s.a.q}</span>
                <b className="dk-mk">{s.a.marks}</b>
              </div>
              <div className="dk-grid" aria-hidden="true">
                {s.a.key.map((k, q) => (
                  <span key={q} className={`dk-grid-q${q === s.a.wrong ? " dk-grid-q--x" : ""}`}>
                    <span className="dk-grid-n">{q + 1}</span>
                    {[0, 1, 2, 3].map((o) => <i key={o} className={o === (q === s.a.wrong ? (k + 1) % 4 : k) ? "on" : ""} />)}
                  </span>
                ))}
              </div>
            </div>
            <div className="dk-sheet-part">
              <div className="dk-sheet-row">
                <span>Part B · {s.b.n}</span>
                <b className="dk-mk">{s.b.marks}</b>
              </div>
              <p className="dk-sheet-q">{s.b.q}</p>
              <p className="dk-reason"><b>Reason:</b> {s.b.reason}</p>
            </div>
            <div className="dk-sheet-part">
              <div className="dk-sheet-row">
                <span>Part C · {s.c.n}</span>
                <b className="dk-mk">{s.c.marks}</b>
              </div>
              <p className="dk-sheet-q">{s.c.q}</p>
              <p className="dk-tests"><span className="dk-ok" /> {s.c.tests}</p>
              <p className="dk-reason"><b>Method check:</b> {s.c.check}</p>
            </div>
            <div className="dk-card-foot">
              <span>Total</span>
              <b>{s.total}</b>
            </div>
          </div>
        </figure>
      </div>
    </>
  );
}

/* ── Q8 · Marking fairly ───────────────────────────────── */
export function Marking({ dark }) {
  const m = DECK.marking;
  const { shot, code } = m;
  const c = code.card;
  return (
    <>
      <Ask c={m} />
      <div className="dk-mark">
        <div className="dk-mark-shot">
          {/* Cropped below the student's name row, to the question, the
              answer and the reason. */}
          <Mat label={shot.label}>
            <div className="dk-crop dk-crop--remark">
              <img src={dark ? shot.srcDark : shot.src} alt={shot.alt} />
            </div>
          </Mat>
          <Note text={shot.note} className="dk-note--remark" />
        </div>
        <aside className="dk-mark-side">
          <p className="dk-mark-written">{m.written}</p>
          <h3 className="dk-h3">{code.label}</h3>
          <p>{code.body}</p>
          <figure className="dk-code">
            <div className="dk-card">
              <div className="dk-card-head">
                <span>{c.head}</span>
                <span className="dk-mk">{c.mark}<small> / {c.of}</small></span>
              </div>
              <pre>{c.lines.join("\n")}</pre>
              <p className="dk-tests"><span className="dk-ok" /> {c.tests}</p>
              <p className="dk-reason"><b>Method check:</b> {c.check}</p>
            </div>
            <Sample />
          </figure>
        </aside>
      </div>
    </>
  );
}

/* ── Q9 · Who answers for the AI (on the panel) ────────── */
export function Control() {
  const c = DECK.control;
  return (
    <>
      <Ask c={c} />
      <div className="dk-control">
        <div>
          <h3 className="dk-h3 dk-col-h">{c.aiLabel}</h3>
          <div className="dk-table dk-aijobs" role="table">
            <div className="dk-tr dk-th" role="row">
              {c.aiHead.map((h) => <span key={h} role="columnheader">{h}</span>)}
            </div>
            {c.ai.map((r) => (
              <div className="dk-tr" role="row" key={r.job}>
                <span className="dk-ai-out" role="cell">{r.job}</span>
                <span className="dk-ai-check" role="cell">{r.check}</span>
              </div>
            ))}
          </div>
          <p className="dk-footline">{c.models}</p>
        </div>
        <div>
          <h3 className="dk-h3 dk-col-h">{c.controlLabel}</h3>
          <Rows items={c.controls} className="dk-rows-tight" />
        </div>
      </div>
    </>
  );
}

/* ── Q10 · What a department learns ────────────────────── */
export function Results({ dark }) {
  const r = DECK.results;
  const f = r.follow;
  return (
    <>
      <Ask c={r} />
      <div className="dk-results">
        {/* The chart part of the real screen; its header row of stats
            is cropped away. */}
        <Mat label={r.shot.label} className="dk-chart">
          <div className="dk-crop">
            <img src={dark ? r.shot.srcDark : r.shot.src} alt={r.shot.alt} />
          </div>
        </Mat>
        <div>
          <figure className="dk-follow">
            <div className="dk-card">
              <div className="dk-card-head"><span>{f.label}</span></div>
              <ul>
                {f.rows.map((x) => (
                  <li key={x.who}><b>{x.who}</b><span>{x.why}</span></li>
                ))}
              </ul>
            </div>
            <Sample />
          </figure>
          <div className="dk-results-items">
            {r.items.map((it) => (
              <div key={it.title}>
                <h3 className="dk-h3">{it.title}</h3>
                <p>{it.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Q11 · Outcomes ────────────────────────────────────── */
function Graph({ g }) {
  return (
    <div className="dk-graph" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {g.nodes.map((n) => <path key={n.name} d={`M50 50 L${n.x} ${n.y}`} />)}
        <path d={`M${g.nodes[0].x} ${g.nodes[0].y} L${g.nodes[2].x} ${g.nodes[2].y}`} />
        <path d={`M${g.nodes[3].x} ${g.nodes[3].y} L${g.nodes[4].x} ${g.nodes[4].y}`} />
      </svg>
      <span className="dk-graph-node is-hub" style={{ left: "50%", top: "50%" }}><i />{g.hub}</span>
      {g.nodes.map((n) => (
        <span key={n.name} className="dk-graph-node" style={{ left: `${n.x}%`, top: `${n.y}%` }}><i />{n.name}</span>
      ))}
    </div>
  );
}

export function Outcomes() {
  const o = DECK.outcomes;
  const m = o.mastery;
  return (
    <>
      <Ask c={o} />
      <div className="dk-outcomes">
        <figure className="dk-mastery">
          <div className="dk-card">
            <div className="dk-card-head"><span>{m.label}</span></div>
            <table>
              <thead>
                <tr>
                  <th />
                  {m.cols.map((c) => <th key={c}>{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {m.rows.map((row) => (
                  <tr key={row.topic}>
                    <th>{row.topic}</th>
                    {row.v.map((v, i) => (
                      <td key={i} className={v < 55 ? "low" : ""} style={{ "--v": v / 100 }}>
                        <span>{v}%</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="dk-card-foot">{m.also}</div>
          </div>
        </figure>
        <div className="dk-outcomes-side">
          <div className="dk-card dk-co">
            <div className="dk-card-head"><span>{o.co.label}</span><span>{o.co.foot}</span></div>
            <ul>
              {o.co.rows.map((r) => (
                <li key={r.co}>
                  <b>{r.co}</b>
                  <span>{r.l}</span>
                  <span className="dk-co-bar"><i style={{ width: `${r.v}%` }} /></span>
                  <b>{r.v}%</b>
                </li>
              ))}
            </ul>
          </div>
          <div className="dk-card">
            <div className="dk-card-head"><span>{o.graph.label}</span></div>
            <Graph g={o.graph} />
            <div className="dk-card-foot">{o.graph.body}</div>
          </div>
          <Sample />
        </div>
      </div>
    </>
  );
}

/* ── Q12 · Just ask ────────────────────────────────────── */
export function Assistant() {
  const a = DECK.assistant;
  return (
    <>
      <Ask c={a} />
      <div className="dk-assistant">
        <figure>
          <div className="dk-card">
            <div className="dk-card-head"><span>{a.chat.label}</span></div>
            <ul className="dk-chat">
              {a.chat.turns.map((t) => (
                <li key={t.text} className={t.from === "you" ? "is-you" : ""}>
                  <p>{t.text}</p>
                  {t.confirm && (
                    <span className="dk-acts">
                      {t.confirm.map((x) => <span key={x}>{x}</span>)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Sample />
        </figure>
        <Rows items={a.can} />
      </div>
    </>
  );
}

/* ── Q13 · What students get ───────────────────────────── */
export function Students({ dark }) {
  const s = DECK.students;
  return (
    <>
      <Ask c={s} />
      <div className="dk-students">
        <Mat label={s.shot.label}>
          <div className="dk-crop dk-crop--standing">
            <img src={dark ? s.shot.srcDark : s.shot.src} alt={s.shot.alt} />
          </div>
        </Mat>
        <Rows items={s.items} className="dk-rows-tight" />
      </div>
    </>
  );
}

/* ── Q14 · Data and IT ─────────────────────────────────── */
export function Running() {
  const t = DECK.running;
  return (
    <>
      <Ask c={t} />
      <div className="dk-pair">
        {t.hosting.map((h) => (
          <div key={h.title}>
            <h3 className="dk-h3 dk-h3--big">{h.title}</h3>
            <p>{h.body}</p>
          </div>
        ))}
      </div>
      <div className="dk-it">
        <div>
          <h3 className="dk-h3">{t.aiLabel}</h3>
          <p className="dk-it-ai">{t.ai}</p>
          <p className="dk-it-caveat">{t.caveat}</p>
        </div>
        <div>
          <h3 className="dk-h3">{t.dataLabel}</h3>
          <ul className="dk-list">
            {t.data.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ── Q15 · What we already have ────────────────────────── */
export function Compare() {
  const c = DECK.compare;
  return (
    <>
      <Ask c={c} />
      <div className="dk-compare">
        <div>
          <table className="dk-grid-table">
            <thead>
              <tr>
                <th />
                {COMPARE_COLUMNS.map((col) => (
                  <th key={col.id} className={col.id === "evolveus" ? "is-own" : ""}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.id}>
                  <th>{row.criterion}</th>
                  {COMPARE_COLUMNS.map((col) => (
                    <td key={col.id} className={col.id === "evolveus" ? "is-own" : ""}>
                      <span className={`dk-v is-${row.cells[col.id].v}`} role="img" aria-label={c.key[row.cells[col.id].v]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="dk-grid-key">
            {Object.entries(c.key).map(([k, label]) => (
              <span key={k}><i className={`dk-v is-${k}`} />{label}</span>
            ))}
          </p>
        </div>
        <aside className="dk-keep">
          <h3 className="dk-h3 dk-col-h">{c.keep.label}</h3>
          <ul>
            {c.keep.rows.map((r) => (
              <li key={r.title}>
                <b>{r.title}</b>
                <p>{r.body}</p>
              </li>
            ))}
          </ul>
          <p className="dk-small dk-keep-foot">{c.foot}</p>
        </aside>
      </div>
    </>
  );
}

/* ── Q16 · What not to expect ──────────────────────────── */
export function Limits() {
  const l = DECK.limits;
  return (
    <>
      <Ask c={l} />
      <div className="dk-table dk-limits" role="table">
        <div className="dk-tr dk-th" role="row">
          {l.head.map((h) => <span key={h} role="columnheader">{h}</span>)}
        </div>
        {l.rows.map((r) => (
          <div className="dk-tr" role="row" key={r.no}>
            <span className="dk-limit-no" role="cell">{r.no}</span>
            <span role="cell">{r.so}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Q17 · Who uses it ─────────────────────────────────── */
export function Proof({ dark }) {
  const p = DECK.proof;
  return (
    <>
      <Ask c={p} />
      <div className="dk-figs">
        {p.figures.map((f) => (
          <div key={f.l}>
            <b>{f.n}</b>
            <span>{f.l}</span>
          </div>
        ))}
        <img className={`dk-proof-logo${dark ? " dk-logo-dark" : ""}`} src={TRUST.logo} alt={TRUST.org} />
      </div>
      <div className="dk-proof">
        <div className="dk-proof-facts">
          <h3 className="dk-h3">{p.who.label}</h3>
          <p>{p.who.text}</p>
        </div>
        <blockquote className="dk-quote">
          <p>{p.quote.text}</p>
          <footer>{p.quote.by}</footer>
        </blockquote>
      </div>
    </>
  );
}

/* ── Send us a paper (on the panel) ────────────────────── */
export function Close() {
  const c = DECK.close;
  const site = `https://${BRAND.domain}`;
  return (
    <div className="dk-close">
      <h2 className="dk-h1">{c.headline}</h2>
      <p className="dk-lede">{c.body}</p>
      <ol className="dk-next">
        {c.steps.map((x, i) => (
          <li key={x.title}>
            <span className="dk-n">{pad(i + 1)}</span>
            <h3 className="dk-h3">{x.title}</h3>
            <p>{x.body}</p>
          </li>
        ))}
      </ol>
      <div className="dk-contact">
        <div>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <a href={site}>{BRAND.domain}</a>
        </div>
        <a className="dk-qr" href={site}><img src={c.qr} alt={`QR code for ${BRAND.domain}`} /></a>
      </div>
    </div>
  );
}
