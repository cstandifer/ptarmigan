// The stand-in ptarmigan: a few simple shapes, walked with the keyboard.
// It follows the ground and stays on the slope.

import * as THREE from 'three';

function buildBird() {
  const bird = new THREE.Group();
  const plumage = new THREE.MeshLambertMaterial({ color: '#e9e4da' });
  const dark = new THREE.MeshLambertMaterial({ color: '#2a2622' });
  const red = new THREE.MeshLambertMaterial({ color: '#c8322a' });

  const body = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), plumage);
  body.scale.set(1, 0.8, 1.3);
  body.position.y = 1;

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 10), plumage);
  head.position.set(0, 1.7, 1);

  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 6), dark);
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 1.65, 1.55);

  // The red comb above the eye.
  const comb = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.25), red);
  comb.position.set(0, 2.05, 1.05);

  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.2, 0.5), dark);
  tail.position.set(0, 1.1, -1.3);

  bird.add(body, head, beak, comb, tail);
  return bird;
}

export function createBird(config, slope) {
  const mesh = buildBird();
  const keys = new Set();
  let heading = Math.PI; // facing uphill at the start
  let stepPhase = 0;

  // Ignore keys while the year slider has focus, so arrows don't move both.
  window.addEventListener('keydown', (e) => { if (e.target.tagName !== 'INPUT') keys.add(e.code); });
  window.addEventListener('keyup', (e) => keys.delete(e.code));
  window.addEventListener('blur', () => keys.clear());

  const pressed = (...codes) => codes.some((c) => keys.has(c));

  // Start low on the slope, in the middle.
  mesh.position.set(0, 0, slope.depth * 0.3);

  function update(dt) {
    const turn = (pressed('ArrowLeft', 'KeyA') ? 1 : 0) - (pressed('ArrowRight', 'KeyD') ? 1 : 0);
    const move = (pressed('ArrowUp', 'KeyW') ? 1 : 0) - (pressed('ArrowDown', 'KeyS') ? 1 : 0);
    const speed = pressed('ShiftLeft', 'ShiftRight') ? config.birdRunSpeed : config.birdWalkSpeed;

    heading += turn * config.birdTurnSpeed * dt;
    const x = mesh.position.x + Math.sin(heading) * move * speed * dt;
    const z = mesh.position.z + Math.cos(heading) * move * speed * dt;

    // Stay on the slope.
    const marginX = slope.width / 2 - 2;
    const marginZ = slope.depth / 2 - 2;
    mesh.position.x = THREE.MathUtils.clamp(x, -marginX, marginX);
    mesh.position.z = THREE.MathUtils.clamp(z, -marginZ, marginZ);

    // A small bob while walking.
    stepPhase += Math.abs(move) * speed * dt * 0.8;
    const bob = move !== 0 ? Math.abs(Math.sin(stepPhase)) * 0.25 : 0;

    mesh.position.y = slope.heightAt(mesh.position.x, mesh.position.z) + bob;
    mesh.rotation.y = heading;
  }

  return { mesh, update, heading: () => heading };
}
