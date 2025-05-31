import { create, StateCreator } from "zustand";
import { AppState, InventorySlice } from "../shared/types";

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
  },
  addItems: (items) => {
    set((state) => {
      const updated = { ...state.inventory };
      for (const key in items) {
        updated[key] = (updated[key] || 0) + items[key];
      }
      return { inventory: updated };
    });
  },
  canRemoveItems: (items) => {
    const current = get().inventory;
    for (const key in items) {
      if ((current[key] || 0) < items[key]) {
        return false;
      }
    }
    return true;
  },
  removeItems: (items) => {
    set((state) => {
      const updated = { ...state.inventory };
      for (const key in items) {
        if (updated[key]) {
          updated[key] = Math.max(0, updated[key] - items[key]);
          if (updated[key] === 0) delete updated[key];
        }
      }
      return { inventory: updated };
    });
  },
});
