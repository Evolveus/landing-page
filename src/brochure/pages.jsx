import { BRAND, TRUST } from "../landing/content";
import { BROCHURE } from "./content";
import { Ai, Doodle, Note, Opener } from "./parts";

const pad = (n) => String(n).padStart(2, "0");

/* The booklet's pages, in order. Each is one A4 sheet. `panel` pages are
   drawn on the forest panel (see brochure.css); the rest on paper. */

/* ── Cover ─────────────────────────────────────────────── */
export function Cover() {
  const c = BROCHURE.cover;
  return (
    <div className="br-cover">
      <h1 className="br-h1">
        <span>{c.headline[0]}</span>
        <span className="br-h1-second">
          {c.headline[1]}
          {/* One pencil stroke under the claim the booklet makes. */}
          <svg className="br-underline" viewBox="0 0 400 18" preserveAspectRatio="none" aria-hidden="true">
            <path d="M4 12 C 90 6, 200 5, 300 8 S 380 12, 396 9" />
            <path d="M40 15 C 140 11, 250 11, 340 13" />
          </svg>
        </span>
      </h1>
      <p className="br-cover-tag">{c.tag}</p>

      <figure className="br-time">
        <div className="br-time-row">
          <span className="br-time-v br-time-v--before">
            <span className="br-mono">{c.before.label}</span>
            <b>{c.before.n}<small>{c.before.unit}</small></b>
          </span>
          <svg className="br-time-arrow" viewBox="0 0 140 34" aria-hidden="true">
            <path d="M4 22 C 36 10, 84 9, 130 17" />
            <path d="M116 7 L 131 17 L 115 27" />
          </svg>
          <span className="br-time-v">
            <span className="br-mono">{c.after.label}</span>
            <b>{c.after.n}<small>{c.after.unit}</small></b>
          </span>
        </div>
        <figcaption>{c.timeNote}</figcaption>
      </figure>

      <div className="br-cover-foot">
        <span className="br-org">
          {c.inUse}
          <img src={TRUST.logo} alt={TRUST.org} />
        </span>
      </div>
    </div>
  );
}

