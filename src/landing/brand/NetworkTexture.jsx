import './network-texture.css';
import { organicNetwork } from './organicNetwork';

const HUBS = [
  { x: 8, y: 28, count: 38, width: 14, height: 27 },
  { x: 27, y: 74, count: 21, width: 18, height: 16 },
  { x: 46, y: 37, count: 57, width: 20, height: 29 },
  { x: 68, y: 19, count: 25, width: 12, height: 18 },
  { x: 83, y: 69, count: 46, width: 19, height: 30 },
  { x: 103, y: 35, count: 19, width: 15, height: 16 },
];
const NETWORK = organicNetwork(HUBS, 73);

export default function NetworkTexture({ variant = '' }) {
  return <div className={`kg-texture ${variant ? `kg-texture--${variant}` : ''}`} aria-hidden="true">
    <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" focusable="false">
      {NETWORK.edges.map(({ a, b }, i) => <path key={`edge-${i}`} d={`M${a.x * 12} ${a.y * 5}L${b.x * 12} ${b.y * 5}`} />)}
      {NETWORK.nodes.map((node, i) => <circle key={i} cx={node.x * 12} cy={node.y * 5} r={node.size} />)}
    </svg>
  </div>;
}
