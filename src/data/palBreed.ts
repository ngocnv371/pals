import combinations from "./combinations.json";
import getPalMetadata, { getPalMetadataById } from "./palMetadata";

const cached = buildIndex();

function buildIndex() {
  const bag: { [key: string]: { [key: string]: string } } = {};
  combinations.forEach((c) => {
    if (bag[c.parent1Name]) {
      bag[c.parent1Name][c.parent2Name] = c.childName;
    } else {
      bag[c.parent1Name] = { [c.parent2Name]: c.childName };
    }
  });
  return bag;
}

export default function breed(parent1Name: string, parent2Name: string) {
  const p1 = parent1Name.replace("Alpha", "").replace("Boss", "").trim();
  const p2 = parent2Name.replace("Alpha", "").replace("Boss", "").trim();
  const x = cached[p1];
  if (!x) {
    console.debug(`failed to breed ${parent1Name} and ${parent2Name}`);
    return null;
  }

  const result = x[p2];
  if (!result) {
    console.debug(`failed to breed ${parent1Name} and ${parent2Name}`);
    return null;
  }

  console.debug(`breed ${parent1Name} + ${parent2Name} => ${result}`);
  return result;
}

export function breedById(id1: string, id2: string) {
  const c1 = getPalMetadataById(id1);
  const c2 = getPalMetadataById(id2);
  const title = breed(c1.title, c2.title);
  if (!title) {
    return null;
  }

  const c3 = getPalMetadata(title);
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
  console.debug("chain titles", pals);
  let result = pals.pop()!;
  while (pals.length > 0) {
    const candidate = pals.pop()!;
    const title = breed(result, candidate);
    if (!title) {
      result = candidate;
    } else {
      result = title;
    }
  }

  const c3 = getPalMetadata(result);
  return c3.id;
}
