// Define an interface for the enemy's stats
export interface EnemyStats {
  name: string;
  img?: string;
  hp?: number;
  mp?: number;
  str?: number;
  def?: number;
  mag?: number;
  mdf?: number;
  spd?: number;
  attacks?: string[];
}

// Define default values for missing stats
export const defaultEnemyStats: Partial<EnemyStats> = {
  name: "Unknown",
  img: "./sprites/enemy/soldier.png",
  hp: 1,
  mp: 0,
  str: 1,
  def: 1,
  mag: 1,
  mdf: 1,
  spd: 1,
  attacks: ["tickle"],
};
