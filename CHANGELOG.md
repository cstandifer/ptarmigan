# Changelog

What changed and why, in plain language. Newest first. One line per change; the git commit has the details.

## 2026-11-23
- Class checks from the week 11 kit: `checks/check.mjs` (6 checks, all pass), a `pre-push` hook that blocks pushes with uncommitted work or failing checks, and a GitHub workflow that runs the checks on every push. `.env` added to `.gitignore`; README now has a `## Process and evidence` section over the spike record. Removed leftover `docs/agents-staging/`.
- Branch rule in `CLAUDE.md` and `docs/decisions.md`: big or risky changes go on short branches and merge into main when Caitlin says they are good; small edits go straight to main. Week 11 class kit copied to `course/` (ignored by Git, course material).
- Added working modes (`docs/modes/`) and the standing rule in `CLAUDE.md`: an overview and Caitlin's OK before any work.
- Added seven advisory review seat agents (skeptic, UX researcher, visual designer, accessibility, privacy and ethics, producer, game designer). The experience designer now hands moment-to-moment feel to the game designer.
- Added `docs/decisions.md`, this changelog and `docs/brief-template.md`, so every change is easy to follow.
- Added the experience designer agent.
- Engine developer rules: the scene now loops back to 1850, a visitor picks the future at 2026 (or it alternates), and the timeline is less visible. Pace 5 years per minute. Not built yet.
- `CLAUDE.md`: home ground set to Col de Balme, team table and folder map updated, and a pointer to the decision log. The project paragraph is out of date and marked for Caitlin to rewrite.
- README: proposal, audience, testers, storyboard, spike results and support needs filled in. Tagged `hello-world-week10` for the Nov 23 milestone.
- Spike scene (`web/`): stand-in slope, bird, mountains and glacier; opening zoom-out; trail, hut, refuge; sourced history markers; clock at 5 years per minute. Every height is a placeholder.
- Checker report for the spike: pass, no blockers (`reviews/checks/2026-11-23.md`).
- Research: Col de Balme findings and sources S52 to S55.
