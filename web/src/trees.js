// Stand-in trees scattered over the slope. Each year, trees below the treeline show
// and trees above it hide, so the forest edge climbs or drops with the data.

import * as THREE from 'three';

export function createTrees(config, slope, toMeters) {
  const geometry = new THREE.ConeGeometry(0.9, 3.2, 6);
  geometry.translate(0, 1.6, 0);
  const material = new THREE.MeshLambertMaterial({ color: '#24401f' });
  const mesh = new THREE.InstancedMesh(geometry, material, config.treeCount);

  // Fixed spots, scattered once. Each tree also gets a small random reach,
  // so the forest edge thins out instead of stopping at a straight line.
  const trees = [];
  for (let i = 0; i < config.treeCount; i++) {
    const x = (Math.random() - 0.5) * slope.width;
    const z = (Math.random() - 0.5) * slope.depth;
    const y = slope.heightAt(x, z);
    trees.push({ x, y, z, meters: toMeters(y), reach: Math.random(), size: 0.7 + Math.random() * 0.6 });
  }

  const matrix = new THREE.Matrix4();
  const hidden = new THREE.Matrix4().makeScale(0, 0, 0);
  const edgeDepth = config.metersPerUnit * 10;

  function update(treeline) {
    trees.forEach((tree, i) => {
      const grows = treeline !== null && tree.meters < treeline - tree.reach * edgeDepth;
      if (grows) {
        matrix.makeScale(tree.size, tree.size, tree.size).setPosition(tree.x, tree.y, tree.z);
        mesh.setMatrixAt(i, matrix);
      } else {
        mesh.setMatrixAt(i, hidden);
      }
    });
    mesh.instanceMatrix.needsUpdate = true;
  }

  return { mesh, update };
}
