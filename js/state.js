import { CONFIG } from './config.js';
import { enemyHp } from './logic.js';

export function createState() {
  const hp = enemyHp(CONFIG.levels[0], 0);
  return {
    levelIndex: 0, unlockedLevels: 1,
    enemyIndex: 0, killsInLevel: 0,
    enemyHp: hp, enemyMaxHp: hp,
    bossActive: false, bossTimeLeft: 0,
    gold: 0, kills: 0,
    upgrades: { clickPower: 0, idle: 0 },
  };
}

export function saveState(state) {
  try { localStorage.setItem(CONFIG.saveKey, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(CONFIG.saveKey);
    if (raw) return { ...createState(), ...JSON.parse(raw) };
  } catch (e) { /* corrupt save: fall through to fresh state */ }
  return createState();
}

export function clearSave() {
  try { localStorage.removeItem(CONFIG.saveKey); } catch (e) {}
}
