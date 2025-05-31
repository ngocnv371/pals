import { Beast, Pal } from "../shared/types";
import pals from "../../data/pals.json";
import { nanoid } from "nanoid";
import { Chance } from "chance";

const typedPals = pals as Record<string, Pal>;
export function getBeastInfo(
  beasts: Beast[],
  beastId: string
): (Beast & Pal) | null {
  const beast = beasts.find((b) => b.id === beastId);
  if (!beast) {
    return null;
  }

  const pal = typedPals[beast.pal] as Pal;
  return { ...pal, ...beast };
}

const sortedByBreedingPowerIds = Object.keys(pals).sort(
  (a, b) => typedPals[a].breedingPower - typedPals[b].breedingPower
);
const sortedBreedingPower = sortedByBreedingPowerIds.map(
  (id) => typedPals[id].breedingPower
);

export function getPalByBreedingPower(power: number): Pal {
  let result = "";
  const firstIndex = sortedBreedingPower.findIndex((s) => s > power);
  if (firstIndex <= 1) {
    result = sortedByBreedingPowerIds[0];
  } else {
    result = sortedByBreedingPowerIds[firstIndex - 1];
  }

  return typedPals[result];
}

export function createBeast(palId: string): Beast {
  const pal = typedPals[palId];
  return {
    id: nanoid(),
    pal: pal.id,
    name: pal.name,
    level: 1,
    building: "",
  } as Beast;
}

const chance = new Chance();
export function createRandomBeast(): Beast {
  const pal = chance.pickone(Object.keys(typedPals));
  return createBeast(pal);
}
