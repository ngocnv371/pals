import { create } from "zustand";
import { Beast } from "./types";

interface CageState {
  beasts: Beast[];
  setBeasts: (beasts: Beast[]) => void;
  addBeast: (beast: Beast) => void;
  removeBeast: (id: string) => void;
  clearDuty: (id: string) => void;
  assignDuty: (id: string, building: string) => void;
}

export const useCage = create<CageState>((set) => ({
  beasts: [
    {
      id: "kdea",
      pal: "horus",
      level: 1,
      name: "Horus",
      building: "",
    },
    {
      id: "sd4a",
      pal: "berrygoat",
      level: 1,
      name: "Berry Goat",
      building: "",
    },
    {
      id: "t43sdf",
      pal: "anubis",
      level: 7,
      name: "Anubis",
      building: "",
    },
  ],
  setBeasts: (beasts) => set({ beasts }),
  addBeast: (beast) =>
    set((state) => ({
      beasts: [...state.beasts, beast],
    })),
  removeBeast: (id) =>
    set((state) => ({
      beasts: state.beasts.filter((b) => b.id !== id),
    })),
  clearDuty: (id) =>
    set((state) => ({
      beasts: state.beasts.map((b) =>
        b.id !== id ? b : { ...b, building: "" }
      ),
    })),
  assignDuty: (id, building) =>
    set((state) => ({
      beasts: state.beasts.map((b) => (b.id !== id ? b : { ...b, building })),
    })),
}));

export function useBeast(id: string): Beast | undefined {
  return useCage((state) => state.beasts.find((b) => b.id === id));
}
