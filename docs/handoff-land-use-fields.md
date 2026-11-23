# Handoff to the data scientist: land-use fields

Approved by Caitlin 2026-11-23. **Run after the Nov 23 spike.** Do not change `data.json` or `data/README.md` before the spike is done.

Per `data/README.md`: update the README first, then tell the engine developer.

## Depends on
- The timeline thread's edits are applied (2026-11-23): years 1850 to 2100, statuses `reconstructed` and `scenario`, and two values per field after today, `action` and `usual`. This handoff is unblocked.
- `scenario` is approved by Caitlin, shown to viewers as "a possible future".

## New fields
| Field | Shape | Values | Status rules | Sources |
|---|---|---|---|---|
| `events` | Top-level list of `{ "year", "label", "sources", "status", "path" }` | See the table below. `path` is `both` before today, or `action` / `usual` after today (names from `data/README.md`) | `measured` for past events; `projected` for planned policy (2027 booking); `scenario` for stewardship events in the hopeful path | `research/reviews/history-2026-11-23.md` |
| `glacier_front_m` | Per year, like `treeline_m` | Elevation of the Mer de Glace front, meters | `measured` where a source gives it; otherwise `missing`. No estimating between points without a written method | S25, S9 (WGMS length series), S40 if relevant |
| `trail_condition` | Per year | `single`, `widened`, `braided`, `restored` | Always `placeholder` with the note "visual state, no measured TMB data", except `restored` on the `action` path, which is `scenario` | S18, S20, S30, S31 (mechanism only) |

## Starting events (labels are drafts; Caitlin approves the wording)
| Year | Label draft | Sources | Status |
|---|---|---|---|
| 1821 | Chamonix guides form the Compagnie des Guides | S28 | measured |
| 1852 | Mer de Glace makes its last big advance | S25 | measured |
| 1860 | Savoy becomes part of France | S34 | measured |
| 1901 | The railway reaches Chamonix | S36 | measured |
| 1950 to 1952 | The Tour du Mont Blanc is waymarked | S24 | measured |
| 2003 | First UTMB | missing source | missing until cited |
| 2027 | French TMB towns require a booked bed or bivouac (planned) | S22, S23 | projected |

## Not now (Caitlin agreed to defer)
- `grazing_presence`: regional evidence only.
- `hiker_passages_col_bonhomme`: counts only from about 2019.
- `ptarmigan_count_jovet`: needs the reserve's full series (ask Asters-CEN74).

## Builder side (no data needed)
People appear only as traces: huts, stone walls, paths, tents, refuges. No human figures. Caitlin's call, 2026-11-23.
