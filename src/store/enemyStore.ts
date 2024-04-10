import { create } from "zustand";
import enemyStats from "../data/enemy.json";
import { EnemyId } from "../components/Enemy";
import { AttackId } from "../utils/attack";

export interface CurrentEnemyState {
  currentEnemy: EnemyId;
  setCurrentEnemy: (enemyId: EnemyId) => void;
}

const useCurrentEnemyStore = create<CurrentEnemyState>(set => ({
  currentEnemy: "",
  setCurrentEnemy: (enemyId: EnemyId) => set({ currentEnemy: enemyId }),
}));

export interface EnemyState {
  enemyName: string;
  enemyHp: number;
  enemyMaxHp: number;
  enemyMp: number;
  enemyMaxMp: number;
  enemyStr: number;
  enemyDef: number;
  enemyMag: number;
  enemyMdf: number;
  enemySpd: number;
  setEnemyHp: (hp: number) => void;
  setEnemyMp: (mp: number) => void;
  enemyAttacks: AttackId[];
  enemyImg: string;
}

const useEnemyStateStore = (enemyId: EnemyId = "") =>
  create<EnemyState>(set => {
    const enemyData = enemyStats[enemyId];

    const defaultEnemyState: EnemyState = {
      enemyName: "",
      enemyHp: 0,
      enemyMaxHp: 0,
      enemyMp: 0,
      enemyMaxMp: 0,
      enemyStr: 0,
      enemyDef: 0,
      enemyMag: 0,
      enemyMdf: 0,
      enemySpd: 0,
      setEnemyHp: (hp: number) => set({ enemyHp: hp }),
      setEnemyMp: (mp: number) => set({ enemyMp: mp }),
      enemyAttacks: [],
      enemyImg: "",
    };

    if ("hp" in enemyData) {
      console.log(enemyData);
      return {
        ...defaultEnemyState,
        enemyName: enemyData.name,
        enemyHp: enemyData.hp,
        enemyMaxHp: enemyData.hp,
        enemyMp: enemyData.mp,
        enemyMaxMp: enemyData.mp,
        enemyStr: enemyData.str,
        enemyDef: enemyData.def,
        enemyMag: enemyData.mag,
        enemyMdf: enemyData.mdf,
        enemySpd: enemyData.spd,
        enemyAttacks: enemyData.attacks as AttackId[],
        enemyImg: enemyData.img,
      };
    }

    return defaultEnemyState;
  });

export { useCurrentEnemyStore, useEnemyStateStore };
