import { randomElement } from "./random";

export const getAttack = (attacks: string[]) => {
  return randomElement(attacks);
};
