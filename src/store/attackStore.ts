import { create } from "zustand";
import { AttackId } from "../utils/attack";

interface AttackState {
  currentPlayerAttack: AttackId;
  setCurrentPlayerAttack: (attack: AttackId) => void;
  currentPlayerAttackDamage: number;
  setCurrentPlayerAttackDamage: (damage: number) => void;
  currentEnemyAttack: AttackId;
  setCurrentEnemyAttack: (attack: AttackId) => void;
  currentEnemyAttackDamage: number;
  setCurrentEnemyAttackDamage: (damage: number) => void;
  firstAttacker: "player" | "enemy";
  setFirstAttacker: (subject: "player" | "enemy") => void;
}

const useAttackStore = create<AttackState>(set => ({
  currentPlayerAttack: "",
  setCurrentPlayerAttack: (attack: AttackId) =>
    set({ currentPlayerAttack: attack }),
  currentPlayerAttackDamage: 0,
  setCurrentPlayerAttackDamage: (damage: number) =>
    set({ currentPlayerAttackDamage: damage }),
  currentEnemyAttack: "",
  setCurrentEnemyAttack: (attack: AttackId) =>
    set({ currentEnemyAttack: attack }),
  currentEnemyAttackDamage: 0,
  setCurrentEnemyAttackDamage: (damage: number) =>
    set({ currentEnemyAttackDamage: damage }),
  firstAttacker: "player",
  setFirstAttacker(subject) {
    set({ firstAttacker: subject });
  },
}));

export default useAttackStore;
