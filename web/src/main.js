// Starts the spike: loads the data, builds the stand-in world, and runs the loop.

import * as THREE from 'three';
import { config } from './config.js';
import { loadData, valueAt, stateAt, eventsFor, metaNumber } from './data.js';
import { createSlope } from './slope.js';
import { createTrees } from './trees.js';
import { createMassif, createSurroundings } from './massif.js';
import { createTrail } from './trail.js';
import { createTraces } from './traces.js';
import { createBird } from './bird.js';
import { createFollowCamera } from './camera.js';
import { createClock } from './clock.js';
import { renderPanel, renderClock, showEvent } from './hud.js';

const data = await loadData(config.dataUrl);
const meta = data.meta;

// Height 0 on the slope is meta.elevation_offset_m in meters.
const offset = metaNumber(data, 'elevation_offset_m');
const top = metaNumber(data, 'slope_top_m');
const toMeters = (y) => offset + y * config.metersPerUnit;
const riseUnits = (top - offset) / config.metersPerUnit;

// Scene, light and sky.
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#c9d6df');
scene.fog = new THREE.Fog('#c9d6df', 160, 600);
scene.add(new THREE.HemisphereLight('#eef4ff', '#5a5448', 1.1));
const sun = new THREE.DirectionalLight('#fff6e8', 1.4);
sun.position.set(-80, 200, 120);
scene.add(sun);

// Stand-in world.
const slope = createSlope(config, riseUnits);
const trees = createTrees(config, slope, toMeters);
const bird = createBird(config, slope);
scene.add(slope.mesh, trees.mesh, bird.mesh);

// Human traces: the trail and the buildings beside it. No people.
const trail = createTrail(slope);
scene.add(trail.group, createTraces(slope, trail));

// Stand-in Mont Blanc range and glacier, rising above the top of the slope.
const massif = createMassif({
  width: 1400,
  depth: 500,
  peakHeight: 220,
  baseY: riseUnits - 5,
  frontZ: -slope.depth / 2 + 5,
});
scene.add(massif);

// Stand-in valley floor below the slope.
const valley = new THREE.Mesh(
  new THREE.PlaneGeometry(1400, 900).rotateX(-Math.PI / 2),
  new THREE.MeshLambertMaterial({ color: '#4d6040' }),
);
valley.position.set(0, -2, slope.depth / 2 + 440);
scene.add(valley);

// Stand-in hillside on both sides of the bird's slope, so it sits in a mountainside, not alone.
scene.add(createSurroundings(slope, 1400, riseUnits));

// Marker that shows where the bird is when zoomed out.
const marker = new THREE.Mesh(
  new THREE.RingGeometry(1.6, 2.2, 32).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial({ color: '#d1301f', transparent: true, depthTest: false }),
);
marker.renderOrder = 10;
scene.add(marker);
const youLabel = document.getElementById('you-label');

// Wide view: from high above the valley, looking up at the slope and the range.
const wideView = {
  position: new THREE.Vector3(0, 240, slope.depth / 2 + 460),
  target: new THREE.Vector3(0, 150, -slope.depth / 2 - 120),
};
const view = createFollowCamera(window.innerWidth / window.innerHeight, wideView);

// Opening shot: hold on the wide view, then glide down to the bird.
// The clock waits until the camera has landed.
const openingHoldSeconds = 2.5;
let openingDone = false;
setTimeout(() => view.setZoomGoal(0), openingHoldSeconds * 1000);

// Zoom any time: scroll or trackpad, or Z to jump between wide and close.
window.addEventListener('wheel', (e) => {
  e.preventDefault();
  view.setZoomGoal(view.zoomGoal() + e.deltaY * 0.0015);
}, { passive: false });
window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyZ' && e.target.tagName !== 'INPUT') view.setZoomGoal(view.zoomGoal() > 0.5 ? 0 : 1);
});

// Clock and the future choice.
const dialog = document.getElementById('future-choice');
const clock = createClock({
  firstYear: meta.first_year,
  lastYear: meta.last_year,
  todayYear: meta.today_year,
  yearsPerMinute: config.yearsPerMinute,
  onNeedFuture: () => { if (!dialog.open) dialog.showModal(); },
});
clock.state.playing = false;

