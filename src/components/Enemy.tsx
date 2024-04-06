import enemyStats from "../data/enemy.json";

// Define an interface for the enemy's stats
interface EnemyStats {
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
const defaultStats: Partial<EnemyStats> = {
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

const Enemy = ({ enemyId }: { enemyId: keyof typeof enemyStats }) => {
  // Retrieve any enemy data from enemyStats:
  const retrievedData = enemyStats[enemyId] as EnemyStats;

  // Merge enemyData with defaultStats to assign default values to missing stats:
  const enemyData = { ...defaultStats, ...retrievedData };

  return (
    <div
      style={{
        width: "60%",
        aspectRatio: 1,
        borderWidth: 4,
        borderColor: "#fff",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <p style={{ fontSize: "2em", margin: 0 }}>{enemyData.name}</p>
      <img
        style={{
          maxWidth: "60%",
          maxHeight: "60%",
          imageRendering: "pixelated",
        }}
        src={enemyData.img}
        height={"100%"}
      />
      <progress
        id="hp-bar"
        max={100}
        value={100}
        style={{ width: "90%", backgroundColor: "green" }}
      />
    </div>
  );
};

export default Enemy;
