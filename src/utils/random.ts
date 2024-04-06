export const randomInteger = (
  min: number,
  max: number,
  numbersToAvoid?: number[],
  numberOfAttempts?: number
): number => {
  if (min > max) {
    throw new Error("Min must not be greater than max.");
  }

  const currentAttempt = numberOfAttempts ?? 0;

  const selectedNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  // Just return the number if 1000 attempts have been made:
  return numbersToAvoid?.includes(selectedNumber) && currentAttempt < 1000
    ? randomInteger(min, max, numbersToAvoid, currentAttempt + 1)
    : selectedNumber;
};

export const integerRange = (min: number, max: number): number[] => {
  if (min > max) {
    throw new Error("Min must not be greater than max.");
  }
  const nums = [];
  for (let i = min; i <= max; i++) {
    nums.push(i);
  }
  return nums;
};

export const randomElement = <T>(
  elementsArray: T[],
  weights?: number[]
): T | undefined => {
  if (elementsArray.length === 0) {
    return undefined; // Return undefined if the array is empty
  }

  if (weights && weights.length !== elementsArray.length) {
    throw new Error(
      "If passing in weights, they must have the same length as elementsArray."
    );
  }

  // If weights are not provided, set all weights to 1
  const normalizedWeights = weights
    ? weights.map(w => Math.max(0, w))
    : Array(elementsArray.length).fill(1);

  // Calculate the total weight
  const totalWeight = normalizedWeights.reduce((acc, val) => acc + val, 0);

  // Generate a random number between 0 and totalWeight
  const randomWeight = Math.random() * totalWeight;

  // Pick an element based on the weights
  let accumulatedWeight = 0;
  for (let i = 0; i < elementsArray.length; i++) {
    accumulatedWeight += normalizedWeights[i];
    if (randomWeight < accumulatedWeight) {
      return elementsArray[i];
    }
  }

  // This should not happen, but return undefined to handle edge cases
  return undefined;
};
