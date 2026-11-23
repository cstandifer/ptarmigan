# Timeline span, labels and clock pacing

Researched 2026-11-23, updated the same day with reconstructions and the choice at today. Source IDs point to `research/sources-log.md`. Nothing here is vetted yet: the environmental scientist and avian expert still need to review it before any of it reaches `data.json`.

## The short version
| Question | Answer |
|---|---|
| Where does the timeline start? | **1850.** The Mer de Glace was at its Little Ice Age maximum around then, and glacier length and Alpine temperature records already exist. |
| Where does it end? | **2100.** Almost every climate and snow projection ends there. The ptarmigan habitat projection (CREA) stops at 2090. |
| What do we know about 1850? | Glaciers (local, reconstructed from 1570) and snow (regional, reconstructed from 1400). Treeline and habitat before 1950 have no published reconstruction for Mont Blanc yet. |
| How to show projections? | When the clock reaches today, the player chooses a low or high emissions future. (Caitlin's call.) |
| Pacing | **10 years per minute** (6 seconds a year), constant. Full run 25 minutes; scrubbing covers the rest. |

## 1. When each layer starts and ends

### Measured (observed) records
| Layer | Earliest usable | Last year | Local to Mont Blanc? | Source |
|---|---|---|---|---|
| Glacier length (Mer de Glace) | 1825 | 2024 | Yes | S9 |
| Glacier mass balance (Mer de Glace) | 1968 | 2025 | Yes | S9 |
| Temperature (Alps-wide) | 1760 | present | Regional grid, not the slope | S10, S13 |
| Snow depth, daily | 1960 | 2017 | No (Col de Porte, Chartreuse, 1325 m) | S11 |
| Snow season length | 1970 | about 2015 | Yes (Mont Blanc massif, mid-mountain) | S12 |
| Treeline | 1950s | 2017 | Yes (about +60 m since the 1950s) | S2 |
| Ptarmigan elevation | about 1984 | about 2013 | No (Swiss Alps) | S4 |
| Ptarmigan elevation | 1991 | 2020 | No (Grisons, Switzerland) | S15 |
| Ptarmigan presence by commune | possibly 1950 | 2019 | France, maybe Haute-Savoie | S17 (full report needed) |

Context only, not for the slope: Swiss treeline +10 m per decade 1972 to 2012 (S16). Glaciers across the Alps lost 30 to 40% of area and half their volume since 1850 (S12).

### Before 1950: published reconstructions (Caitlin's call, 2026-11-23)
Caitlin wants the early years filled from what scientists have reconstructed, not left blank. Here is what exists so far.

| Layer | Reconstruction found | Years | Local? | Source | Usable now? |
|---|---|---|---|---|---|
| Glaciers | Bossons length curve from pictures and texts | 1580 to 2005 | Yes, Chamonix | S40 | Yes |
| Glaciers | Mer de Glace history | 1570 to 2003 | Yes, Chamonix | S25 | Yes |
| Snow season | Juniper ring reconstruction of snow cover days | 1400 to 2018 | Italian Alps, above 2000 m | S41 | Yes, labeled regional |
| Snow days | Swiss station reconstruction | 1864 to 2009 | Swiss, 450 to 1860 m | S42 | Context only, too low |
| Temperature | HISTALP homogenized series | 1760 on | Alps grid | S10 | Yes |
| Treeline | **None published for Mont Blanc yet** | | | | No |
| Ptarmigan habitat | **None published** | | | | No |

What exists for treeline, but has not been turned into a number by anyone I found:
- Historical maps: the mappe sarde (1730), the Etat-Major map (19th century), Plan Lachat (1920), IGN (1935) (S44, S45).
- Photos of the Chamonix valley from 1912 to 1913 (Archives departementales 74, S44).
- A published method that does exactly this from the 1851 map, in the Pyrenees (S43).

**The treeline story is also a human story.** Farming in the Mont Blanc valleys peaked in the late 19th and early 20th century, then pastures were abandoned and the forest came back (S44, S45). In the Pyrenees the forest line rose 123 m from 1851 to 1993, driven by both warming and the end of grazing (S43). So part of the treeline climb the bird lives through is people leaving the high pastures, not only warming. That fits Caitlin's human impact focus, and it means the scene should not say the treeline rose because of climate alone. (Gehrig-Fasel et al. 2007, already on the to-get list, measures this split for the Swiss Alps.)

Ways to fill the treeline and habitat gap, in order of preference:
| Option | What it means | Status label |
|---|---|---|
| 1. Ask CREA Mont-Blanc | They may already have historical treeline work for the massif | `reconstructed`, if they share it |
| 2. Find a thesis or regional study | A 2025 thesis on subalpine forest change in France came up but did not load; worth a second look | `reconstructed` |
| 3. Reconstruct it ourselves from the old maps, with the Pyrenees method | Real evidence, but our own reading of it, with the method written in `methods.md` and reviewed by the environmental scientist | `reconstructed`, method named as ours |
| 4. Habitat band from treeline plus snow | Only once both layers exist; the avian expert sets the method | `reconstructed` |

Option 3 needs Caitlin's yes, because it bends the "never estimate" rule: the evidence is published, but the number would be ours.

### Projections
| Layer | Scenarios | End year | Source |
|---|---|---|---|
| Ptarmigan habitat, Mont Blanc | No pathway named; the post says "3 to 5 C by 2100", which fits business as usual, not strong action. Models not named; possibly Novoa et al. 2014 (ONCFS report). Ask CREA. | 2050, 2090 | S1 |
| Snow, French Alps (1500 m) | RCP2.6, RCP4.5, RCP8.5 (EURO-CORDEX) | 2100 | S14 |
| Snow below 2000 m, Alps | RCP8.5 given (about -25% by 2050, -80 to 90% by 2100) | 2100 | S13 |
| Temperature, Alps | Middle scenario +3.3 C by 2100; range 3 to 6 C above pre-industrial for 2070 to 2100 | 2100 | S12, S13 |
| Mer de Glace length | Projection exists (Nussbaumer et al. 2007, AD 1500 to 2050) | 2050 | Not yet read; to log |
| Treeline, Mont Blanc | None found yet | | Gap |

Gaps to fill next: a treeline projection, the scenario behind CREA's ptarmigan numbers, and a Mont Blanc snow projection at ptarmigan elevations (about 2000 to 2800 m). The newer CMIP6 scenarios (SSP1-2.6, SSP2-4.5, SSP5-8.5) also run to 2100 and could replace the RCPs if the experts prefer them.

## 2. Marking measured vs projected


| Element | Reconstructed | Measured | Projected | Missing |
|---|---|---|---|---|
| Year readout | "1872, reconstructed" | "1987" | "2061, projection (high emissions, EURO-CORDEX)" | |
| Treeline and snow edge in the world | Faint, sketched edge | Solid edge | Dashed or flickering edge | Not drawn, small "no record" marker |
| Timeline bar | Dotted segment | Solid segment | Hatched, splits in two at today | Gap |
| Layer legend (small, always on) | "Reconstructed" plus study | Status word | "Projection" plus study | "No record yet" |

Rules:
- Never color alone. Pair every color with a word or pattern (accessibility check in the proposal).
- Interpolated years between two measurements look the same as measured, with a note on hover or tap, as the data README already says.
- Each layer changes status in its own year (treeline measured from the 1950s, glacier measured until 2024), so the legend is per layer.
- **The choice at today (Caitlin's call):** when the clock reaches the present, it pauses and the player picks strong climate action or business as usual. On the action path the climate layers are a real low-emissions projection (`projected`), and the land changes from the land-use thread are `scenario` ("a possible future"). See the two-futures table in `docs/proposed-edits-timeline.md`. Scrubbing back before today and running forward brings the choice up again. Suggested scenarios: RCP2.6 or SSP1-2.6 (low) and RCP8.5 or SSP5-8.5 (high), since the snow study (S14) and the Alps review (S13) report both ends. CREA's ptarmigan numbers (S1) assume 3 to 5 C of warming by 2100, so they belong on the business as usual path. No low-emissions ptarmigan projection has been found, so the bird's strong-action future stays `missing` for now.

## 3. Pacing

| Rate | Seconds per year | Full run, 1850 to 2100 | 3 minute demo covers |
|---|---|---|---|
| 1 year per minute | 60 | 4 hr 10 min | 3 years |
| 5 years per minute | 12 | 50 min | 15 years |
| **10 years per minute** | **6** | **25 min** | **30 years** |
| 20 years per minute | 3 | 12.5 min | 60 years |

Recommendation: **10 years per minute, constant.**
- Constant is the honest choice. If the clock slows in the recent decades, the change looks slower than it is. At a steady pace, the speed-up since the 1980s is something the player sees for real (about 0.3 to 0.5 C per decade since then, S12, S13).
- 6 seconds a year is long enough to notice the treeline move while walking, short enough that a decade passes in a minute.
- Scrubbing covers the long run time. A viewer jumps to 1850, 2003 or 2050 and the clock runs from there, as Caitlin described.
- At 2100 the clock stops. It should not loop back to 1850, because a loop reads as the world recovering.
- Optional: a fast-forward button (for example 4x) for the presentation. The pace is a design setting in the engine, not a fact, so it does not belong in `data.json`.

## Markers on the timeline
| Year | Marker | Status |
|---|---|---|
| 1850s | Little Ice Age ends; Bossons near its last big maximum in 1854 (peak 1818) | Reconstructed (S40) |
| Late 1800s to 1900s | Farming peaks, then high pastures are abandoned | Reconstructed (S44, S45) |
| 1950s | First treeline record | Measured (S2) |
| 2003 | First UTMB (Caitlin's personal marker) | Fact, source to log |
| Today | The player chooses a low or high emissions future | |
| 2050, 2090 | CREA habitat projections | Projected (S1) |
| 2100 | End | |

Human impact markers (tourism, railways, cable cars, the tunnel, the 1924 Winter Olympics) could sit here too. None are researched or logged yet; the researcher should find and source them before they go on screen.
