import combinations from "./combinations.json";

export default function breed(parent1Name: string, parent2Name: string) {
  const p1 = parent1Name.replace("Alpha", "").trim();
  const p2 = parent2Name.replace("Alpha", "").trim();
  return combinations.find(
    (c) =>
      (c.parent1Name == p1 && c.parent2Name == p2) ||
      (c.parent2Name == p1 && c.parent1Name == p2)
  )?.childName;
}
