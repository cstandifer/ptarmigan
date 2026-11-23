// The year clock. It runs on its own, can be dragged to any year, and keeps running from there.
// At today it pauses and asks for a future. At the last year it stops. It never loops.

export function createClock({ firstYear, lastYear, todayYear, yearsPerMinute, onNeedFuture }) {
  const state = { year: firstYear, playing: true, future: null, waitingForChoice: false };

  function setYear(year) {
    let next = Math.min(Math.max(year, firstYear), lastYear);

    // Going back before today clears the future, so running forward asks again.
    if (next < todayYear) state.future = null;

    // No going past today until a future is chosen.
    if (next > todayYear && !state.future) {
      next = todayYear;
      askForFuture();
    }
    state.year = next;
  }

  function askForFuture() {
    if (state.waitingForChoice) return;
    state.waitingForChoice = true;
    state.playing = false;
    onNeedFuture();
  }

  function chooseFuture(future) {
    state.future = future;
    state.waitingForChoice = false;
    state.playing = true;
  }

  function tick(dt) {
    if (!state.playing) return;
    setYear(state.year + (yearsPerMinute / 60) * dt);
    if (state.year >= lastYear) state.playing = false;
  }

  function togglePlay() {
    if (state.waitingForChoice) return;
    if (state.year >= lastYear) return;
    state.playing = !state.playing;
  }

  return { state, setYear, chooseFuture, tick, togglePlay };
}
