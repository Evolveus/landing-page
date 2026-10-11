import { BRAND, BRAND_LOGO, TRUST } from "../landing/content";
import { DECK, STEPS } from "./content";

/* The deck's slides, in order. Each is drawn on a fixed 1440×810 canvas
   (see deck.css) and takes `dark` for the screenshots and logos that
   come in two versions. Copy is in ./content.js. */

const pad = (n) => String(n).padStart(2, "0");

/* ── Shared pieces ─────────────────────────────────────── */

/* The running head: the brand, and on a step slide the row of five
   steps with the current one shaded, like a filled answer on a sheet. */
function Head({ dark, step }) {
  return (
    <header className="dk-head">
      <span className="dk-brand">
        <img src={dark ? BRAND_LOGO.markDark : BRAND_LOGO.mark} alt="" />
        {BRAND.name}
      </span>
      {step && (
        <ol className="dk-steps" aria-label="The exam, in five steps">
          {STEPS.map((s) => (
            <li key={s.n} className={s.n === step ? "on" : ""} aria-current={s.n === step ? "step" : undefined}>
              <i />
              <span>{s.n}</span> {s.name}
            </li>
          ))}
        </ol>
      )}
    </header>
  );
}

export function Frame({ n, total, dark, step, panel, bare, className = "", children }) {
  return (
    <section className={`dk-slide${panel ? " dk-slide--panel" : ""} ${className}`}>
      {!bare && <Head dark={dark || panel} step={step} />}
      <div className="dk-body">{children}</div>
      <footer className="dk-foot">
        <span>{BRAND.domain}</span>
        <span>{n} / {total}</span>
      </footer>
    </section>
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

function Title({ children }) {
  return <h2 className="dk-h2">{children}</h2>;
}

/* ── 1 · Cover ─────────────────────────────────────────── */

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

/* ── 2 · Four tools, one system ────────────────────────── */
export function Tools({ dark }) {
  const t = DECK.tools;
  return (
    <>
      <Title>{t.title}</Title>
      <p className="dk-pain">{t.pain}</p>
      <div className="dk-tools-map">
        <ol className="dk-tool-list">
          {t.rows.map((r) => (
            <li key={r.tool}>
              <div>
                <h3 className="dk-h3">{r.tool}</h3>
                <span className="dk-eg">{r.eg}</span>
              </div>
              <p>for {r.job}</p>
            </li>
          ))}
        </ol>
        {/* Four lines drawn into one: what the slide says. */}
        <svg className="dk-merge" viewBox="0 0 120 400" preserveAspectRatio="none" aria-hidden="true">
          {[50, 150, 250, 350].map((y) => (
            <path key={y} d={`M0 ${y} C 60 ${y}, 60 200, 120 200`} />
          ))}
        </svg>
        <div className="dk-one">
          <span className="dk-brand dk-one-name">
            <img src={dark ? BRAND_LOGO.markDark : BRAND_LOGO.mark} alt="" />
            {t.one}
          </span>
          <ul>
            {t.gets.map((g) => <li key={g}>{g}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ── 3 · The whole paper ───────────────────────────────── */
export function Paper() {
  const p = DECK.paper;
  const s = p.sheet;
  return (
    <div className="dk-paper">
      <div className="dk-paper-text">
        <Title>{p.title}</Title>
        <p className="dk-lede">{p.sub}</p>
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
            <p className="dk-answer">{s.b.answer}</p>
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
        <Sample />
      </figure>
    </div>
  );
}

/* ── 4 · Where AI does the work ────────────────────────── */
export function Ai() {
  const a = DECK.ai;
  return (
    <>
      <Title>{a.title}</Title>
      <div className="dk-ai-table" role="table">
        <div className="dk-ai-tr dk-ai-th" role="row">
          {a.head.map((h) => <span key={h} role="columnheader">{h}</span>)}
        </div>
        {a.rows.map((r) => (
          <div className="dk-ai-tr" role="row" key={r.in}>
            <span className="dk-ai-step" role="cell">{r.step}</span>
            <span role="cell">{r.in}</span>
            <span className="dk-ai-out" role="cell">{r.out}</span>
            <span className="dk-ai-check" role="cell">{r.check}</span>
          </div>
        ))}
      </div>
      <p className="dk-ai-models">{a.models}</p>
    </>
  );
}

/* ── 5 · 01 Before: questions from your notes ──────────── */
export function Setting() {
  const st = DECK.setting;
  const { pdf, rubric } = st;
  return (
    <>
      <Title>{st.title}</Title>
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
          <div className="dk-card dk-rubric">
            <div className="dk-card-head">
              <span>{rubric.label}</span>
            </div>
            <p className="dk-rubric-q">{pdf.drafts[2].q}</p>
            <ul>
              {rubric.lines.map((l) => (
                <li key={l.t}><span>{l.t}</span><b>{l.m}</b></li>
              ))}
            </ul>
            <div className="dk-card-foot">{rubric.foot}</div>
          </div>
          <div className="dk-facts">
            {st.facts.map((f) => (
              <div key={f.n}>
                <b>{f.n}</b>
                <p>{f.l}</p>
              </div>
            ))}
          </div>
          <p className="dk-small">{st.tags}</p>
        </div>
      </div>
    </>
  );
}

/* ── 6 · 02 During: the lab and the replay ─────────────── */
export function During() {
  const d = DECK.during;
  const { log, replay } = d;
  return (
    <>
      <Title>{d.title}</Title>
      <div className="dk-during">
        <ol className="dk-controls">
          {d.controls.map((c, i) => (
            <li key={c.title}>
              <span className="dk-n">{pad(i + 1)}</span>
              <h3 className="dk-h3">{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ol>
        <div className="dk-card dk-log">
          <div className="dk-card-head">
            <span>{log.label}</span>
          </div>
          <table>
            <tbody>
              {log.rows.map((r) => (
                <tr key={r.t}>
                  <td className="dk-time">{r.t}</td>
                  <td>{r.who}</td>
                  <td><span className="dk-flag" />{r.kind}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <figure className="dk-track">
        <div className="dk-card">
          <div className="dk-card-head">
            <span>{replay.head}</span>
            <span className="dk-track-at">
              {replay.steps[replay.now].t} · {replay.steps[replay.now].l}
            </span>
          </div>
          <div className="dk-track-line">
            <span className="dk-track-done" style={{ width: `${replay.steps[replay.now].at}%` }} />
            {replay.steps.map((s, i) => (
              <span
                key={s.l}
                className={`dk-tick${s.flag ? " dk-tick--flag" : ""}${i % 2 ? " dk-tick--low" : ""}${i === replay.now ? " dk-tick--now" : ""}`}
                style={{ left: `${s.at}%` }}
              >
                <i />
                <span><b>{s.t}</b>{s.l}</span>
              </span>
            ))}
          </div>
        </div>
        <figcaption className="dk-track-cap">
          <span>{replay.plain}</span>
          <span className="dk-cap">{DECK.sample}</span>
        </figcaption>
      </figure>
    </>
  );
}

/* ── 7 · 03 Marking ────────────────────────────────────── */
export function Marking({ dark }) {
  const m = DECK.marking;
  const { shot, code } = m;
  const c = code.card;
  return (
    <>
      <Title>{m.title}</Title>
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

/* ── 8 · 03 Faculty decide (on the panel) ──────────────── */
export function Control() {
  const c = DECK.control;
  return (
    <div className="dk-control">
      <h2 className="dk-h2 dk-h2--big">{c.title}</h2>
      <p className="dk-lede">{c.sub}</p>
      <figure className="dk-example">
        <span className="dk-example-k">{c.example.label}</span>
        <ol>
          {c.example.steps.map((x, i) => (
            <li key={x}><span className="dk-n">{i + 1}</span>{x}</li>
          ))}
        </ol>
      </figure>
      <ol className="dk-rows">
        {c.rows.map((r, i) => (
          <li key={r.title}>
            <span className="dk-n">{pad(i + 1)}</span>
            <h3 className="dk-h3">{r.title}</h3>
            <p>{r.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── 9 · 04 Results for the class and the department ───── */
export function Results({ dark }) {
  const r = DECK.results;
  const m = r.mastery;
  return (
    <>
      <Title>{r.title}</Title>
      <div className="dk-results">
        <div>
          {/* The chart part of the real screen; its header row of stats
              is cropped away. */}
          <Mat label={r.shot.label} className="dk-chart">
            <div className="dk-crop">
              <img src={dark ? r.shot.srcDark : r.shot.src} alt={r.shot.alt} />
            </div>
          </Mat>
          <div className="dk-results-items">
            {r.items.map((it) => (
              <div key={it.title}>
                <h3 className="dk-h3">{it.title}</h3>
                <p>{it.body}</p>
              </div>
            ))}
          </div>
        </div>
        <figure className="dk-mastery">
          <div className="dk-card">
            <div className="dk-card-head">
              <span>{m.label}</span>
            </div>
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
          <span className="dk-cap dk-sample">{DECK.sample} · {r.export}</span>
        </figure>
      </div>
    </>
  );
}

/* ── 10 · 04 What students get back ────────────────────── */
export function Students({ dark }) {
  const s = DECK.students;
  return (
    <>
      <Title>{s.title}</Title>
      <div className="dk-students">
        <Mat label={s.shot.label}>
          <img src={dark ? s.shot.srcDark : s.shot.src} alt={s.shot.alt} />
        </Mat>
        <ol className="dk-stu-list">
          {s.items.map((it, i) => (
            <li key={it.title}>
              <span className="dk-n">{pad(i + 1)}</span>
              <h3 className="dk-h3">{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

/* ── 11 · 05 Running it ────────────────────────────────── */
export function Running() {
  const t = DECK.running;
  return (
    <>
      <Title>{t.title}</Title>
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

/* ── 12 · In use ───────────────────────────────────────── */
export function Proof({ dark }) {
  const p = DECK.proof;
  return (
    <>
      <div className="dk-proof-top">
        <Title>{p.title}</Title>
        <img className={`dk-proof-logo${dark ? " dk-logo-dark" : ""}`} src={TRUST.logo} alt={TRUST.org} />
      </div>
      <div className="dk-figs">
        {p.figures.map((f) => (
          <div key={f.l}>
            <b>{f.n}</b>
            <span>{f.l}</span>
          </div>
        ))}
      </div>
      <div className="dk-proof">
        <div className="dk-proof-facts">
          <p className="dk-midterm">{p.midterm}</p>
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

/* ── 13 · Send us a paper (on the panel) ───────────────── */
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
