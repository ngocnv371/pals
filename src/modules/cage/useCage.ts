import { create } from "zustand";
import { Beast } from "./types";

interface CageState {
  beasts: Beast[];
  setBeasts: (beasts: Beast[]) => void;
  addBeast: (beast: Beast) => void;
  removeBeast: (id: string) => void;
}

export const useCage = create<CageState>((set) => ({
  beasts: [],
  setBeasts: (beasts) => set({ beasts }),
  addBeast: (beast) =>
    set((state) => ({
      beasts: [...state.beasts, beast],
    })),
  removeBeast: (id) =>
    set((state) => ({
      beasts: state.beasts.filter((b) => b.id !== id),
    })),
}));

export function useBeast(id: string): Beast | undefined {
  return useCage((state) => state.beasts.find((b) => b.id === id));
}
