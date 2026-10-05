/* Parts the brochure's product spreads share. Each page keeps its own
   class prefix (p5-, pcod-, pstu-, …) so its stylesheet still applies;
   these only stop the markup from being written out on every page. */

/* The strip of figures along the foot of a page. A stat's `sub` is
   shown after an arrow; `sep` names the divider class (-div or -rule). */
export function StatStrip({ p, stats, sep = "div" }) {
  return (
    <div className={`${p}-stats`}>
      {stats.map(({ num, sub, cap }, i) => (
        <div key={cap} className={`${p}-stat`}>
          <div className={`${p}-stat-num`}>
            {num}
            {sub && <span className={`${p}-stat-sub`}>→ {sub}</span>}
          </div>
          <div className={`${p}-stat-cap`}>{cap}</div>
          {i < stats.length - 1 && <div className={`${p}-stat-${sep}`} />}
        </div>
      ))}
    </div>
  );
}

/* Rubric rows: a tick (✓ met, ~ partly), the criterion, the marks.
   `row` is the row class prefix, e.g. "p5-rub" for p5-rub-row. */
export function Rubric({ className, row, items }) {
  return (
    <div className={className}>
      {items.map(({ state, label, score }) => (
        <div key={label} className={`${row}-row`}>
          <span className={`${row}-tick`} data-state={state}>
            {state === "ok" ? "✓" : "~"}
          </span>
          <span className={`${row}-label`}>{label}</span>
          <span className={`${row}-score`}>{score}</span>
        </div>
      ))}
    </div>
  );
}

/* The footer of a mock screen: a note on the left, the score on the right. */
export function ScoreFoot({ base, note, score }) {
  return (
    <div className={`${base}-foot`}>
      <span className={`${base}-foot-l`}>{note}</span>
      <span className={`${base}-foot-r`}>
        <span>Score</span>
        <strong>{score}</strong>
      </span>
    </div>
  );
}

/* The column beside a mock: numbered steps, then bullets. */
export function SideNotes({ p, steps, bullets }) {
  return (
    <aside className={`${p}-side`}>
      <div className={`${p}-side-block`}>
        <div className="caption">{steps.caption}</div>
        <ol className={`${p}-steps`}>
          {steps.items.map(([title, body]) => (
            <li key={title}>
              <strong>{title}</strong>
              <span>{body}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={`${p}-side-block`}>
        <div className="caption">{bullets.caption}</div>
        <ul className={`${p}-bullets`}>
          {bullets.items.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
