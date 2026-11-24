# Ptarmigan: project brief

Read this first in every session, then `docs/decisions.md`. When the two disagree, the decision log wins.

## The project
> Out of date (2026-11-23): the timeline is now 1850 to 2100, human impact is the main story, and UTMB is a small marker. See `docs/decisions.md`. **Caitlin:** rewrite this paragraph.

An explorable 3D world where you become a rock ptarmigan living on a slope above Chamonix. You walk your home ground through the years, from the first UTMB in 2003 to today, then into the 2050 and 2090 forecasts. As the treeline climbs and the snow retreats, your world gets smaller. The race is only the clock: runners have circled Mont Blanc every summer since 2003, and this shows what changed for the bird in that time.

- Class: Hello World (The Logic of Interaction), SVA Interaction Design MFA
- Course brief: https://course-production-b83a.up.railway.app/portal/#course/week/10/notes
- Final project brief: https://course-production-b83a.up.railway.app/portal/#course/final-project
- Home ground: Col de Balme (2,191 m), with the Mont Blanc range and the Glacier du Tour in view. Bird data from other sites keeps its own place name.

## Dates
| Date | Milestone |
|---|---|
| Nov 23 | Proposal and spike |
| Nov 30 | Prototype |
| Dec 7 | Dry run |
| Dec 14 | Final presentation |

## Working modes
Read `docs/modes/README.md`. Director is the default; the other modes are research-first, reviewer, scribe, orchestrator and tutor (light, off by default).

**Standing rule:** before any work, give Caitlin a short overview and wait for her explicit OK. This covers small changes too. Pushes and tag moves need their own OK.

## Who decides what
Caitlin is the director. She owns the story, the look, the voice and every approval. Agents propose and build; they do not make creative decisions on her behalf. When in doubt, ask her.

Approval gates (stop and show her before moving on):
1. After the data comes in (`data/data.json` and `data/methods.md`)
2. After the first world blockout (`world/exports/`)
3. After each playable build (`web/`)

Before each gate, run the `checker` and `code-reviewer` agents.

The spike (Nov 23) is the one exception: run the `checker` only, so labels and placeholders get checked. The code review starts with the prototype.

## The team (agents live in `.claude/agents/`)
| Agent | Owns | Writes to |
|---|---|---|
| researcher | Finds and collects datasets, papers, tables | `research/findings/`, `research/sources-log.md` |
| avian-expert | Ptarmigan biology, judges bird findings | `research/reviews/avian-*.md` |
| environmental-scientist | Treeline, snow, glacier, temperature, judges environment findings | `research/reviews/environment-*.md` |
| historian | Land use, trails, trade, tourism and refuge history; judges human-history findings | `research/reviews/history-*.md` |
| data-scientist | Turns vetted facts into the shared data file | `data/data.json`, `data/methods.md` |
| world-builder | Blender: terrain, scale, props, bird model | `world/` |
| engine-developer | Three.js scene, movement, camera, year system, chapters | `web/` |
| experience-designer | Immersion, which daily tasks exist and why, pacing of slow change, onboarding, session length, ending options. The game designer reviews the moment-to-moment feel of each task | `docs/design/` |
| checker | Facts against sources, labels, runs the build | `reviews/checks/` |
| code-reviewer | Readability for a human | `reviews/code/` |


### Review seats (advisory, read only)
These seven read and give feedback in chat. They write nothing.

| Agent | Seat | Looks at |
|---|---|---|
| skeptic | Slop detector | Every visitor-facing claim against its data status and place name |
| ux-researcher | UX researcher | Testers, visitors arriving mid-loop, what people actually understand |
| visual-designer | Art director | Storyboard, HUD, habitat colors, status labels as part of the look |
| accessibility-advocate | Accessibility | Color-only cues, reduced motion, sound, the 30-second choice, keyboard play |
| privacy-ethics-officer | Privacy and ethics | Course ethics check, image credits, licenses, public repo, AI disclosure |
| producer | Production | Dates, scope, dependencies, what to cut |
| game-designer | Game design | Moment to moment as the bird: the loop inside each task, controls, feedback, game feel, the first 30 seconds. Experience designer owns the decades |

Flow: researcher finds, experts (avian, environmental, historian) interpret, data scientist structures, builders build, checker and code reviewer review, Caitlin approves.

## Shared files are the contract
Agents never depend on each other's chat output, only on these files:
- `data/data.json`: every number the scene uses. Format in `data/README.md`. The engine reads it; nothing in `web/` hard-codes a number that belongs here.
- `world/exports/terrain.glb` and `world/exports/bird.glb`: fixed file names. Year-specific changes are never baked into these models.
- `research/sources-log.md`: every source used, with link, date accessed and license.

## Honesty rules (non-negotiable)
- Every number has a source, or it is marked `missing`. Never estimate to fill a gap. A published reconstruction is not an estimate: use it, mark it `reconstructed` and name the study.
- Every value has a status: `reconstructed`, `measured`, `projected`, `scenario`, `placeholder` or `missing`. The scene shows the viewer which is which.
- Projections start at today, on the future the player chose (strong climate action or business as usual). Each is labeled with its emissions pathway and the model or study named.
- Hopeful land-use futures (trail repair, booking, protected ground) are scenarios, shown as "a possible future" and built from real precedents. The low-emissions climate on the same path is a projection (RCP2.6 or SSP1-2.6), labeled as one. Never show a scenario as a projection.
- Treeline change is part climate, part people leaving the pastures. Do not credit it to climate alone.
- A single year's weather event is not evidence of climate change. Long-term records carry the claims.
- Papers are copyrighted: take facts and numbers, cite them, do not copy text.
- Agent experts are research personas, not real experts. Real-world validation (for example, CREA Mont-Blanc in Chamonix) is a human step Caitlin takes.

## Writing rules
- No em dashes anywhere, in code comments, docs or UI text.
- Plain, warm, direct language. Nothing should read as AI-written.
- Keep docs visual and scannable: tables and short sections over long paragraphs.

## Folder map
```
.claude/agents/     agent definitions
data/               data.json, methods.md, format README
research/           findings, expert reviews, sources log
world/              Blender files and exports
web/                Three.js scene
docs/               proposal, spike write-up, handoff, decisions.md, brief-template.md, design/
reviews/            checker and code reviewer reports
```

## Open questions
- Ptarmigan elevation band on the chosen slope
- Do CREA's 2050 and 2090 habitat numbers exist publicly, which emissions pathway are they, and does CREA have historical treeline work for the massif?
- Treeline before the 1950s: no published reconstruction for Mont Blanc found. Ask CREA, keep looking, or reconstruct from the old maps ourselves (needs Caitlin's yes)? See `research/findings/timeline-span.md`.
- Do Alpine ptarmigan molt by day length, and is there research on white birds on bare ground when snow arrives late? Unverified: do not build a scene on it until checked.
- Audience: runners who know UTMB, or people who have never heard of it (Caitlin to decide)
- How much of the local treeline rise since 1850 comes from grazing ending versus warming?
