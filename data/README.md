# data.json format

`data.json` is the single source for every number the scene uses. The engine reads it. Only the data scientist writes it.

## Shape

```json
{
  "meta": {
    "site": "Aiguilles Rouges slope near Lac Blanc",
    "updated": "2026-11-23",
    "elevation_offset_m": null,
    "notes": ""
  },
  "years": [
    {
      "year": 2003,
      "treeline_m":       { "value": null, "status": "missing", "sources": [] },
      "snowline_m":       { "value": null, "status": "missing", "sources": [] },
      "habitat_share":    { "value": null, "status": "missing", "sources": [] },
      "habitat_band_low_m":  { "value": null, "status": "missing", "sources": [] },
      "habitat_band_high_m": { "value": null, "status": "missing", "sources": [] },
      "note": ""
    }
  ],
  "facts": [
    {
      "id": "F1",
      "claim": "",
      "value": null,
      "unit": "",
      "place": "",
      "years": "",
      "status": "measured",
      "source": "S1",
      "reviewed_by": "avian-expert"
    }
  ]
}
```

## Status values
| Status | Meaning | How the scene shows it |
|---|---|---|
| `reconstructed` | From a published reconstruction (tree rings, old maps, pictures, texts), study named | Clearly marked as a reconstruction |
| `measured` | Observed in a published record | Plain |
| `measured-interpolated` | Between two measured years, method in `methods.md` | Plain, with a note |
| `projected` | From a model or forecast, study and emissions pathway named | Clearly marked as a forecast |
| `scenario` | A hopeful land-use future built from real precedents, not a forecast | Shown as "a possible future" |
| `placeholder` | Stand-in while building | Clearly marked as a placeholder |
| `missing` | Not found yet | Not shown, or shown as unknown |

## Rules
- Units live in field names: `_m` meters, `_days` days, `_share` a fraction from 0 to 1.
- Source IDs point to `research/sources-log.md`.
- Years run 1850 to 2100. Each year a layer has no record is marked `missing`.
- Years after today hold two values per field, one per future: "action" (strong climate action) and "usual" (business as usual), each with its emissions pathway named. Shape set 2026-11-23: see "Shape for the two futures" in `methods.md`. Futures and pathways are named in `meta.futures`.
- `habitat_band_low_m` and `habitat_band_high_m` are the lowest and highest elevation the ptarmigan uses on this slope that year. The avian expert vets them.
- `meta` also holds `today_year`, `first_year`, `last_year` and, for the stand-in slope, `slope_top_m`.
- Adding a field: update this file first, then tell the engine developer.

## Human-impact fields (added 2026-11-23)
- `trail_condition` per year: `single`, `widened`, `braided` or `restored`. A state, not a number: it steps, never blends. `placeholder` until measured; `restored` is `scenario`.
- `events`: top-level list of `{ "year", "label", "sources", "status", "path" }`. `path` is `both`, `action` or `usual`. See `methods.md`.