/* ── The case, with the contents ───────────────────────── */
export function Case() {
  const c = BROCHURE.cover;
  // The chapters and the students' page, in page order.
  const contents = [
    ...BROCHURE.chapters,
    { n: "", name: BROCHURE.students.label, page: BROCHURE.studentsPage },
  ].sort((a, b) => a.page - b.page);
  return (
    <>
      <section className="br-case-top">
        <p className="br-case-lede">{c.lede}</p>
        <nav className="br-contents" aria-label={BROCHURE.caseLabel}>
          <span className="br-mono br-label">{BROCHURE.caseLabel}</span>
          <ol>
            {contents.map((c) => (
              <li key={c.page} className={c.n ? "" : "br-contents-say"}>
                <span className="br-contents-n">{c.n}</span>
                <span>{c.name}</span>
                <span className="br-mono">{pad(c.page)}</span>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <section className="br-replaces">
        <span className="br-mono br-label">{c.replacesLabel}</span>
        <h2 className="br-h2">{c.replacesTitle}</h2>
        <div className="br-table">
          {c.replaces.map((r) => (
            <div className="br-tr" key={r.tool}>
              <div>
                <h3 className="br-h3">{r.tool}</h3>
                <span className="br-eg">{r.eg}</span>
              </div>
              <p>{r.gap}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="br-proof">
        <div className="br-figures">
          {BROCHURE.figures.map((f) => (
            <div key={f.l}>
              <b>{f.n}</b>
              <span className="br-mono">{f.l}</span>
            </div>
          ))}
        </div>
        <div className="br-proof-row">
          <span className="br-org">
            {c.inUse}
            <img src={TRUST.logo} alt={TRUST.org} />
          </span>
          <p className="br-origin">{c.origin}</p>
        </div>
      </section>
    </>
  );
}

/* ── Chapter I: setting the paper ──────────────────────── */
export function Setting() {
  const st = BROCHURE.setting;
  const { pdf, rubric } = st;
  return (
    <>
      <Doodle at="book" className="br-dd--book" />
      <Opener n="I" intro={st.intro} />

      <div className="br-set">
        <figure className="br-pdf">
          <div className="br-card">
            <div className="br-card-head">
              <span className="br-mono">{pdf.label} <Ai /></span>
            </div>
            <div className="br-pdf-file">
              <span className="br-pdf-icon" aria-hidden="true">PDF</span>
              <span><b>{pdf.file}</b><small>{pdf.size}</small></span>
              <span className="br-mono br-pdf-ask">{pdf.ask}</span>
            </div>
            <ol className="br-drafts">
              {pdf.drafts.map((d, i) => (
                <li key={d.q}>
                  <span className="br-mono">{pad(i + 1)} · {d.type}</span>
                  <p>{d.q}</p>
                  <span className="br-acts">
                    {pdf.actions.map((a) => <span key={a}>{a}</span>)}
                  </span>
                </li>
              ))}
            </ol>
            <div className="br-card-foot br-mono">{pdf.more}</div>
          </div>
          <Note text={pdf.note} className="br-note--pdf" />
        </figure>

        <figure className="br-rubric">
          <div className="br-card">
            <div className="br-card-head">
              <span className="br-mono">{rubric.label} <Ai /></span>
            </div>
            <p className="br-rubric-q">{rubric.q}</p>
            <ul>
              {rubric.lines.map((l) => (
                <li key={l.t}><span>{l.t}</span><b>{l.m}</b></li>
              ))}
            </ul>
            <div className="br-card-foot br-mono">{rubric.foot}</div>
          </div>
          <figcaption className="br-mono br-sample">{BROCHURE.marking.sample}</figcaption>
        </figure>
      </div>

      <div className="br-stats">
        {st.stats.map((x) => (
          <div key={x.n}>
            <b>{x.n}</b>
            <p>{x.l}</p>
          </div>
        ))}
      </div>
      <p className="br-also">
        {st.more.map((m) => <span key={m}>{m}</span>)}
      </p>
    </>
  );
}

/* ── Chapter II: sitting the exam ──────────────────────── */
export function Sitting() {
  const si = BROCHURE.sitting;
  const { log, replay } = si;
  return (
    <>
      <Opener n="II" intro={si.intro} />

      <div className="br-sit">
        <div className="br-controls">
          {si.controls.map((c, i) => (
            <div key={c.title}>
              <span className="br-n">{pad(i + 1)}</span>
              <h3 className="br-h3">{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>

        <figure className="br-log">
          <div className="br-card">
            <div className="br-card-head">
              <span className="br-mono">{log.label}</span>
            </div>
            <p className="br-log-sub">{log.sub}</p>
            <table>
              <tbody>
                {log.rows.map((r) => (
                  <tr key={r.t}>
                    <td className="br-mono">{r.t}</td>
                    <td>{r.who}</td>
                    <td><span className="br-flag" />{r.kind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className="br-mono br-sample">{BROCHURE.marking.sample}</figcaption>
          <Note text={log.note} className="br-note--log" />
        </figure>
      </div>

      <section className="br-replay">
        <div className="br-replay-text">
          <span className="br-mono br-label">{replay.label}</span>
          <h3 className="br-h3 br-h3--big">{replay.title}</h3>
          <p>{replay.body}</p>
        </div>
        <figure className="br-track" aria-label="A drawn timeline of one attempt">
          <div className="br-track-line">
            {replay.steps.map((s, i) => (
              <span
                key={s.l}
                className={`br-step${s.flag ? " br-step--flag" : ""}${i % 2 ? " br-step--low" : ""}`}
                style={{ left: `${s.at}%` }}
              >
                <i />
                <span>{s.l}</span>
              </span>
            ))}
          </div>
          <figcaption className="br-mono br-sample">{BROCHURE.marking.sample}</figcaption>
        </figure>
      </section>
    </>
  );
}

/* ── Chapter III: marking ──────────────────────────────── */
export function Marking({ dark }) {
  const m = BROCHURE.marking;
  return (
    <>
      <Opener n="III" intro={m.intro} />

      <div className="br-kinds">
        {m.kinds.map((k) => (
          <div key={k.n}>
            <span className="br-n">{k.n}</span>
            <h3 className="br-h3">{k.title} {k.ai && <Ai />}</h3>
            <p>{k.body}</p>
          </div>
        ))}
      </div>

      {/* The real screen, large, cut off by the page's left edge; beside
          it, how code is marked. */}
      <div className="br-show">
        <figure className="br-bleed">
          <img src={dark ? m.shot.srcDark : m.shot.src} alt={m.shot.alt} />
          <figcaption className="br-mono br-cap">
            <span className="br-fig">{m.shot.n}</span>
            {m.shot.label}
          </figcaption>
        </figure>
        <aside className="br-show-side">
          <span className="br-mono br-label">{m.codeLabel} <Ai /></span>
          <h3 className="br-h3 br-h3--big">{m.codeTitle}</h3>
          <p>{m.codeBody}</p>
          <Note text={m.shot.note} className="br-note--shot" />
        </aside>
      </div>

      <section className="br-can">
        <span className="br-mono br-label">{m.sayLabel}</span>
        <ul>
          {m.say.map((x) => (
            <li key={x.title}><b>{x.title}</b>{x.body}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ── For students: on the panel, between chapters III and IV ── */
export function Students({ dark }) {
  const st = BROCHURE.students;
  return (
    <div className="br-stu">
      <Doodle at="tick" className="br-dd--say" />
      <span className="br-mono br-label">{st.label}</span>
      <h2 className="br-say-title">
        {st.title.map((l) => <span key={l}>{l}</span>)}
      </h2>
      <p className="br-say-lede">{st.lede}</p>
      <div className="br-stu-body">
        <figure className="br-stu-shot">
          <img src={dark ? st.fig.srcDark : st.fig.src} alt={st.fig.alt} />
          <figcaption className="br-mono br-cap">
            <span className="br-fig">{st.fig.n}</span>
            {st.fig.label}
          </figcaption>
        </figure>
        <ol className="br-stu-list">
          {st.items.map((it, i) => (
            <li key={it.title}>
              <span className="br-say-n">{pad(i + 1)}</span>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ── Chapter IV: reading the results ───────────────────── */
export function Reading({ dark }) {
  const r = BROCHURE.results;
  const as = r.assistant;
  return (
    <>
      <Doodle at="chart" className="br-dd--chart" />
      <Opener n="IV" intro={r.intro} />

      {/* The real screen, cut off by the page's right edge this time. */}
      <div className="br-show br-show--right">
        <aside className="br-chat">
          <span className="br-mono br-label">{as.label} <Ai /></span>
          <p className="br-chat-q">{as.ask}</p>
          <p className="br-chat-a">{as.answer}</p>
          <span className="br-mono br-sample">{BROCHURE.marking.sample}</span>
          <p className="br-chat-body">{as.body}</p>
          <Note text={as.note} className="br-note--chat" />
        </aside>
        <figure className="br-bleed">
          <img src={dark ? r.fig.srcDark : r.fig.src} alt={r.fig.alt} />
          <figcaption className="br-mono br-cap">
            <span className="br-fig">{r.fig.n}</span>
            {r.fig.label}
          </figcaption>
        </figure>
      </div>

      <div className="br-rep">
        {r.items.map((it) => (
          <div key={it.title}>
            <h3 className="br-h3">{it.title} {it.ai && <Ai />}</h3>
            <p>{it.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Chapter V: running it, then the offer on the panel ─── */
export function Running() {
  const t = BROCHURE.it;
  const q = BROCHURE.quote;
  const cta = BROCHURE.cta;
  const site = `https://${BRAND.domain}`;
  return (
    <>
      <Opener n="V" intro={t.intro} />

      <div className="br-pair">
        {t.hosting.map((h) => (
          <div key={h.title}>
            <h3 className="br-h3 br-h3--big">{h.title}</h3>
            <p>{h.body}</p>
          </div>
        ))}
      </div>

      <div className="br-it">
        <div>
          <span className="br-mono br-label">{t.aiTitle} <Ai /></span>
          <p className="br-it-ai">{t.ai}</p>
        </div>
        <div>
          <span className="br-mono br-label">{t.dataLabel}</span>
          <ul className="br-list">
            {t.data.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
      </div>

      <section className="br-close br-panel">
        <blockquote className="br-quote">
          <p>{q.text}</p>
          <footer className="br-mono">{q.by}</footer>
        </blockquote>
        <div className="br-cta">
          <div>
            <span className="br-mono br-cta-k">{cta.kicker}</span>
            <p className="br-cta-text">{cta.text}</p>
          </div>
          <div className="br-contact">
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            <a href={site}>{BRAND.domain}</a>
          </div>
          <a className="br-qr" href={site}><img src={BROCHURE.qr} alt={`QR code for ${BRAND.domain}`} /></a>
        </div>
      </section>
    </>
  );
}
