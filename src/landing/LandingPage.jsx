import { useState } from 'react';
import Design1 from './designs/Design1';
import Design2 from './designs/Design2';
import Design3 from './designs/Design3';
import Design4 from './designs/Design4';
import Design5 from './designs/Design5';
import './LandingPage.css';

const designs = [
  { id: 1, name: 'Executive' },
  { id: 2, name: 'Meridian' },
  { id: 3, name: 'Pacific' },
  { id: 4, name: 'Axiom' },
  { id: 5, name: 'Heritage' },
];

export default function LandingPage({ onBrochure }) {
  const [active, setActive] = useState(1);

  const renderDesign = () => {
    const props = { onBrochure };
    switch (active) {
      case 1: return <Design1 {...props} />;
      case 2: return <Design2 {...props} />;
      case 3: return <Design3 {...props} />;
      case 4: return <Design4 {...props} />;
      case 5: return <Design5 {...props} />;
      default: return <Design1 {...props} />;
    }
  };

  return (
    <div className="landing-shell" key={active}>
      <div className="design-switcher">
        {designs.map(d => (
          <button
            key={d.id}
            className={`switcher-btn ${active === d.id ? 'active' : ''}`}
            onClick={() => { setActive(d.id); window.scrollTo(0, 0); }}
          >
            <span className="switcher-num">{d.id}</span>
            <span className="switcher-label">{d.name}</span>
          </button>
        ))}
      </div>
      {renderDesign()}
    </div>
  );
}
