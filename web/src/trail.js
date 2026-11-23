// Stand-in hiking trail across the slope. Its look follows trail_condition in data.json:
// single (one narrow path), widened, braided (several worn paths side by side),
// restored (narrow again, on the strong-action future only).

import * as THREE from 'three';

// A zigzag up the slope, as fractions of the slope's width and depth.
const route = [
  [0.15, 0.98], [0.30, 0.80], [0.70, 0.66], [0.35, 0.50],
  [0.72, 0.34], [0.40, 0.18], [0.55, 0.02],
];

const looks = {
  single: { strands: [0], width: 0.8, color: '#8a6a45' },
  widened: { strands: [0], width: 2.4, color: '#7d5e3c' },
  braided: { strands: [-2.6, 0, 2.2, 4.4], width: 1.4, color: '#6e5236' },
  restored: { strands: [0], width: 0.8, color: '#9c8466' },
};

// One flat ribbon draped on the ground along the route, shifted sideways by `offset`.
function ribbon(slope, points, offset, width, color) {
  const positions = [];
  const left = new THREE.Vector3();
  for (let i = 0; i < points.length; i++) {
    const a = points[Math.max(i - 1, 0)];
    const b = points[Math.min(i + 1, points.length - 1)];
    const dir = new THREE.Vector3(b.x - a.x, 0, b.z - a.z).normalize();
    left.set(-dir.z, 0, dir.x);
    // A slow wobble so braids wander instead of running in perfect parallel.
    const wander = offset === 0 ? 0 : Math.sin(i * 0.35 + offset) * 1.2;
    for (const side of [-1, 1]) {
      const x = points[i].x + left.x * (offset + wander + (side * width) / 2);
      const z = points[i].z + left.z * (offset + wander + (side * width) / 2);
      positions.push(x, slope.heightAt(x, z) + 0.15, z);
    }
  }
  const index = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p = i * 2;
    index.push(p, p + 1, p + 2, p + 1, p + 3, p + 2);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(index);
  geometry.computeVertexNormals();
  const material = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 });
  return new THREE.Mesh(geometry, material);
}

export function createTrail(slope) {
  // Smooth the zigzag into many close points.
  const curve = new THREE.CatmullRomCurve3(route.map(([u, v]) =>
    new THREE.Vector3((u - 0.5) * slope.width, 0, (v - 0.5) * slope.depth)));
  const points = curve.getSpacedPoints(400);

  const group = new THREE.Group();
  const versions = {};
  for (const [name, look] of Object.entries(looks)) {
    const version = new THREE.Group();
    look.strands.forEach((offset) => version.add(ribbon(slope, points, offset, look.width, look.color)));
    version.visible = false;
    versions[name] = version;
    group.add(version);
  }

  function show(condition) {
    for (const [name, version] of Object.entries(versions)) version.visible = name === condition;
  }

  // Where the trail passes, for placing the hut and refuge beside it.
  const at = (u) => curve.getPointAt(u);

  return { group, show, at };
}
