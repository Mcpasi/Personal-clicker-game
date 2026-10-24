import { CONFIG } from './config.js';
import { upgradeCost, canAfford } from './logic.js';

export function costOf(state, key) {
  return upgradeCost(CONFIG.upgrades[key], state.upgrades[key]);
}

// Returns true if the purchase went through.
export function buyUpgrade(state, key) {
  const cost = costOf(state, key);
  if (!canAfford(state.gold, cost)) return false;
  state.gold -= cost;
  state.upgrades[key] += 1;
  return true;
}
