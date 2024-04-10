import Enemy, { EnemyId } from "./Enemy";
import Player from "./Player";
import attackStats from "../data/attack.json";
import enemyStats from "../data/enemy.json";
import useAttackStore from "../store/attackStore";
import useEnemyStore from "../store/enemyStore";
import usePlayerStore from "../store/playerStore";

const Battle = ({ enemy }: { enemy: EnemyId }) => {
  const {
    currentPlayerAttack,
    currentEnemyAttack,
    currentEnemyAttackDamage,
    currentPlayerAttackDamage,
    firstAttacker,
  } = useAttackStore();

  const { currentHp } = usePlayerStore();

  const { enemyHp } = useEnemyStore();

  const enemyAttackString = () => {
    if (enemyHp > 0) {
      if (currentEnemyAttack !== "") {
        return (
          <p>{`${enemyStats[enemy].name} used ${attackStats[currentEnemyAttack].name} - you lost ${currentEnemyAttackDamage}HP!`}</p>
        );
      }
    } else {
      return <p>{`${enemyStats[enemy].name} vanquished!`}</p>;
    }
  };

  const playerAttackString = () => {
    if (currentHp > 0) {
      if (currentEnemyAttack !== "") {
        return (
          <p>{`You used ${attackStats[currentPlayerAttack].name} - ${enemyStats[enemy].name} lost ${currentPlayerAttackDamage}HP!`}</p>
        );
      }
    } else {
      return <p>{`${enemyStats[enemy].name} defeated you!`}</p>;
    }
  };

  const battleStrings = () => {
    return firstAttacker === "player" ? (
      <>
        {playerAttackString()}
        {enemyAttackString()}
      </>
    ) : (
      <>
        {enemyAttackString()}
        {playerAttackString()}
      </>
    );
  };

  return (
    <>
      {enemy && <Enemy />}
      {battleStrings()}
      <Player />
    </>
  );
};

export default Battle;
