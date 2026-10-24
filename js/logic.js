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

// --- Boss and level progression ---
export function bossHp(level, index) {
  return Math.round(enemyHp(level, index) * level.bossHpMultiplier);
}
export function bossGold(level, index) {
  return goldReward(level, index) * level.bossGoldMultiplier;
}
export function shouldSpawnBoss(killsInLevel, level) {
  return killsInLevel >= level.killsBeforeBoss;
}
export function tickTimer(timeLeft, seconds) {
  return Math.max(0, timeLeft - seconds);
}
export function isTimeUp(timeLeft) {
  return timeLeft <= 0;
}
// How many levels are unlocked after beating the boss of levelIndex.
export function unlockedAfterBoss(unlocked, levelIndex, totalLevels) {
  return Math.min(totalLevels, Math.max(unlocked, levelIndex + 2));
}

// Damage of one valid action: base click damage times the mechanic's multiplier.
export function mechanicDamage(baseDamage, multiplier) {
  return baseDamage * multiplier;
}
