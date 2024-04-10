import { randomInteger } from "./random";
import attackStats from "../data/attack.json";

export type AttackId = keyof typeof attackStats;

export const getAttackDamage = (
  atkPower: number,
  userPower: number,
  recipientDefence: number
) => {
  const base = Math.max(userPower - recipientDefence, 10);

  // Increase the base value and apply a multiplier
  const scaledBase = base * 16; // Adjust scaling factor as needed
  const multiplier = 1.5; // Adjust multiplier as needed

  // Calculate damage using the scaled base value and multiplier
  let damage = Math.floor(atkPower * scaledBase * multiplier);

  // Add some randomization to the damage
  damage += randomInteger(
    Math.floor(-userPower / 10),
    Math.ceil(userPower / 10)
  );

  // Ensure damage is not negative
  return Math.max(0, damage);
};
