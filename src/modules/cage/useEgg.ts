import { useCallback } from "react";
import { useCage } from "./useCage";
import pals from "../../data/pals.json";
import { Chance } from "chance";
import { nanoid } from "nanoid";
import { useInventory } from "../inventory/useInventory";
import { Beast, Pal } from "../shared/types";

const chance = new Chance();

const palMap: Record<string, Pal> = pals.entities as any;

// ascending
const sortedByBreedingPower = pals.ids.sort(
  (a, b) => palMap[a].breedingPower - palMap[b].breedingPower
);
const breedingPower = sortedByBreedingPower.map(
  (id) => palMap[id].breedingPower
);

const breedingRequirements = { cake: 1 };
export function useBreeder() {
  const { canRemove, remove } = useInventory();
  const breed = useCallback(
    (pal1: string, pal2: string) => {
      if (!canRemove(breedingRequirements)) {
        throw new Error("insufficient cake");
      }

      const p1 = palMap[pal1];
      const p2 = palMap[pal2];
      const power = (p1.breedingPower + p2.breedingPower) / 2;
      const firstIndex = breedingPower.findIndex((p) => p >= power);
      remove(breedingRequirements);
      if (firstIndex < 0) {
        return sortedByBreedingPower[0];
      }

      return sortedByBreedingPower[firstIndex];
    },
    [canRemove, remove]
  );
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
        building: "",
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
