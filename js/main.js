import { CONFIG } from './config.js';
import { enemyHp, goldReward, clickDamage, idleDps, applyDamage, isDead } from './logic.js';
import { createState, loadState, saveState, clearSave } from './state.js';
import { buyUpgrade } from './shop.js';
import { initClick } from './mechanics/click.js';
import { buildShop, render } from './ui.js';

let state = loadState();

function spawnEnemy() {
  const level = CONFIG.levels[state.levelIndex];
  state.enemyMaxHp = enemyHp(level, state.enemyIndex);
  state.enemyHp = state.enemyMaxHp;
}

function dealDamage(amount) {
  state.enemyHp = applyDamage(state.enemyHp, amount);
  if (isDead(state.enemyHp)) {
    const level = CONFIG.levels[state.levelIndex];
    state.gold += goldReward(level, state.enemyIndex);
    state.kills += 1;
    state.enemyIndex += 1;
    spawnEnemy();
    saveState(state);
  }
  render(state);
}

function onBuy(key) {
  if (buyUpgrade(state, key)) {
    saveState(state);
    render(state);
  }
}

// Level 1 input
initClick(document.getElementById('enemy'), () => {
  dealDamage(clickDamage(CONFIG.clickBaseDamage, CONFIG.upgrades.clickPower, state.upgrades.clickPower));
});

// Idle damage tick (uses real elapsed time, so background tabs still count)
let lastTick = performance.now();
setInterval(() => {
  const now = performance.now();
  const seconds = Math.min(now - lastTick, 60000) / 1000; // cap at 60s for now
  lastTick = now;
  const dps = idleDps(CONFIG.upgrades.idle, state.upgrades.idle);
  if (dps > 0) dealDamage(dps * seconds);
}, CONFIG.tickMs);

document.getElementById('reset').addEventListener('click', () => {
  if (confirm('Reset all progress?')) {
    clearSave();
    state = createState();
    render(state);
  }
});

buildShop(onBuy);
render(state);
