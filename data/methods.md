# Methods

## Spike mode (2026-11-23)

Every number in `data.json` right now is a spike stand-in. None of it is real data.

| Field | What it holds | Status | Why these numbers |
|---|---|---|---|
| `treeline_m` | Height of the treeline | `placeholder` | Round hundreds, chosen so the change is easy to see on the stand-in slope |
| `snowline_m` | Height of the snowline | `placeholder` | Same |
| `habitat_band_low_m` | Lowest height the bird uses | `placeholder` | Sits 100 m above the stand-in treeline |
| `habitat_band_high_m` | Highest height the bird uses | `placeholder` | Top of the stand-in slope |
| `habitat_share` | Share of habitat left | `missing` | Left empty on purpose so the scene does not imply a real loss figure |
| `meta.elevation_offset_m` | What height 0 on the stand-in slope means in meters | `placeholder` | Matches the stand-in slope (1800 m to 3200 m) |

### Shape for the two futures
Years up to `meta.today_year` hold one value per field:

```json
"treeline_m": { "value": 2100, "status": "placeholder", "sources": [] }
```

Years after today hold one value per future, keyed by the names in `meta.futures`:

```json
"treeline_m": {
  "action": { "value": 2100, "status": "placeholder", "sources": [] },
  "usual":  { "value": 2200, "status": "placeholder", "sources": [] }
}
```

`meta.futures` names each future and its emissions pathway. The pathways are not sourced yet.

### Between listed years
The scene blends linearly between the listed years. A blended value keeps the status of the two values around it (here, `placeholder`). When real data arrives, any blending method gets written up here before use.

### Replacing the placeholders
When vetted facts arrive, replace each placeholder and list what changed in a table below.

| Date | Field and year | Old | New | Source |
|---|---|---|---|---|

## Human-impact layer (added 2026-11-23, spike)

| Field | What it holds | Status | Notes |
|---|---|---|---|
| `trail_condition` | Look of the trail: `single`, `widened`, `braided`, `restored` | `placeholder`, and `scenario` for `restored` on the strong-action future | Visual state only. No measured TMB trail data exists. Steps, not blended: each listed year holds until the next. |
| `events` | Dated history markers: `year`, `label`, `sources`, `status`, `path` | `measured` for the past, `projected` for the planned 2027 booking rule | From `research/reviews/history-2026-11-23.md`. Labels are drafts for Caitlin. First UTMB (2003) left out until it has a source. |

Not added yet, per the land-use handoff: `glacier_front_m`, `grazing_presence`, hiker counts, ptarmigan counts.
