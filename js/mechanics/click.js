// Level 1 mechanic. Contract shared by all mechanics:
// call onValidAction() whenever the player performs one valid action.
export function initClick(element, onValidAction) {
  element.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return; // left button / touch only
    onValidAction();
  });
}
