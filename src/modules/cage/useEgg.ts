import { useCallback } from "react";
import { useCage } from "./useCage";
import pals from "../../../raw-data/pals.json";
import { Chance } from "chance";
import { nanoid } from "nanoid";
import { Beast, Pal } from "./types";

const chance = new Chance();

export function useEgg() {
  const { addBeast } = useCage();

  const open = useCallback(() => {
    const id = nanoid();
    const pal = chance.pickone(pals);
    const beast: Beast = {
      id,
      pal: pal.id,
      name: pal.title,
      level: 1,
    };

    addBeast(beast);
  }, [addBeast]);

  return { open };
}

export function usePal(id: string): Pal | undefined {
  if (!id) {
    return undefined;
  }
  return pals.find((p) => p.id == id)?.content as any;
}
