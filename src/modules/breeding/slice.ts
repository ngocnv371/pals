import { StateCreator } from "zustand";
import { AppState, BreedingSlice, Inventory } from "../shared/types";
import {
  createBeast,
  getBeastInfo,
  getPalByBreedingPower,
} from "../cage/utils";

const BreedingRequirements: Inventory = { cake: 1 };

export const createBreedingSlice: StateCreator<
  AppState,
  [],
  [],
  BreedingSlice
> = (set, get) => ({
  maleBeastId: "",
  femaleBeastId: "",
  setFemale: (id) => {
    set((s) => ({ femaleBeastId: id }));
  },
  setMale: (id) => {
    set((s) => ({ maleBeastId: id }));
  },
  canBreed: () => {
    const { maleBeastId, femaleBeastId, canRemoveItems } = get();
    return (
      !!maleBeastId && !!femaleBeastId && canRemoveItems(BreedingRequirements)
    );
  },
  breed: () => {
    const canBreed = get().canBreed();
    if (!canBreed) {
      return null;
    }

    const { beasts, femaleBeastId, maleBeastId, removeItems, addBeast } = get();
    removeItems(BreedingRequirements);

    const female = getBeastInfo(beasts, femaleBeastId);
    const male = getBeastInfo(beasts, maleBeastId);
    if (!female) {
      return null;
    }

    if (!male) {
      return null;
    }

    const median = (female.breedingPower + male.breedingPower) / 2;
    const pal = getPalByBreedingPower(median);
    const beast = createBeast(pal.id);
    addBeast(beast);
    return beast;
  },
});
