import { useCallback } from "react";
import { useCage } from "./useCage";
import pals from "../../data/pals.json";
import { Chance } from "chance";
import { nanoid } from "nanoid";
import { Beast, Pal } from "./types";

const chance = new Chance();

export function useEgg() {
  const { addBeast } = useCage();

  const open = useCallback(() => {
    const palId = chance.pickone(pals.ids);
    const pal = (pals.entities as any)[palId] as Pal;
    const beast: Beast = {
      id: nanoid(),
      pal: pal.id,
      name: pal.name,
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
  return (pals.entities as any)[id] as Pal;
}
