// Seeded irregular clouds: stable between renders without radial repetition.
export function organicNetwork(hubs, seed = 19) {
  let state = seed;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  const nodes = hubs.flatMap((hub, cluster) => Array.from({ length: hub.count }, () => {
    const u = random() + random() + random() - 1.5;
    const v = random() + random() + random() - 1.5;
    return { cluster, x: hub.x + u * hub.width + v * hub.width * .35, y: hub.y + v * hub.height, size: random() > .88 ? 2.8 : .8 + random() * 1.2 };
  }));
  const edges = [];
  const seen = new Set();
  nodes.forEach((node, i) => {
    const nearest = nodes.map((other, j) => ({ j, distance: Math.hypot((node.x - other.x) * 2, node.y - other.y) })).filter(({ j }) => j !== i).sort((a, b) => a.distance - b.distance);
    nearest.slice(0, random() > .65 ? 4 : 2).forEach(({ j }) => {
      const key = [Math.min(i, j), Math.max(i, j)].join('-');
      if (!seen.has(key)) { seen.add(key); edges.push({ a: node, b: nodes[j] }); }
    });
  });
  return { nodes, edges };
}
