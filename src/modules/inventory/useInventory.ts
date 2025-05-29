import { create } from "zustand";

type Inventory = Record<string, number>;

interface InventoryState {
  inventory: Inventory;
  add: (items: Inventory) => void;
  canRemove: (items: Inventory) => boolean;
  remove: (items: Inventory) => void;
  set: (items: Inventory) => void;
  clear: () => void;
}

export const useInventory = create<InventoryState>((set, get) => ({
  inventory: {
    gold: 300,
    stone: 100,
    ingot: 25,
    arrow: 8,
    cloth: 87,
    fiber: 98,
  },
  add: (items) => {
    set((state) => {
      const updated = { ...state.inventory };
      for (const key in items) {
        updated[key] = (updated[key] || 0) + items[key];
      }
      return { inventory: updated };
    });
  },
  canRemove: (items) => {
    const current = get().inventory;
    for (const key in items) {
      if ((current[key] || 0) < items[key]) {
        return false;
      }
    }
    return true;
  },
  remove: (items) => {
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
  set: (items) => set({ inventory: { ...items } }),
  clear: () => set({ inventory: {} }),
}));
