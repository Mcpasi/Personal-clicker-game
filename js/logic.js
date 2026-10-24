// Pure functions only: no DOM, no state access. Easy to test.
export function enemyHp(level, index) {
  return Math.round(level.enemyBaseHp * Math.pow(level.hpGrowth, index));
}
export function goldReward(level, index) {
  return Math.round(level.goldBase * Math.pow(level.goldGrowth, index));
}
export function upgradeCost(def, owned) {
  return Math.ceil(def.baseCost * Math.pow(def.costGrowth, owned));
}
export function clickDamage(baseDamage, def, owned) {
  return baseDamage + def.perLevel * owned;
}
export function idleDps(def, owned) {
  return def.perLevel * owned;
}
export function applyDamage(hp, damage) {
  return Math.max(0, hp - damage);
}
export function isDead(hp) {
  return hp <= 0;
}
export function canAfford(gold, cost) {
  return gold >= cost;
}
