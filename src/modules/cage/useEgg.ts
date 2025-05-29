import { useCallback } from "react";
import { useCage } from "./useCage";
import pals from "../../data/pals.json" with { type: "json" };
import { Chance } from "chance";
import { nanoid } from "nanoid";
import { Beast, Pal } from "./types";

const chance = new Chance();

const palMap: Record<string, Pal> = pals.entities as any

// ascending
const sortedByBreedingPower = pals.ids
  .sort((a, b) => palMap[a].breedingPower - palMap[b].breedingPower);
const breedingPower = sortedByBreedingPower.map(id => palMap[id].breedingPower)

export function useBreeder() {
  const breed = useCallback((pal1: string, pal2: string) => {
    const p1 = palMap[pal1]
    const p2 = palMap[pal2]
    const power = (p1.breedingPower + p2.breedingPower) / 2
    const firstIndex = breedingPower.findIndex(p => p >= power)
    if (firstIndex < 0) {
      return sortedByBreedingPower[0]
    }

    return sortedByBreedingPower[firstIndex];
  }, []);
  return { breed };
}


export function useEgg() {
  const { addBeast } = useCage();

  const hatch = useCallback(
    (palId: string) => {
      const pal = palMap[palId] as Pal;
      const beast: Beast = {
        id: nanoid(),
        pal: pal.id,
        name: pal.name,
        level: 1,
      };

      addBeast(beast);
      return beast;
    },
    [addBeast]
  );

  const open = useCallback(() => {
    const palId = chance.pickone(pals.ids);
    return hatch(palId);
  }, [addBeast, hatch]);

  return { open, hatch };
}

export function usePal(id: string): Pal | undefined {
  if (!id) {
    return undefined;
  }
  return palMap[id] as Pal;
}
