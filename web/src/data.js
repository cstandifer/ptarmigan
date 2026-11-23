// Loads data/data.json and answers "what is this field in this year, on this future?"

export async function loadData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load ${url}`);
  const data = await response.json();
  data.years.sort((a, b) => a.year - b.year);
  return data;
}

// One entry for a field in one listed year, picking the future if the year is after today.
function entryFor(yearRow, field, future, todayYear) {
  const cell = yearRow[field];
  if (!cell) return null;
  if (yearRow.year > todayYear) return future ? cell[future] : null;
  return cell;
}

// Value of a field at any year. Blends straight-line between the two listed years around it.
// Returns { value, status }. A blended value keeps the status of its neighbors.
export function valueAt(data, field, year, future) {
  const today = data.meta.today_year;
  const rows = data.years;

  let before = rows[0];
  let after = rows[rows.length - 1];
  for (const row of rows) {
    if (row.year <= year) before = row;
    if (row.year >= year) { after = row; break; }
  }

  const a = entryFor(before, field, future, today);
  const b = entryFor(after, field, future, today);
  if (!a || !b || a.value === null || b.value === null) {
    return { value: null, status: 'missing' };
  }

  const span = after.year - before.year;
  const t = span === 0 ? 0 : (year - before.year) / span;
  const value = a.value + (b.value - a.value) * t;
  const status = a.status === b.status ? a.status : `${a.status} / ${b.status}`;
  return { value, status };
}

// A plain number in meters from a meta entry like { value, status }.
export function metaNumber(data, key) {
  const entry = data.meta[key];
  return typeof entry === 'object' && entry !== null ? entry.value : entry;
}

// Value of a field that holds a state, not a number (like trail_condition).
// Steps, never blends: each listed year holds until the next one.
export function stateAt(data, field, year, future) {
  const today = data.meta.today_year;
  let row = null;
  for (const r of data.years) if (r.year <= year) row = r;
  const entry = row && entryFor(row, field, future, today);
  if (!entry || entry.value === null) return { value: null, status: 'missing' };
  return { value: entry.value, status: entry.status };
}

// Events that belong on the chosen path, in year order.
export function eventsFor(data, future) {
  return (data.events || [])
    .filter((e) => e.path === 'both' || e.path === future)
    .sort((a, b) => a.year - b.year);
}
