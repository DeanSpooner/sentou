import { useState } from "react";
import "./App.css";
import Battle from "./components/Battle";
import { useCurrentEnemyStore } from "./store/enemyStore";

function App() {
  const { currentEnemy, setCurrentEnemy } = useCurrentEnemyStore();

  const [inBattle, setInBattle] = useState(false);

  return (
    <div
      style={{
        aspectRatio: 9 / 16,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      {!inBattle && (
        <button
          onClick={() => {
            setInBattle(true);
            return setCurrentEnemy("soldier");
          }}
        >
          Fight soldier
        </button>
      )}
      {inBattle && <Battle enemy={currentEnemy} />}
    </div>
  );
}

export default App;
