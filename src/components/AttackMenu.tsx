import { useState } from "react";
import playerStats from "../data/player.json";
import attackStats from "../data/attack.json";
import useAttackStore from "../store/attackStore";
import { AttackId, getAttackDamage } from "../utils/attack";
import usePlayerStore from "../store/playerStore";
import useEnemyStore from "../store/enemyStore";
import { randomBoolean, randomElement } from "../utils/random";

const AttackMenu = () => {
  const {
    setCurrentPlayerAttack,
    setCurrentPlayerAttackDamage,
    setCurrentEnemyAttack,
    setCurrentEnemyAttackDamage,
    setFirstAttacker,
  } = useAttackStore();

  const {
    currentDef,
    currentHp,
    currentMag,
    currentMdf,
    currentMp,
    currentSpd,
    currentStr,
    setCurrentHp,
    setCurrentMp,
  } = usePlayerStore();

  const {
    enemyAttacks,
    enemyDef,
    enemyHp,
    enemyMp,
    enemyMag,
    enemyMdf,
    enemySpd,
    enemyStr,
    setEnemyHp,
    setEnemyMp,
  } = useEnemyStore();

  const [isOpen, setIsOpen] = useState(false);

  const attacks = playerStats["attacks"];

  const attackData = attacks.map(atk => attackStats[atk as AttackId]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {!isOpen && <button onClick={() => setIsOpen(true)}>Attack</button>}
      {isOpen && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={() => setIsOpen(false)}>{"<"}</button>
          {attackData.map((atk, idx) => (
            <button
              disabled={atk.mp > currentMp}
              key={idx}
              onClick={() => {
                setIsOpen(false);

                const currentPlayerAttackDamage =
                  atk.element === "phys"
                    ? getAttackDamage(atk.dmg, currentStr, enemyDef)
                    : getAttackDamage(atk.dmg, currentMag, enemyMdf);

                const possibleEnemyAttacks = enemyAttacks.filter(
                  atk => attackStats[atk].mp <= enemyMp
                ) as AttackId[];

                const nextEnemyAttack = randomElement(possibleEnemyAttacks);

                const nextEnemyAttackStats =
                  attackStats[nextEnemyAttack as AttackId];

                console.log({ nextEnemyAttack });

                const nextEnemyAttackDamage =
                  nextEnemyAttackStats.element === "phys"
                    ? getAttackDamage(
                        nextEnemyAttackStats.dmg,
                        enemyStr,
                        currentDef
                      )
                    : getAttackDamage(
                        nextEnemyAttackStats.dmg,
                        enemyMag,
                        currentMdf
                      );

                const playerAttacksFirst = () => {
                  setFirstAttacker("player");
                  // Set attack to selected, make MP cost and damage calculations:
                  setCurrentMp(currentMp - atk.mp);
                  setCurrentPlayerAttack(attacks[idx] as AttackId);
                  setCurrentPlayerAttackDamage(currentPlayerAttackDamage);
                  setEnemyHp(Math.max(enemyHp - currentPlayerAttackDamage, 0));

                  // If enemy is still alive after the above attack, allow them to attack:
                  if (enemyHp > 0) {
                    setCurrentEnemyAttack(nextEnemyAttack as AttackId);
                    setCurrentEnemyAttackDamage(nextEnemyAttackDamage);
                    setEnemyMp(enemyMp - nextEnemyAttackStats.mp);
                    setCurrentHp(
                      Math.max(currentHp - nextEnemyAttackDamage, 0)
                    );
                  } else {
                    // Otherwise, just make their attack damage 0 - they shouldn't be able to attack you after here:
                    setCurrentEnemyAttackDamage(0);
                  }
                };

                const enemyAttacksFirst = () => {
                  setFirstAttacker("enemy");
                  // Select valid enemy attack, make MP cost and damage calculations:
                  setCurrentEnemyAttack(nextEnemyAttack as AttackId);
                  setCurrentEnemyAttackDamage(nextEnemyAttackDamage);
                  setEnemyMp(enemyMp - nextEnemyAttackStats.mp);
                  setCurrentHp(Math.max(currentHp - nextEnemyAttackDamage, 0));

                  // If player is still after the above attack, allow them to attack, making MP and damage calculations:
                  if (currentHp > 0) {
                    setCurrentMp(currentMp - atk.mp);
                    setCurrentPlayerAttack(attacks[idx] as AttackId);
                    setCurrentPlayerAttackDamage(currentPlayerAttackDamage);
                    setEnemyHp(
                      Math.max(enemyHp - currentPlayerAttackDamage, 0)
                    );
                  } else {
                    // Otherwise, just make player attack damage 0 - they shouldn't be able to attack enemy after here:
                    setCurrentPlayerAttackDamage(0);
                  }
                };

                if (currentSpd === enemySpd) {
                  const playerFirst = randomBoolean();
                  if (playerFirst) {
                    return playerAttacksFirst();
                  } else {
                    return enemyAttacksFirst();
                  }
                } else if (currentSpd > enemySpd) {
                  return playerAttacksFirst();
                } else {
                  return enemyAttacksFirst();
                }
              }}
            >
              {atk.name}
              {atk.mp > 0 && `: ${atk.mp}MP`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttackMenu;
