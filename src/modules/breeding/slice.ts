import { StateCreator } from "zustand";
import {
  AppState,
  BreedingSlice,
  Egg,
  Inventory,
  InventoryItem,
  ItemInfo,
} from "../shared/types";
import {
  createBeast,
  getBeastInfo,
  getPalByBreedingPower,
} from "../cage/utils";
import { nanoid } from "nanoid";

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

    const { beasts, femaleBeastId, maleBeastId, removeItems, addItems } = get();
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
    const egg: Egg = {
      type: "scorching egg",
      name: "Mystery Egg",
      quantity: 1,
      element: "fire",
      breedingPower: median,
      heritableTraits: [],
    };
    const id = nanoid();
    addItems({ [id]: egg });
    return id;
  },
});
