import enemyStats from "../data/enemy.json";
import { useCurrentEnemyStore, useEnemyStateStore } from "../store/enemyStore";

export type EnemyId = keyof typeof enemyStats;

const Enemy = () => {
  const { currentEnemy } = useCurrentEnemyStore();

  const { enemyName, enemyImg, enemyHp, enemyMaxHp } =
    useEnemyStateStore(currentEnemy)();

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
      <p style={{ fontSize: "2em", margin: 0 }}>{enemyName}</p>
      <img
        style={{
          maxWidth: "60%",
          maxHeight: "60%",
          imageRendering: "pixelated",
        }}
        src={enemyImg}
        height={"100%"}
      />
      <progress
        id="hp-bar"
        max={enemyMaxHp}
        value={enemyHp}
        style={{ width: "90%", backgroundColor: "green" }}
      />
    </div>
  );
};

export default Enemy;
