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

export function render(state) {
  const level = CONFIG.levels[state.levelIndex];
  $('level-name').textContent = level.name;
  $('gold').textContent = Math.floor(state.gold);
  $('kills').textContent = state.kills;
  $('click-dmg').textContent = fmt(clickDamage(CONFIG.clickBaseDamage, CONFIG.upgrades.clickPower, state.upgrades.clickPower));
  $('idle-dps').textContent = fmt(idleDps(CONFIG.upgrades.idle, state.upgrades.idle));
  $('hp-text').textContent = `${Math.ceil(state.enemyHp)} / ${state.enemyMaxHp} HP`;
  $('hp-fill').style.width = `${(state.enemyHp / state.enemyMaxHp) * 100}%`;

  for (const b of $('shop').querySelectorAll('button')) {
    const def = CONFIG.upgrades[b.dataset.key];
    const cost = costOf(state, b.dataset.key);
    b.textContent = `${def.label} (Lv ${state.upgrades[b.dataset.key]}): ${def.desc}. Cost: ${cost}`;
    b.disabled = state.gold < cost;
  }
}
