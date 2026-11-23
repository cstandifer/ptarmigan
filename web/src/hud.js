// The on-screen panel: year, chosen future, each value with its status in words,
// and where the bird stands compared with its habitat band.

const rows = [
  { key: 'treeline', label: 'Treeline' },
  { key: 'snowline', label: 'Snowline' },
  { key: 'bandLow', label: 'Habitat band, bottom' },
  { key: 'bandHigh', label: 'Habitat band, top' },
  { key: 'trail', label: 'Trail' },
];

const el = (id) => document.getElementById(id);

// Scenarios are shown as "a possible future", per data/README.md.
const statusWords = (status) => (status === 'scenario' ? 'a possible future' : status);

function meters(v) {
  if (v === null) return 'unknown';
  if (typeof v === 'string') return v;
  return `${Math.round(v).toLocaleString('en-US')} m`;
}

export function renderPanel({ year, futureLabel, values, birdMeters }) {
  el('year-label').textContent = Math.floor(year);
  el('future-label').textContent = futureLabel || '';

  el('values').innerHTML = rows
    .map(({ key, label }) => {
      const { value, status } = values[key];
      return `<li><span>${label}</span><span>${meters(value)} <span class="status">${statusWords(status)}</span></span></li>`;
    })
    .join('');

  // The bird's height is read off the slope, which is a stand-in, so it carries the band's status too.
  el('bird-status').innerHTML = `${birdLine(birdMeters, values)} <span class="status">${values.bandLow.status}</span>`;
}

function birdLine(m, { treeline, bandLow, bandHigh }) {
  const here = `You are at ${meters(m)}.`;
  if (bandLow.value === null) return `${here} Habitat band unknown.`;
  if (treeline.value !== null && m < treeline.value) return `${here} In the trees. Not your ground.`;
  if (m < bandLow.value) return `${here} Below your habitat band.`;
  if (m > bandHigh.value) return `${here} Above your habitat band.`;
  return `${here} Inside your habitat band.`;
}

export function renderClock({ year, playing, first, last, today, future }) {
  const slider = el('year-slider');
  if (document.activeElement !== slider) slider.value = year;
  el('play').textContent = playing ? 'Pause' : 'Play';
  let note = '';
  if (year >= last) note = 'End of the timeline.';
  else if (Math.floor(year) === today) note = future ? 'Today.' : 'Today. Choose a future to go on.';
  else if (year > today) note = 'After today. Values follow the future you chose.';
  el('clock-note').textContent = note;
}

// A history marker that appears for a few seconds as the clock passes its year.
let eventTimer = null;
export function showEvent(event) {
  const box = el('event');
  const words = { measured: 'documented', projected: 'planned' };
  const tag = words[event.status] || event.status;
  box.innerHTML = `<strong>${event.year}</strong> ${event.label} <span class="status">${tag}</span> <small>Sources: ${event.sources.join(', ')}</small>`;
  box.classList.add('show');
  clearTimeout(eventTimer);
  eventTimer = setTimeout(() => box.classList.remove('show'), 7000);
}
