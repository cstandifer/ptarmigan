// The stand-in slope, made in code until the Blender terrain exists.
// It rises from the bottom of the stand-in range to the top, with some bumps and gullies.
// Ground color is repainted each year: forest, meadow, rock, snow, and the habitat band.

import * as THREE from 'three';

const colors = {
  forest: new THREE.Color('#2f4a2b'),
  meadow: new THREE.Color('#7f8f4e'),
  rock: new THREE.Color('#8a8580'),
  snow: new THREE.Color('#f4f7fa'),
  band: new THREE.Color('#e0a23a'),
  line: new THREE.Color('#3a2a10'),
};

export function createSlope(config, riseUnits) {
  const { slopeWidth: width, slopeDepth: depth } = config;

  // Height in scene units at any spot. z runs down the hill (negative z is uphill).
  function heightAt(x, z) {
    const uphill = THREE.MathUtils.clamp((depth / 2 - z) / depth, 0, 1);
    const base = Math.pow(uphill, 1.15) * riseUnits;
    const bumps = Math.sin(x * 0.05) * Math.cos(z * 0.04) * 4 + Math.sin(x * 0.13 + z * 0.07) * 1.5;
    const gully = -6 * Math.exp(-Math.pow((x - 30) / 14, 2)) * uphill;
    return THREE.MathUtils.clamp(base + bumps + gully, 0, riseUnits);
  }

  const segX = Math.round(width / config.slopeResolution);
  const segZ = Math.round(depth / config.slopeResolution);
  const geometry = new THREE.PlaneGeometry(width, depth, segX, segZ);
  geometry.rotateX(-Math.PI / 2);

  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    positions.setY(i, heightAt(positions.getX(i), positions.getZ(i)));
  }
  geometry.computeVertexNormals();
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(positions.count * 3), 3));

  const material = new THREE.MeshLambertMaterial({ vertexColors: true });
  const mesh = new THREE.Mesh(geometry, material);

  // Small fixed jitter per spot so the snow edge looks ragged, not ruled.
  const jitter = new Float32Array(positions.count);
  for (let i = 0; i < positions.count; i++) {
    jitter[i] = Math.sin(positions.getX(i) * 0.31) * Math.cos(positions.getZ(i) * 0.27);
  }

  // Repaint the ground for one year. Heights here are in meters.
  // toMeters turns a scene height into meters.
  function paint({ treeline, snowline, bandLow, bandHigh }, toMeters) {
    const colorAttr = geometry.attributes.color;
    const c = new THREE.Color();
    const lineWidth = config.metersPerUnit * 0.5;
    const raggedness = config.metersPerUnit * 5;

    for (let i = 0; i < positions.count; i++) {
      // Meadow turns to rock toward the top. A look choice, not data.
      const m = toMeters(positions.getY(i));
      const ragged = m + jitter[i] * raggedness;

      const isSnow = snowline !== null && ragged >= snowline;
      if (isSnow) c.copy(colors.snow);
      else if (treeline !== null && m < treeline) c.copy(colors.forest);
      else c.copy(colors.meadow).lerp(colors.rock, THREE.MathUtils.smoothstep(positions.getY(i) / riseUnits, 0.5, 0.9));

      const inBand = bandLow !== null && bandHigh !== null && m >= bandLow && m <= bandHigh;
      if (inBand && !isSnow) c.lerp(colors.band, 0.35);

      // Dark contour lines at the bottom of the habitat band and at the treeline.
      if (bandLow !== null && Math.abs(m - bandLow) < lineWidth) c.copy(colors.band).multiplyScalar(0.8);
      if (treeline !== null && Math.abs(m - treeline) < lineWidth) c.copy(colors.line);

      colorAttr.setXYZ(i, c.r, c.g, c.b);
    }
    colorAttr.needsUpdate = true;
  }

  return { mesh, heightAt, paint, width, depth };
}
