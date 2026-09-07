import '../LandingPage.css';

export const DESIGNS = [
  { id: 1, name: 'Ledger' },
  { id: 2, name: 'Signal' },
  { id: 3, name: 'Paper' },
  { id: 4, name: 'Slate' },
  { id: 5, name: 'Federal' },
  { id: 6, name: 'Antimetal' },
  { id: 7, name: 'Harvest' },
];

// Fixed pill nav shown on every design variant so a visitor can jump
// between /1 through /6. Styled via .design-switcher / .switcher-btn
// in LandingPage.css.
export function DesignSwitcher({ active, onNavigate }) {
  return (
    <div className="design-switcher">
      {DESIGNS.map((d) => (
        <button
          key={d.id}
          className={`switcher-btn ${active === d.id ? 'active' : ''}`}
          onClick={() => onNavigate(d.id)}
        >
          <span className="switcher-num">{d.id}</span>
          <span className="switcher-label">{d.name}</span>
        </button>
      ))}
    </div>
  );
}
