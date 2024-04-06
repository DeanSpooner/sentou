// import { useState } from "react";
import "./App.css";
import Enemy from "./components/Enemy";

function App() {
  // const [count, setCount] = useState(0);
  // const [hp, setHp] = useState(100);
  // const [mp, setMp] = useState(30);

  return (
    <div
      style={{
        aspectRatio: 9 / 16,
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Enemy enemyId={"soldier"} />
    </div>
  );
}

export default App;
