import { BRAND, BRAND_LOGO, TRUST } from "../landing/content";
import { OmrNumber } from "../landing/brand/figures";
import { DECK, STEPS } from "./content";

/* The deck's slides, in order. Each is drawn on a fixed 1440×810 canvas
   (see deck.css) and takes `dark` for the screenshots and logos that
   come in two versions. Copy is in ./content.js. */

const pad = (n) => String(n).padStart(2, "0");

/* ── Shared pieces ─────────────────────────────────────── */

/* The running head: the brand, then where in the exam this slide is.
   On a step slide that is the row of five steps with the current one
   shaded, like a filled answer on a sheet; elsewhere a mono label. */
function Head({ dark, step, label }) {
  return (
    <header className="dk-head">
      <span className="dk-brand">
        <img src={dark ? BRAND_LOGO.markDark : BRAND_LOGO.mark} alt="" />
        {BRAND.name}
      </span>
      {step ? (
        <ol className="dk-steps" aria-label="The exam, in five steps">
          {STEPS.map((s) => (
            <li key={s.n} className={s.n === step ? "on" : ""} aria-current={s.n === step ? "step" : undefined}>
              <i />
              <span>{s.n}</span> {s.name}
            </li>
          ))}
        </ol>
      ) : (
        label && <span className="dk-mono">{label}</span>
      )}
    </header>
  );
}

export function Frame({ n, total, dark, step, label, panel, className = "", children }) {
  return (
    <section className={`dk-slide${panel ? " dk-slide--panel" : ""} ${className}`}>
      <Head dark={dark || panel} step={step} label={label} />
      <div className="dk-body">{children}</div>
      <footer className="dk-foot dk-mono">
        <span>{BRAND.domain}</span>
        <span>{pad(n)} / {pad(total)}</span>
      </footer>
    </section>
  );
}

/* Marks a feature that uses an AI model, as the context doc does. */
const Ai = () => <span className="dk-ai">AI</span>;

/* A handwritten pencil note with an arrow back to what it names. */
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
   the left edge, a registration square, and a figure head. */
function Mat({ fig, label, children, className = "" }) {
  return (
    <figure className={`dk-mat ${className}`}>
      <div className="dk-mat-head">
        <span className="dk-mono dk-fig">Fig. {fig}</span>
        <span className="dk-mono">{label}</span>
      </div>
      <div className="dk-mat-body">{children}</div>
    </figure>
  );
}

const Sample = () => <span className="dk-mono dk-sample">{DECK.sample}</span>;

function Title({ children }) {
  return <h2 className="dk-h2">{children}</h2>;
}

/* ── 1 · Title ─────────────────────────────────────────── */
export function Cover({ dark }) {
  const c = DECK.cover;
  return (
    <div className="dk-cover">
      <span className="dk-mono dk-kicker">{c.kicker}</span>
      <h1 className="dk-h1">
        <span>{c.headline[0]}</span>
        <span className="dk-h1-last">
          {c.headline[1]}
          {/* One loose stroke, drifting up a little, as a hand underlines. */}
          <svg className="dk-underline" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
            <path className="dk-pencil" d="M2 15 C 46 13, 96 14, 150 12 S 252 10, 304 10 S 368 7, 398 3" />
          </svg>
        </span>
      </h1>
      <p className="dk-lede">{c.sub}</p>
      <div className="dk-cover-foot">
        <span className="dk-org">
          <span className="dk-mono">{c.inUse}</span>
          <img className={dark ? "dk-logo-dark" : ""} src={TRUST.logo} alt={TRUST.org} />
        </span>
        <p className="dk-origin">{c.origin}</p>
      </div>
    </div>
  );
}

/* ── 2 · Today ─────────────────────────────────────────── */
export function Problem() {
  const p = DECK.problem;
  return (
    <>
      <Title>{p.title}</Title>
      <div className="dk-table">
        {p.rows.map((r, i) => (
          <div className="dk-tr" key={r.tool}>
            <span className="dk-n">{pad(i + 1)}</span>
            <div>
              <h3 className="dk-h3">{r.tool}</h3>
              <span className="dk-eg">{r.eg}</span>
            </div>
            <p>{r.gap}</p>
          </div>
        ))}
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
              <span className="dk-mono dk-part">{x.part}</span>
              <h3 className="dk-h3">{x.kind} {x.ai && <Ai />}</h3>
              <p>{x.how}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* One student's paper, drawn as a marked answer sheet. */}
      <figure className="dk-sheet">
        <div className="dk-card">
          <div className="dk-card-head">
            <span className="dk-mono">{s.head}</span>
          </div>
          <div className="dk-sheet-part">
            <div className="dk-sheet-row">
              <span className="dk-mono">Part A · {s.a.q}</span>
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
              <span className="dk-mono">Part B · {s.b.n}</span>
              <b className="dk-mk">{s.b.marks}</b>
            </div>
            <p className="dk-sheet-q">{s.b.q}</p>
            <p className="dk-answer">{s.b.answer}</p>
            <p className="dk-reason"><Ai /> {s.b.reason}</p>
          </div>
          <div className="dk-sheet-part">
            <div className="dk-sheet-row">
              <span className="dk-mono">Part C · {s.c.n}</span>
              <b className="dk-mk">{s.c.marks}</b>
            </div>
            <p className="dk-sheet-q">{s.c.q}</p>
            <p className="dk-tests"><span className="dk-ok" /> {s.c.tests}</p>
            <p className="dk-reason"><Ai /> {s.c.check}</p>
          </div>
          <div className="dk-card-foot">
            <span className="dk-mono">Total</span>
            <b>{s.total}</b>
          </div>
        </div>
        <Sample />
      </figure>
    </div>
  );
}

