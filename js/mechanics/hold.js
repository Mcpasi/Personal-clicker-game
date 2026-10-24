// Level 2 mechanic: hold the pointer on the moving target until the ring fills.
// Releasing or leaving the target early cancels the hold. After a completed hold, the target jumps.
export function activateHold(element, arena, onValidAction, level) {
  const holdMs = level.holdMs;
  let startTime = null;
  let raf = null;

  const setProgress = (pct) => element.style.setProperty('--hold', pct);

  function moveTarget() {
    const maxX = Math.max(0, arena.clientWidth - element.offsetWidth);
    const maxY = Math.max(0, arena.clientHeight - element.offsetHeight);
    element.style.left = Math.random() * maxX + 'px';
    element.style.top = Math.random() * maxY + 'px';
  }

  function step() {
    if (startTime === null) return;
    const p = Math.min(1, (performance.now() - startTime) / holdMs);
    setProgress(p * 100);
    if (p >= 1) {
      startTime = null;
      setProgress(0);
      onValidAction(level.holdDamageMultiplier);
      moveTarget();
      return;
    }
    raf = requestAnimationFrame(step);
  }

  function down(e) {
    if (e.button !== 0) return;
    startTime = performance.now();
    raf = requestAnimationFrame(step);
  }

  function cancel() {
    startTime = null;
    cancelAnimationFrame(raf);
    setProgress(0);
  }

  const noMenu = (e) => e.preventDefault(); // stop long-press menu on touch devices

  arena.classList.add('hold-arena');
  element.classList.add('hold-mode');
  moveTarget();
  element.addEventListener('pointerdown', down);
  element.addEventListener('pointerup', cancel);
  element.addEventListener('pointerleave', cancel);
  element.addEventListener('pointercancel', cancel);
  element.addEventListener('contextmenu', noMenu);

  return function deactivate() {
    cancel();
    element.removeEventListener('pointerdown', down);
    element.removeEventListener('pointerup', cancel);
    element.removeEventListener('pointerleave', cancel);
    element.removeEventListener('pointercancel', cancel);
    element.removeEventListener('contextmenu', noMenu);
    element.classList.remove('hold-mode');
    arena.classList.remove('hold-arena');
    element.style.left = '';
    element.style.top = '';
  };
}
