import { create } from "zustand";
import enemyStats from "../data/enemy.json";
import { EnemyId } from "../components/Enemy";
import { AttackId } from "../utils/attack";

export interface CurrentEnemyState {
  currentEnemy: EnemyId;
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
  enemyAttacks: AttackId[];
  enemyImg: string;
  setCurrentEnemy: (enemyId: EnemyId) => void;
  setEnemyHp: (hp: number) => void;
  setEnemyMp: (mp: number) => void;
}

const useEnemyStore = create<CurrentEnemyState>(set => ({
  currentEnemy: "",
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
  enemyAttacks: [],
  enemyImg: "",
  setCurrentEnemy: (enemyId: EnemyId) => {
    const enemyData = enemyStats[enemyId] as {
      name: string;
      img?: string;
      hp?: number;
      mp?: number;
      str?: number;
      def?: number;
      mag?: number;
      mdf?: number;
      spd?: number;
      attacks?: AttackId[];
    };

    set({
      currentEnemy: enemyId,
      enemyName: enemyData.name,
      enemyHp: enemyData.hp ?? 0,
      enemyMaxHp: enemyData.hp ?? 0,
      enemyMp: enemyData.mp ?? 0,
      enemyMaxMp: enemyData.mp ?? 0,
      enemyStr: enemyData.str ?? 0,
      enemyDef: enemyData.def ?? 0,
      enemyMag: enemyData.mag ?? 0,
      enemyMdf: enemyData.mdf ?? 0,
      enemySpd: enemyData.spd ?? 0,
      enemyAttacks: enemyData.attacks ?? [],
      enemyImg: enemyData.img ?? "",
    });
  },
  setEnemyHp: (hp: number) => set({ enemyHp: hp }),
  setEnemyMp: (mp: number) => set({ enemyMp: mp }),
}));

export default useEnemyStore;
