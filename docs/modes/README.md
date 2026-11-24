# Working modes

How Claude works on this project. The files here are Caitlin's class working modes, saved as given. Caitlin approved adding them on 2026-11-23.

## Standing rule
Before any work, Claude gives Caitlin a short overview and waits for her explicit OK. This applies to small changes too. Pushes and tag moves need their own OK.

## When each mode is used
| Mode | When |
|---|---|
| [Director](director.md) | Default. Caitlin owns intent and design choices. Plans have at most 6 testable steps. After each step: what changed, how to check it, what stays the same, what is uncertain. |
| [Research-first](research-first.md) | Uncertain tech or data: a new library, dataset or source. Inspect and compare before building. |
| [Reviewer](reviewer.md) | Before each submission. Feedback with evidence, no edits unless Caitlin asks. |
| [Scribe](scribe.md) | Keeps `docs/decisions.md` faithful: only decisions Caitlin actually made, in her words where possible. |
| [Orchestrator](orchestrator.md) | When work runs in parallel threads or agents. Clear file ownership, results checked before they are combined. |
| [Tutor](tutor.md) | Light, and off by default. Used only when Caitlin says "explain this", "quiz me" or "tutor mode". It never withholds code unless she asks it to. |

Note: `tutor.md` mentions a reference file (`../reference/carrie-w4-tutor-mode-AGENTS.md`) that is not in this repo.
