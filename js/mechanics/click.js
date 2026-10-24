// Mechanic contract (shared by click, hold, drag):
// activate(element, arena, onValidAction, level) -> returns a deactivate() function.
// onValidAction(multiplier) is called once per valid player action.
export function activateClick(element, arena, onValidAction) {
  const handler = (e) => {
    if (e.button !== 0) return; // left button / touch only
    onValidAction(1);
  };
  element.addEventListener('pointerdown', handler);
  return () => element.removeEventListener('pointerdown', handler);
}