/* ── 4 · 01 Before: questions from your notes ──────────── */
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
              <span className="dk-mono">{pdf.label} <Ai /></span>
            </div>
            <div className="dk-pdf-file">
              <span className="dk-pdf-icon" aria-hidden="true">PDF</span>
              <span><b>{pdf.file}</b><small>{pdf.size}</small></span>
              <span className="dk-mono dk-pdf-ask">{pdf.ask}</span>
            </div>
            <ol className="dk-drafts">
              {pdf.drafts.map((d, i) => (
                <li key={d.q}>
                  <span className="dk-mono">{pad(i + 1)} · {d.type}</span>
                  <p>{d.q}</p>
                  <span className="dk-acts">
                    {pdf.actions.map((a) => <span key={a}>{a}</span>)}
                  </span>
                </li>
              ))}
            </ol>
            <div className="dk-card-foot dk-mono">{pdf.more}</div>
          </div>
          <Note text={pdf.note} className="dk-note--pdf" />
        </figure>

        <div className="dk-set-side">
          <figure className="dk-rubric">
            <div className="dk-card">
              <div className="dk-card-head">
                <span className="dk-mono">{rubric.label} <Ai /></span>
              </div>
              <p className="dk-rubric-q">{pdf.drafts[2].q}</p>
              <ul>
                {rubric.lines.map((l) => (
                  <li key={l.t}><span>{l.t}</span><b>{l.m}</b></li>
                ))}
              </ul>
              <div className="dk-card-foot dk-mono">{rubric.foot}</div>
            </div>
            <Sample />
          </figure>
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

