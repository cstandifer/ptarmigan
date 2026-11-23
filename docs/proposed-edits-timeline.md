# Proposed edits: 1850 to 2100 timeline

**Status, 2026-11-23:** applied, except the CLAUDE.md project paragraph and the docs/proposal.md story lines, which Caitlin will write herself. The engine developer file also got the clock behavior (pause at today, stop at 2100, 10 years per minute as a starting value for Caitlin to confirm).
Revised 2026-11-23 after her calls: reconstructions fill the early years, and the future is a choice the player makes at today.
Another thread is also editing CLAUDE.md, so these go in as small targeted replacements after a fresh read, never as a rewrite of the file.

## CLAUDE.md, "The project" paragraph
Now:
> An explorable 3D world where you become a rock ptarmigan living on a slope above Chamonix. You walk your home ground through the years, from the first UTMB in 2003 to today, then into the 2050 and 2090 forecasts. As the treeline climbs and the snow retreats, your world gets smaller. The race is only the clock: runners have circled Mont Blanc every summer since 2003, and this shows what changed for the bird in that time.

Proposed:
> An explorable 3D world where you become a rock ptarmigan living on a slope above Chamonix, moving through time from 1850, when the glaciers were near their largest, to 2100. You live with what people and a warming climate do to your home ground: the glaciers pull back, the pastures empty and the forest climbs, the snow retreats, and your world gets smaller. A clock carries you forward and you can jump to any year. When you reach today, you choose which future to walk into. The first UTMB in 2003 is one marker along the way, Caitlin's own tie to the valley.

## CLAUDE.md, honesty rules
| Now | Proposed |
|---|---|
| Every number has a source, or it is marked `missing`. Never estimate to fill a gap. | Every number has a source, or it is marked `missing`. Never estimate to fill a gap. A published reconstruction is not an estimate: use it, mark it `reconstructed` and name the study. |
| Every value has a status: `measured`, `projected`, `placeholder` or `missing`. | Every value has a status: `reconstructed`, `measured`, `projected`, `scenario`, `placeholder` or `missing`. |
| Projections (2050, 2090) are labeled as projections, with the model or study named. | Projections start at today, on the path the player chose. Each is labeled with its scenario and the model or study named. |
| Hopeful futures are scenarios, labeled as such and built from real precedents. They are never shown as projections. (added by the land-use thread) | Hopeful land-use futures (trail repair, booking, protected ground) are scenarios, shown as "a possible future" and built from real precedents. The low-emissions climate on the same path is a projection (RCP2.6 or SSP1-2.6), labeled as one. Never show a scenario as a projection. |
| (new) | Treeline change is part climate, part people leaving the pastures. Do not credit it to climate alone. |

## CLAUDE.md, open questions
- Change: `Do CREA's 2050 and 2090 habitat maps or numbers exist publicly?` to `Do CREA's 2050 and 2090 habitat numbers exist publicly, which scenario are they, and does CREA have historical treeline work for the massif?`
- Add: `Treeline before the 1950s: no published reconstruction for Mont Blanc found. Ask CREA, keep looking, or reconstruct from the old maps ourselves (needs Caitlin's yes)? See research/findings/timeline-span.md.`

## The two futures (lined up with the land-use thread)
One choice at today, two paths. Each layer keeps its own label, so a hopeful path never reads as a forecast.

| Path | Climate layers (snow, temperature, treeline, glacier) | Land layers (trails, huts, booking) | Ptarmigan habitat |
|---|---|---|---|
| Strong climate action | `projected`, RCP2.6 or SSP1-2.6, study named | `scenario`, "a possible future" | `missing` until a low-emissions study is found |
| Business as usual | `projected`, RCP8.5 or SSP5-8.5, study named | Current trends, `projected` where a source exists, else `missing` | CREA numbers (S1). CREA names no pathway, only "a rise of 3 to 5 C by 2100", so the label quotes that instead of an RCP name |

## data/README.md
- Status table, add a row above `measured`:
  `| reconstructed | From a published reconstruction (tree rings, old maps, pictures, texts), study named | Clearly marked as a reconstruction |`
- The `scenario` row comes from the land-use thread; keep one wording for both.
- Rules: change `Years run 2003 to 2026, then 2050 and 2090.` to:
  `Years run 1850 to 2100. Years after today hold two values per field, one per path: "action" (strong climate action) and "usual" (business as usual), each with its emissions pathway named.`
  (This is a format change. The data scientist decides the exact shape and tells the engine developer.)

## README.md (line 3)
Now: `You become a rock ptarmigan above Chamonix and walk your shrinking world from 2003 to 2090.`
Proposed: `You become a rock ptarmigan above Chamonix and live through your shrinking world from 1850 to 2100.`

## docs/proposal.md
- The idea: same change as the CLAUDE.md project paragraph.
- Core experience, step 1: `You arrive as the bird in 1850, below glaciers that reach into the valley.` (Caitlin to confirm the opening.)
- Core experience, step 4: `At today, you choose a future: strong climate action or business as usual. Climate years after that are labeled as projections; the hopeful land changes as a possible future.`

## .claude/agents/data-scientist.md
- Line 11: `Fill the year-by-year table (1850 to 2100: reconstructed, measured, then the two paths after today; missing where nothing exists).`
- Line 33: `Flag any number whose change over the years is too small to see at the scene's scale.`

## .claude/agents/engine-developer.md
- Line 11: update the status list: `(reconstructed, measured, projected, scenario, placeholder)`.
- Add: the clock pauses at today and asks the player to choose a future; scrubbing back and running forward asks again. The scene shows `reconstructed` differently from `measured` and `projected`, never by color alone.

## data/data.json
Needs the new year range and status. Only the data scientist writes it, after the edits above are approved. Not tonight: the spike keeps its current file.
