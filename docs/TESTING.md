# Testing

## Automated logic tests
Open `tests/tests.html` via the local server. Covers `js/logic.js`.

## Manual checklist
- [YES] Clicking the enemy lowers its HP
- [YES] Killing an enemy gives gold and spawns a stronger one
- [YES] Shop buttons are disabled when gold is too low
- [YES] Buying "Stronger clicks" raises damage per click
- [YES] Buying "Idle helper" damages the enemy without clicking
- [YES] Refreshing the page keeps progress
- [YES] Reset progress works

## Bug log
| Date | What happened | Cause | Fix | AI used |
|24/10/2026 16:25|idle damage stopped in background tab|browser throttles timers and the tick assumed a fixed 0.1 s|switched to elapsed-time measurement|Claude|

