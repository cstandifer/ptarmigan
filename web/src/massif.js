// Stand-in Mont Blanc range above the bird's slope, with a glacier, made in code until the real terrain exists.
// The skyline order and rough shape follow the familiar view from Chamonix, left to right.
// Heights are relative shapes for the look, not measured elevations. Labeled on screen as a stand-in.

import * as THREE from 'three';

// Each peak: where it sits across the range (0 left, 1 right), how tall compared with the
// tallest (1), and how pointed (small = needle, large = dome).
const skyline = [
  { name: 'Aiguille du Gouter', at: 0.08, tall: 0.70, width: 0.06 },
  { name: 'Dome du Gouter', at: 0.18, tall: 0.88, width: 0.08 },
  { name: 'Mont Blanc', at: 0.30, tall: 1.00, width: 0.10 },
  { name: 'Mont Maudit', at: 0.40, tall: 0.92, width: 0.05 },
  { name: 'Mont Blanc du Tacul', at: 0.48, tall: 0.86, width: 0.05 },
  { name: 'Aiguille du Midi', at: 0.56, tall: 0.72, width: 0.018 },
  { name: 'Aiguilles de Chamonix', at: 0.64, tall: 0.62, width: 0.012, needles: 5 },
  { name: 'Aiguille Verte', at: 0.84, tall: 0.80, width: 0.03 },
  { name: 'Les Drus', at: 0.89, tall: 0.70, width: 0.012 },
];

export function createMassif({ width, depth, peakHeight, baseY, frontZ }) {
  const geometry = new THREE.PlaneGeometry(width, depth, 280, 70);
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.attributes.position;
  const colorAttr = new Float32Array(positions.count * 3);

  const rock = new THREE.Color('#6f6a66');
  const forest = new THREE.Color('#33482f');
  const snow = new THREE.Color('#f2f5f8');
  const ice = new THREE.Color('#bcd3e2');
  const c = new THREE.Color();

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    const across = x / width + 0.5;
    // 0 at the valley edge, 1 at the ridge line at the back.
    const back = THREE.MathUtils.clamp((z + depth / 2) / depth, 0, 1);
    const ridge = 1 - back;

    let h = 0;
    for (const peak of skyline) {
      const count = peak.needles || 1;
      for (let n = 0; n < count; n++) {
        const at = peak.at + (n - (count - 1) / 2) * peak.width * 2.2;
        const fall = Math.exp(-Math.pow((across - at) / peak.width, 2));
        h = Math.max(h, peak.tall * fall);
      }
    }
    // A ridge that never drops to the valley between peaks.
    h = Math.max(h, 0.45 + 0.05 * Math.sin(across * 40));
    // Slopes fall toward the valley in front.
    const height = baseY + h * peakHeight * Math.pow(ridge, 0.8);
    positions.setY(i, height);

    const share = (height - baseY) / peakHeight;
    // A stand-in glacier tongue running down from below Mont Blanc toward the slope.
    const glacierCenter = THREE.MathUtils.lerp(0.5, skyline[2].at, ridge);
    const onGlacier = ridge < 0.7 && Math.abs(across - glacierCenter) < 0.02 + 0.03 * ridge;
    if (share > 0.55) c.copy(snow);
    else if (onGlacier) c.copy(ice);
    else if (share < 0.18) c.copy(forest);
    else c.copy(rock);
    c.toArray(colorAttr, i * 3);
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colorAttr, 3));
  geometry.computeVertexNormals();

  const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ vertexColors: true }));
  // Uphill from the slope: its low front edge meets the top of the slope.
  mesh.position.set(0, 0, frontZ - depth / 2);
  return mesh;
}

// Plain hillside on both sides of the bird's slope, rising the same way, a little lower
// so the bird's slope always draws on top. Fixed colors: it does not change with the years.
export function createSurroundings(slope, width, riseUnits) {
  const geometry = new THREE.PlaneGeometry(width, slope.depth, 140, 30);
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.attributes.position;
  const colorAttr = new Float32Array(positions.count * 3);
  const forest = new THREE.Color('#33482f');
  const meadow = new THREE.Color('#6f7d48');
  const rock = new THREE.Color('#7c7772');
  const c = new THREE.Color();
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    const uphill = THREE.MathUtils.clamp((slope.depth / 2 - z) / slope.depth, 0, 1);
    const ripple = Math.sin(x * 0.03) * 6 * uphill;
    // Sink well below the bird's slope where the two overlap, so they never cross.
    const underSlope = Math.abs(x) < slope.width / 2 + 2 ? 14 : 0;
    const y = Math.pow(uphill, 1.15) * riseUnits + ripple - 2 - underSlope;
    positions.setY(i, y);
    const share = (y + underSlope) / riseUnits;
    if (share < 0.25) c.copy(forest);
    else if (share < 0.6) c.copy(meadow);
    else c.copy(rock);
    c.toArray(colorAttr, i * 3);
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colorAttr, 3));
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ vertexColors: true }));
}