document.getElementById('future-buttons').innerHTML = Object.entries(meta.futures)
  .map(([key, f]) => `<button type="button" data-future="${key}">${f.label}<small>${f.pathway}</small></button>`)
  .join('');
document.getElementById('future-buttons').addEventListener('click', (e) => {
  const button = e.target.closest('button[data-future]');
  if (!button) return;
  clock.chooseFuture(button.dataset.future);
  dialog.close();
});
// Escape closes the dialog without a choice; keep asking.
dialog.addEventListener('cancel', (e) => e.preventDefault());

const slider = document.getElementById('year-slider');
slider.min = meta.first_year;
slider.max = meta.last_year;
slider.addEventListener('input', () => clock.setYear(Number(slider.value)));
document.getElementById('play').addEventListener('click', () => clock.togglePlay());
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target === document.body) { e.preventDefault(); clock.togglePlay(); }
});

// Read every field for a year. Repaint only when the numbers change.
function valuesFor(year, future) {
  return {
    treeline: valueAt(data, 'treeline_m', year, future),
    snowline: valueAt(data, 'snowline_m', year, future),
    bandLow: valueAt(data, 'habitat_band_low_m', year, future),
    bandHigh: valueAt(data, 'habitat_band_high_m', year, future),
    trail: stateAt(data, 'trail_condition', year, future),
  };
}

let lastPainted = '';
function updateWorld(values) {
  const key = Object.values(values).map((v) => (typeof v.value === 'number' ? Math.round(v.value) : v.value)).join('|');
  if (key === lastPainted) return;
  lastPainted = key;
  slope.paint({
    treeline: values.treeline.value,
    snowline: values.snowline.value,
    bandLow: values.bandLow.value,
    bandHigh: values.bandHigh.value,
  }, toMeters);
  trees.update(values.treeline.value);
  trail.show(values.trail.value);
}

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  view.camera.aspect = window.innerWidth / window.innerHeight;
  view.camera.updateProjectionMatrix();
});

// Main loop.
const timer = new THREE.Clock();
bird.update(0);
view.snap(bird.mesh, bird.heading());

let lastYear = meta.first_year - 1;

function frame() {
  const dt = Math.min(timer.getDelta(), 0.1);
  clock.tick(dt);
  bird.update(dt);
  view.update(bird.mesh, bird.heading(), dt);

  // Start the clock once the opening shot has landed on the bird.
  if (!openingDone && view.zoom() < 0.05) {
    openingDone = true;
    clock.state.playing = true;
  }

  // Thin the haze when zoomed out, so the range shows.
  const z = view.zoom();
  scene.fog.near = THREE.MathUtils.lerp(160, 700, z);
  scene.fog.far = THREE.MathUtils.lerp(600, 3000, z);

  // Ring and "You" label grow in as the camera pulls back.
  marker.position.copy(bird.mesh.position).y += 0.3;
  marker.scale.setScalar(1 + z * 6);
  marker.material.opacity = z;
  const onScreen = bird.mesh.position.clone().project(view.camera);
  youLabel.style.opacity = z > 0.2 ? 1 : 0;
  youLabel.style.left = `${(onScreen.x * 0.5 + 0.5) * window.innerWidth}px`;
  youLabel.style.top = `${(-onScreen.y * 0.5 + 0.5) * window.innerHeight}px`;

  const { year, future, playing } = clock.state;
  const values = valuesFor(year, future);
  updateWorld(values);

  // History markers: show the latest event the clock just passed.
  const passed = eventsFor(data, future).filter((e) => e.year > lastYear && e.year <= year);
  if (passed.length) showEvent(passed[passed.length - 1]);
  lastYear = year;

  renderPanel({
    year,
    futureLabel: future ? `${meta.futures[future].label}, ${meta.futures[future].pathway}` : '',
    values,
    birdMeters: toMeters(slope.heightAt(bird.mesh.position.x, bird.mesh.position.z)),
  });
  renderClock({ year, playing, first: meta.first_year, last: meta.last_year, today: meta.today_year, future });

  renderer.render(scene, view.camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
