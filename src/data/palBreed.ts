import combinations from "./combinations.json";
import getPalMetadata, { getPalMetadataById } from "./palMetadata";

export default function breed(parent1Name: string, parent2Name: string) {
  const p1 = parent1Name.replace("Alpha", "").replace("Boss", "").trim();
  const p2 = parent2Name.replace("Alpha", "").replace("Boss", "").trim();
  return combinations.find(
    (c) =>
      (c.parent1Name == p1 && c.parent2Name == p2) ||
      (c.parent2Name == p1 && c.parent1Name == p2)
  )?.childName;
}

export function breedById(id1: string, id2: string) {
  const c1 = getPalMetadataById(id1);
  const c2 = getPalMetadataById(id2);
  const title = breed(c1.title, c2.title);
  const c3 = getPalMetadata(title || "Rooby");
  return c3.id;
}

export function breedChain(ids: string[]) {
  console.debug("breed chain", ids);
  if (ids.length == 1) {
    return ids[0];
  }

  const pals = ids
    .map(getPalMetadataById)
    .map((f) => f.title)
    .reverse();
  let result = pals.pop()!;
  while (pals.length > 0) {
    const candidate = pals.pop()!;
    result = breed(result, candidate)!;
  }

  const c3 = getPalMetadata(result);
  return c3.id;
}
