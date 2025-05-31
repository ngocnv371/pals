import { create, StateCreator } from "zustand";
import { AppState, InventorySlice } from "../shared/types";
import { addInventory, canRemoveInventory, removeInventory } from "./utils";

export const createInventorySlice: StateCreator<
  AppState,
  [],
  [],
  InventorySlice
> = (set, get) => ({
  inventory: {
    gold: 300,
    stone: 100,
    ingot: 25,
    arrow: 8,
    cloth: 87,
    fiber: 98,
    cake: 5,
    ore: 25,
  },
  addItems: (items) => {
    set((state) => {
      const updated = addInventory(state.inventory, items);
      return { inventory: updated };
    });
  },
  canRemoveItems: (items) => {
    const current = get().inventory;
    return canRemoveInventory(current, items);
  },
  removeItems: (items) => {
    set((state) => {
      const updated = removeInventory(state.inventory, items);
      return { inventory: updated };
    });
  },
});
