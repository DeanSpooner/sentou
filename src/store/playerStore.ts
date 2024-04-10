import { create } from "zustand";
import playerStats from "../data/player.json";

interface PlayerState {
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  maxHp: number;
  currentHp: number;
  setCurrentHp: (hp: number) => void;
  maxMp: number;
  currentMp: number;
  setCurrentMp: (mp: number) => void;
  str: number;
  currentStr: number;
  setCurrentStr: (str: number) => void;
  def: number;
  currentDef: number;
  setCurrentDef: (def: number) => void;
  mag: number;
  currentMag: number;
  setCurrentMag: (mag: number) => void;
  mdf: number;
  currentMdf: number;
  setCurrentMdf: (mdf: number) => void;
  spd: number;
  currentSpd: number;
  setCurrentSpd: (spd: number) => void;
  attacks: string[];
  setCurrentAttacks: (attacks: string[]) => void;
  addNewAttack: (attack: string) => void;
  levelUp: () => void;
}

const usePlayerStore = create<PlayerState>(set => ({
  currentLevel: playerStats["level"],
  setCurrentLevel: (level: number) => set({ currentLevel: level }),
  maxHp: playerStats["hp"],
  currentHp: playerStats["hp"],
  setCurrentHp: (hp: number) => set({ currentHp: hp }),
  maxMp: playerStats["mp"],
  currentMp: playerStats["mp"],
  setCurrentMp: (mp: number) => set({ currentMp: mp }),
  str: playerStats["str"],
  currentStr: playerStats["str"],
  setCurrentStr: (str: number) => set({ currentStr: str }),
  def: playerStats["def"],
  currentDef: playerStats["def"],
  setCurrentDef: (def: number) => set({ currentDef: def }),
  mag: playerStats["mag"],
  currentMag: playerStats["mag"],
  setCurrentMag: (mag: number) => set({ currentMag: mag }),
  mdf: playerStats["mdf"],
  currentMdf: playerStats["mdf"],
  setCurrentMdf: (mdf: number) => set({ currentMdf: mdf }),
  spd: playerStats["spd"],
  currentSpd: playerStats["spd"],
  setCurrentSpd: (spd: number) => set({ currentSpd: spd }),
  attacks: playerStats["attacks"],
  setCurrentAttacks: (attacks: string[]) => set({ attacks }),
  addNewAttack: (attack: string) =>
    set(state => ({
      attacks: [...state.attacks, attack],
    })),
  levelUp: () =>
    set(state => ({
      currentLevel: state.currentLevel + 1,
      currentHp: Math.ceil(state.currentHp * 1.1),
      currentMp: Math.ceil(state.currentMp * 1.1),
      currentStr: Math.ceil(state.currentStr * 1.1),
      currentDef: Math.ceil(state.currentDef * 1.1),
      currentMag: Math.ceil(state.currentMag * 1.1),
      currentMdf: Math.ceil(state.currentMdf * 1.1),
      currentSpd: Math.ceil(state.currentSpd * 1.1),
    })),
}));

export default usePlayerStore;
