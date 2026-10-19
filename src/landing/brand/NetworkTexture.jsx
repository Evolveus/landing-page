import './network-texture.css';

// A shared decorative network, kept separate from the interactive graph.
const HUBS = [[100, 85], [310, 210], [520, 65], [720, 235], [935, 85], [1130, 230]];
const NODES = HUBS.flatMap(([x, y], cluster) => Array.from({ length: 15 }, (_, i) => {
  const angle = i * 2.39996 + cluster;
  const radius = 18 + Math.sqrt(i) * 16;
  return { x: x + Math.cos(angle) * radius, y: y + Math.sin(angle) * radius * .8, cluster };
}));

export default function NetworkTexture({ variant = '' }) {
  return <div className={`kg-texture ${variant ? `kg-texture--${variant}` : ''}`} aria-hidden="true">
    <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice" focusable="false">
      {NODES.map((node, i) => {
        const hub = HUBS[node.cluster];
        const neighbor = NODES[(i + 4) % NODES.length];
        return <g key={i}><path d={`M${hub[0]} ${hub[1]}L${node.x} ${node.y}L${neighbor.x} ${neighbor.y}`} /><circle cx={node.x} cy={node.y} r={i % 5 === 0 ? 2.5 : 1.4} /></g>;
      })}
      {HUBS.map(([x, y], i) => <g className="kg-texture-hub" key={i}><circle cx={x} cy={y} r="6" /><circle cx={x} cy={y} r="13" /></g>)}
    </svg>
  </div>;
}
