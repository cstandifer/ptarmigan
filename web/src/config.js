// Design settings. These are choices about how the scene feels, not facts.
// Facts (heights, years, statuses) live in data/data.json.

export const config = {
  dataUrl: '../data/data.json',

  // Clock pace. Caitlin set 5 years per minute on 2026-11-23.
  yearsPerMinute: 5,

  // Scene scale: one scene unit stands for this many meters, across and up.
  metersPerUnit: 10,

  // Size of the stand-in slope in scene units (across, then up the hill).
  slopeWidth: 200,
  slopeDepth: 300,
  slopeResolution: 1.25,

  // Stand-in bird. Drawn far larger than life so you can see it.
  birdWalkSpeed: 10,
  birdRunSpeed: 24,
  birdTurnSpeed: 2.2,

  // Trees on the stand-in slope.
  treeCount: 4000,
};
