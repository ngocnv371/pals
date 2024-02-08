import combinations from "./combinations.json";

export default function breed(parent1Name: string, parent2Name: string) {
  return combinations.find(
    (c) =>
      (c.parent1Name == parent1Name && c.parent2Name == parent2Name) ||
      (c.parent2Name == parent1Name && c.parent1Name == parent2Name)
  )?.childName;
}
