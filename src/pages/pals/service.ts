import _state from "../../data/pals.json";
import fusion from "../../data/fusion.json";
import Pal from "../../models/pal";

const state: {
  ids: string[];
  entities: { [key: string]: Pal };
} = _state;

export function getPalById(id: string): Pal {
  return state.entities[id];
}

export function getAllPals() {
  return state.ids.map((i) => state.entities[i]);
}

export function breedPals(id1: string, id2: string) {
  const [i, j] = [id1, id2].sort();
  const c1 = (fusion as any)[i][j];
  console.debug(`${i} + ${j} = ${c1}`);
  return c1;
}

export function breedChain(ids: string[]) {
  if (ids.length == 1) {
    return ids[0];
  }

  const queue = ids.reverse();
  const list = queue.join(", ");

  let result = queue.pop()!;
  while (queue.length > 0) {
    const candidate = queue.pop()!;
    const id = breedPals(result, candidate);
    if (!id) {
      result = candidate;
    } else {
      result = id;
    }
  }

  console.debug(`chain breed: ${list} = ${result}`);

  return result;
}

export const Sorters = Object.freeze({
  name: (a: Pal, b: Pal) => a.name.localeCompare(b.name),
  attack: (a: Pal, b: Pal) => a.attack - b.attack,
  defense: (a: Pal, b: Pal) => a.defense - b.defense,
  rarity: (a: Pal, b: Pal) => a.rarity - b.rarity,
  price: (a: Pal, b: Pal) => a.price - b.price,
  type: (a: Pal, b: Pal) => a.types[0].localeCompare(b.types[0]),
});
