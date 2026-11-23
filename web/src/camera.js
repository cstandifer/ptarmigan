// Third-person camera that can pull back to a wide view of the whole range.
// zoom 0 is close behind the bird; zoom 1 is the wide valley view.

import * as THREE from 'three';

export function createFollowCamera(aspect, wideView) {
  const camera = new THREE.PerspectiveCamera(55, aspect, 0.5, 4000);
  const close = new THREE.Vector3();
  const closeTarget = new THREE.Vector3();
  const target = new THREE.Vector3();
  const wanted = new THREE.Vector3();

  const behind = 22;
  const above = 16;
  const lookAhead = 8;
  const ease = 4;
  const zoomEase = 1.6;

  let zoom = 1;        // start wide, for the opening shot
  let zoomGoal = 1;

  function update(bird, heading, dt) {
    zoom += (zoomGoal - zoom) * (1 - Math.exp(-zoomEase * dt));

    wanted.set(
      bird.position.x - Math.sin(heading) * behind,
      bird.position.y + above,
      bird.position.z - Math.cos(heading) * behind,
    );
    close.lerp(wanted, 1 - Math.exp(-ease * dt));
    closeTarget.set(
      bird.position.x + Math.sin(heading) * lookAhead,
      bird.position.y + 2,
      bird.position.z + Math.cos(heading) * lookAhead,
    );

    // Smooth blend between the close and wide poses.
    const t = THREE.MathUtils.smootherstep(zoom, 0, 1);
    camera.position.lerpVectors(close, wideView.position, t);
    target.lerpVectors(closeTarget, wideView.target, t);
    camera.lookAt(target);
  }

  function snap(bird, heading) {
    close.set(
      bird.position.x - Math.sin(heading) * behind,
      bird.position.y + above,
      bird.position.z - Math.cos(heading) * behind,
    );
    update(bird, heading, 0);
  }

  return {
    camera,
    update,
    snap,
    zoom: () => zoom,
    setZoomGoal: (z) => { zoomGoal = THREE.MathUtils.clamp(z, 0, 1); },
    zoomGoal: () => zoomGoal,
  };
}
