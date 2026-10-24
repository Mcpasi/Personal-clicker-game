// Every game number lives here. Tune the game without touching the logic.
export const CONFIG = {
  tickMs: 100,          // idle damage tick
  saveKey: 'idleClickerSave_v1',
  clickBaseDamage: 1,

  // mechanic: which input this level uses. Level 2 is a click placeholder until hold.js exists.
  levels: [
    { name: 'Level 1: Slime Meadow', mechanic: 'click', enemyBaseHp: 10, hpGrowth: 1.15, goldBase: 3, goldGrowth: 1.1,
      killsBeforeBoss: 10, bossHpMultiplier: 8, bossTimeSec: 30, bossGoldMultiplier: 10 },
    { name: 'Level 2: Hollow Cave', mechanic: 'click', enemyBaseHp: 80, hpGrowth: 1.15, goldBase: 20, goldGrowth: 1.1,
      killsBeforeBoss: 10, bossHpMultiplier: 8, bossTimeSec: 30, bossGoldMultiplier: 10 },
  ],

  upgrades: {
    clickPower: { label: 'Stronger clicks', baseCost: 10, costGrowth: 1.15, perLevel: 1, desc: '+1 damage per click' },
    idle:       { label: 'Idle helper',     baseCost: 25, costGrowth: 1.15, perLevel: 0.5, desc: '+0.5 damage per second' },
  },
};
