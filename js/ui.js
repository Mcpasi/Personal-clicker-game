import { CONFIG } from './config.js';
import { clickDamage, idleDps } from './logic.js';
import { costOf } from './shop.js';

const $ = (id) => document.getElementById(id);
const fmt = (n) => (Math.round(n * 10) / 10).toString();

export function buildShop(onBuy) {
  const shop = $('shop');
  shop.innerHTML = '';
  for (const key of Object.keys(CONFIG.upgrades)) {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.key = key;
    b.addEventListener('click', () => onBuy(key));
    shop.appendChild(b);
  }
}

export function buildLevels(onSelect) {
  const box = $('levels');
  box.innerHTML = '';
  CONFIG.levels.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.index = i;
    b.addEventListener('click', () => onSelect(i));
    box.appendChild(b);
  });
}

export function render(state, message = '') {
  const level = CONFIG.levels[state.levelIndex];
  $('level-name').textContent = level.name;
  $('gold').textContent = Math.floor(state.gold);
  $('kills').textContent = state.kills;
  $('click-dmg').textContent = fmt(clickDamage(CONFIG.clickBaseDamage, CONFIG.upgrades.clickPower, state.upgrades.clickPower));
  $('idle-dps').textContent = fmt(idleDps(CONFIG.upgrades.idle, state.upgrades.idle));
  $('hp-text').textContent = `${Math.ceil(state.enemyHp)} / ${state.enemyMaxHp} HP`;
  $('hp-fill').style.width = `${(state.enemyHp / state.enemyMaxHp) * 100}%`;
  $('enemy').textContent = state.bossActive ? '👹' : '👾';
  $('message').textContent = message;

  $('boss-info').textContent = state.bossActive
    ? `BOSS: ${state.bossTimeLeft.toFixed(1)}s left`
    : `Boss in ${Math.max(0, level.killsBeforeBoss - state.killsInLevel)} kills`;

  for (const b of $('levels').querySelectorAll('button')) {
    const i = Number(b.dataset.index);
    const unlocked = i < state.unlockedLevels;
    b.textContent = unlocked ? `Level ${i + 1}` : `Level ${i + 1} (locked)`;
    b.disabled = !unlocked;
    b.classList.toggle('current', i === state.levelIndex);
  }

  for (const b of $('shop').querySelectorAll('button')) {
    const def = CONFIG.upgrades[b.dataset.key];
    const cost = costOf(state, b.dataset.key);
    b.textContent = `${def.label} (Lv ${state.upgrades[b.dataset.key]}): ${def.desc}. Cost: ${cost}`;
    b.disabled = state.gold < cost;
  }
}
