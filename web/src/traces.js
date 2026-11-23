// Stand-in human traces near the trail: a herder's stone hut in the pastures and a refuge up high.
// No people, only what they leave. Both are fixed for now; they do not change with the years.

import * as THREE from 'three';

function building({ width, depth, height, wall, roof }) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), new THREE.MeshLambertMaterial({ color: wall }));
  body.position.y = height / 2;
  const top = new THREE.Mesh(new THREE.ConeGeometry(Math.max(width, depth) * 0.75, height * 0.7, 4), new THREE.MeshLambertMaterial({ color: roof }));
  top.rotation.y = Math.PI / 4;
  top.position.y = height + height * 0.35;
  group.add(body, top);
  return group;
}

export function createTraces(slope, trail) {
  const group = new THREE.Group();

  const hut = building({ width: 3, depth: 2.4, height: 1.8, wall: '#8d8478', roof: '#5b4a3a' });
  const refuge = building({ width: 7, depth: 4, height: 3.2, wall: '#b9b1a4', roof: '#7a2e24' });

  const place = (thing, u, side) => {
    const p = trail.at(u);
    const x = p.x + side;
    thing.position.set(x, slope.heightAt(x, p.z), p.z);
    group.add(thing);
  };
  place(hut, 0.45, 7);
  place(refuge, 0.86, -10);

  return group;
}
