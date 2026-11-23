# web: the playable scene

Spike version, 2026-11-23. Stand-in slope and bird made in code. Every number comes from `data/data.json`, and right now every number there is a placeholder.

## Run it on your Mac

The page loads `data/data.json`, so it has to be served, not opened as a file.

1. Open Terminal.
2. Run:
   ```
   cd ~/Desktop/ptarmigan
   python3 -m http.server 8000
   ```
3. Open http://localhost:8000/web/ in Chrome or Safari.
4. To stop, go back to Terminal and press Control and C.

Needs an internet connection each time it loads (Three.js comes from a CDN).

## Controls

| Key | Does |
|---|---|
| Up / W | Walk forward |
| Down / S | Walk back |
| Left, Right / A, D | Turn |
| Shift | Run |
| Space | Pause or play the clock |
| Scroll, trackpad or Z | Zoom out to the whole range and back in |
| Year slider | Jump to any year. The clock keeps running from there. |

The scene opens on a wide view of the range, then glides down to the bird. The clock starts when it lands. The clock runs at 5 years per minute (set in `src/config.js`). At 2026 the clock stops and asks for a future: strong climate action or business as usual. Dragging back before 2026 clears the choice. The clock stops at 2100 and never loops.

## What you see

| On screen | Means |
|---|---|
| Dark green ground and cone trees | Below the treeline |
| Dark line on the ground | The treeline |
| Amber tint, with an amber line at its bottom | The bird's habitat band |
| White | Above the snowline |
| Brown path | The hiking trail. Its look (single, widened, braided, restored) comes from `trail_condition`, a placeholder |
| Dark box near the bottom of the screen | A dated history event from `data.json`, with its sources, shown as the clock passes its year |
| Dashed tag next to each number | That value's status, in words |
| Line under the numbers | Whether the bird is inside its band |

## Files

| File | Job |
|---|---|
| `index.html` | Page, panel and clock markup, Three.js import map (pinned to 0.160.0) |
| `style.css` | Panel, clock and banner styles |
| `src/main.js` | Starts everything and runs the loop |
| `src/config.js` | Design settings: clock pace, scene scale, walking speed. Not facts. |
| `src/data.js` | Loads `data.json` and blends values between listed years |
| `src/slope.js` | Stand-in slope and its ground colors |
| `src/trees.js` | Stand-in trees that follow the treeline |
| `src/trail.js` | Stand-in trail; single, widened, braided or restored from `trail_condition` |
| `src/traces.js` | Stand-in herder's hut and refuge (traces only, no people) |
| `src/massif.js` | Stand-in Mont Blanc range and glacier above the slope, skyline shaped after the view from Chamonix |
| `src/bird.js` | Stand-in bird and keyboard walking |
| `src/camera.js` | Third-person camera |
| `src/clock.js` | Year clock, future choice, stop at the end |
| `src/hud.js` | Panel and clock text |

## Tested

2026-11-23 in headless Chromium: loads with no console errors, the bird walks and follows the ground, dragging past 2026 stops at 2026 and asks for a future, choosing one runs on to 2100, values and status tags update. Not yet tested on Caitlin's Mac or in Safari.

## Credits

- Three.js 0.160.0 (MIT license), https://threejs.org
- No research sources yet: every number is a spike placeholder.
- Code written with AI help (Claude), directed and reviewed by Caitlin.

## Publish

Not set up. For the prototype, the folder can go on GitHub Pages or Netlify as plain files, no build step.
