# Proposal: land use in the world (for Caitlin's approval)

Nothing here is built or written to `data/data.json`. Every item is a suggestion. Built on `research/findings/2026-11-23-land-use-history.md` and `research/reviews/environment-2026-11-23-land-use.md`.

## Story spine the evidence supports
| Era | What the bird's slope looks like | Evidence strength |
|---|---|---|
| About 1850 | Glacier tongue at the valley floor. High pastures grazed, herders' huts, a few crossing paths over the cols | Glaciers strong; grazing regional only |
| 1850 to 1950 | Grazing pulls back from the highest pastures. Guides, hotels, railway (1901) below. Paths used by climbers and visitors | Tourism strong; grazing regional |
| 1950 to 2003 | GR TMB waymarked (1950 to 1952). Hut-to-hut walking grows | Waymarking strong; growth curve missing |
| 2003 to today | UTMB (Caitlin's marker). Tens of thousands of hikers, tents, braided paths, ptarmigan broods falling at the Col du Bonhomme | Counts strong but recent; braiding qualitative |
| Future | **Scenario** (labeled): booked beds, restored paths, fenced wetlands, quiet zones for broods, alongside the CREA **projection** for habitat | Precedents real; outcome is a choice |

## Proposed data.json fields
Each needs your OK, then the data scientist adds it in the agreed format.

| Field | Example | Status today | Why |
|---|---|---|---|
| `events[]` (year, label, source_id) | 1821 glacier max; 1901 railway; 1951 GR TMB; 2027 booking rule | measured | Drives on-screen markers as the clock runs |
| `glacier_front_m` by year | about 1000 m in 1850 | measured (S25), gaps `missing` | The one land-change series that runs from 1850 |
| `hiker_passages_col_bonhomme` | 90,915 (2025) | measured, only recent years | Shows the crowd, honestly sparse |
| `ptarmigan_count_jovet` (adults, broods) | 41 adults, 0 broods (2025) | measured, 2008 onward once the series is obtained | The bird on the TMB itself |
| `grazing_presence` | yes / reduced / none | `missing` until local records found | Separates land-use from climate in the treeline |
| `trail_condition` | single / widened / braided | `placeholder` only | Visual state; no measured TMB numbers exist |
| `scenario_*` prefix for the hopeful future | `scenario_trail_restored` | `scenario` (a new status) | Keeps the future separate from projections |

The last row needs a new status value, `scenario`, which changes the format in `data/README.md` and the honesty rules. That is your call.

## Proposed for the world builder
| Asset | Notes | Source |
|---|---|---|
| Herder's stone hut and a small grazed meadow patch | Appears or fades by year from `grazing_presence` | S29 (regional), S18 |
| Footpath meshes in three states: single, widened, braided | Engine swaps by `trail_condition` | S20, S30, S31 |
| Tents and a refuge | Refuge grows across eras (shelter to large hut), using the Gouter arc as a visual guide | S27, S21 |
| Distant glacier tongue | Year-driven in the engine, never baked | S25 |
| Small figures: herder, guide, hiker | Respectful, no caricature | Historian to advise |

## What the bird could feel (engine ideas, for you to decide)
- More footsteps and voices in summer as the clock passes 2003; the bird flushes more often near the path.
- In the scenario future, paths narrow back and a quiet zone opens near brood ground.
- These are design choices, not data. Flushing behavior needs the avian expert and Imperio et al. 2013 before it is presented as fact.

## Decisions for you
1. Which fields to add (any, all, none).
2. Whether to add `scenario` as a status.
3. Whether the herder and hiker figures appear at all, or only their traces (huts, paths, tents).
