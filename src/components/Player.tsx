import AttackMenu from "./AttackMenu";
import usePlayerStore from "../store/playerStore";

const Player = () => {
  const { maxHp, maxMp, currentHp, currentMp } = usePlayerStore();

  return (
    <div
      style={{
        width: "60%",
        height: "60%",
        borderWidth: 4,
        borderColor: "#fff",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <p style={{ fontSize: "2em", margin: 0 }}>
        HP: {currentHp}/{maxHp}
      </p>
      <p style={{ fontSize: "2em", margin: 0 }}>
        MP: {currentMp}/{maxMp}
      </p>
      <AttackMenu />
    </div>
  );
};

export default Player;
