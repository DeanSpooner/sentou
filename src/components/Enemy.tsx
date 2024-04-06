import enemyStats from "../data/enemy.json";

// Define an interface for the enemy's stats
interface EnemyStats {
  name: string;
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
const defaultStats: Partial<EnemyStats> = {
  name: "Unknown",
  hp: 1,
  mp: 0,
  str: 1,
  def: 1,
  mag: 1,
  mdf: 1,
  spd: 1,
};

const Enemy = ({ enemyId }: { enemyId: keyof typeof enemyStats }) => {
  // Retrieve enemy data from enemyStats
  const enemyData = enemyStats[enemyId] as EnemyStats;

  // Merge enemyData with defaultStats to assign default values to missing stats
  const mergedData = { ...defaultStats, ...enemyData };

  return <div>{mergedData.name}</div>;
};

export default Enemy;