/* ── 5 · 02 During: the lab ────────────────────────────── */
export function Sitting() {
  const si = DECK.sitting;
  const { log } = si;
  return (
    <>
      <Title>{si.title}</Title>
      <div className="dk-sit">
        <ol className="dk-controls">
          {si.controls.map((c, i) => (
            <li key={c.title}>
              <span className="dk-n">{pad(i + 1)}</span>
              <div>
                <h3 className="dk-h3">{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <figure className="dk-log">
          <div className="dk-card">
            <div className="dk-card-head">
              <span className="dk-mono">{log.label}</span>
            </div>
            <p className="dk-log-sub">{log.sub}</p>
            <table>
              <tbody>
                {log.rows.map((r) => (
                  <tr key={r.t}>
                    <td className="dk-mono">{r.t}</td>
                    <td>{r.who}</td>
                    <td><span className="dk-flag" />{r.kind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Sample />
          <Note text={log.note} className="dk-note--log" />
        </figure>
      </div>
    </>
  );
}

/* ── 6 · 02 During: session replay ─────────────────────── */
export function Replay() {
  const r = DECK.replay;
  const tr = r.track;
  return (
    <>
      <Title>{r.title}</Title>
      <div className="dk-replay">
        <p className="dk-lede">{r.body}</p>
        <p className="dk-plain">{r.plain}</p>
      </div>
      <figure className="dk-track">
        <div className="dk-card">
          <div className="dk-card-head">
            <span className="dk-mono">Session replay · {tr.head}</span>
            <span className="dk-mono dk-track-at">
              {tr.steps[tr.now].t} · {tr.steps[tr.now].l}
            </span>
          </div>
          <div className="dk-track-line">
            <span className="dk-track-done" style={{ width: `${tr.steps[tr.now].at}%` }} />
            {tr.steps.map((s, i) => (
              <span
                key={s.l}
                className={`dk-tick${s.flag ? " dk-tick--flag" : ""}${i % 2 ? " dk-tick--low" : ""}${i === tr.now ? " dk-tick--now" : ""}`}
                style={{ left: `${s.at}%` }}
              >
                <i />
                <span><b className="dk-mono">{s.t}</b>{s.l}</span>
              </span>
            ))}
          </div>
        </div>
        <Sample />
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
          <Mat fig={shot.fig} label={shot.label}>
            <img src={dark ? shot.srcDark : shot.src} alt={shot.alt} />
          </Mat>
          <Note text={shot.notes.mark} className="dk-note--mark" />
          <Note text={shot.notes.remark} className="dk-note--remark" />
        </div>
        <aside className="dk-mark-code">
          <span className="dk-mono dk-label">{code.label} <Ai /></span>
          <h3 className="dk-h3 dk-h3--big">{code.title}</h3>
          <p>{code.body}</p>
          <figure className="dk-code">
            <div className="dk-card">
              <div className="dk-card-head">
                <span className="dk-mono">{c.head}</span>
                <span className="dk-mk">
                  {c.mark}<small> / {c.of}</small>
                </span>
              </div>
              <pre>{c.lines.join("\n")}</pre>
              <p className="dk-tests"><span className="dk-ok" /> {c.tests}</p>
              <p className="dk-reason"><Ai /> {c.check}</p>
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
      <span className="dk-mono dk-label">{c.label}</span>
      <h2 className="dk-h2 dk-h2--big">{c.title}</h2>
      <p className="dk-lede">{c.sub}</p>
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

/* ── 9 · 04 Results ────────────────────────────────────── */
export function Reading({ dark }) {
  const r = DECK.reading;
  return (
    <>
      <Title>{r.title}</Title>
      <div className="dk-read">
        <Mat fig={r.shot.fig} label={r.shot.label}>
          <img src={dark ? r.shot.srcDark : r.shot.src} alt={r.shot.alt} />
        </Mat>
        <div className="dk-read-list">
          {r.items.map((it) => (
            <div key={it.title}>
              <h3 className="dk-h3">{it.title}</h3>
              <p>{it.body}</p>
            </div>
          ))}
          <p className="dk-mono dk-export">{r.export}</p>
        </div>
      </div>
    </>
  );
}

/* ── 10 · 04 The assistant ─────────────────────────────── */
export function Assistant() {
  const a = DECK.assistant;
  return (
    <div className="dk-asst">
      <div className="dk-asst-text">
        <span className="dk-mono dk-label">{a.label} <Ai /></span>
        <Title>{a.title}</Title>
        <p className="dk-lede">{a.can}</p>
      </div>
      <figure className="dk-chat">
        <div className="dk-card">
          {a.chat.map((m, i) => (
            <div key={i} className={`dk-msg dk-msg--${m.who}${m.confirm ? " dk-msg--confirm" : ""}`}>
              <p>{m.text}</p>
              {m.actions && (
                <span className="dk-msg-acts">
                  {m.actions.map((x, j) => <span key={x} className={j === 0 ? "on" : ""}>{x}</span>)}
                </span>
              )}
            </div>
          ))}
        </div>
        <Sample />
        <Note text={a.note} className="dk-note--chat" />
      </figure>
    </div>
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
          <span className="dk-mono dk-label">{t.aiLabel} <Ai /></span>
          <p className="dk-it-ai">{t.ai}</p>
          <p className="dk-it-caveat">{t.caveat}</p>
        </div>
        <div>
          <span className="dk-mono dk-label">{t.dataLabel}</span>
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
  const m = p.midterm;
  return (
    <>
      <div className="dk-proof-top">
        <Title>{p.title}</Title>
        <img className={`dk-proof-logo${dark ? " dk-logo-dark" : ""}`} src={TRUST.logo} alt={TRUST.org} />
      </div>
      <div className="dk-proof">
        <figure className="dk-time">
          <span className="dk-mono">{m.label}</span>
          <div className="dk-time-row">
            <span className="dk-time-v dk-time-v--before">
              <span className="dk-mono">{m.before.label}</span>
              <b>{m.before.n}<small>{m.before.unit}</small></b>
            </span>
            <svg className="dk-time-arrow" viewBox="0 0 140 34" aria-hidden="true">
              <path className="dk-pencil" d="M4 22 C 36 10, 84 9, 130 17" />
              <path className="dk-pencil" d="M116 7 L 131 17 L 115 27" />
            </svg>
            <span className="dk-time-v">
              <span className="dk-mono">{m.after.label}</span>
              <b>{m.after.n}<small>{m.after.unit}</small></b>
            </span>
          </div>
        </figure>
        <blockquote className="dk-quote">
          <p>{p.quote.text}</p>
          <footer className="dk-mono">{p.quote.by}</footer>
        </blockquote>
      </div>
      <div className="dk-figs">
        {TRUST.figures.map((f) => (
          <div className="dk-fig-n" key={f.l}>
            <OmrNumber text={f.n} />
            <span className="dk-mono">{f.l}</span>
          </div>
        ))}
        <p className="dk-daily">{p.daily}</p>
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
      <span className="dk-mono dk-label">{c.kicker}</span>
      <h2 className="dk-h1">{c.headline}</h2>
      <p className="dk-lede">{c.body}</p>
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
