import { create, StateCreator } from "zustand";
import { AppState, Beast, CageSlice } from "../shared/types";

export const createCageSlice: StateCreator<AppState, [], [], CageSlice> = (
  set
) => ({
  beasts: [
    {
      id: "kdea",
      pal: "horus",
      level: 1,
      name: "Horus",
    },
    {
      id: "sd4a",
      pal: "berrygoat",
      level: 1,
      name: "Berry Goat",
    },
    {
      id: "t43sdf",
      pal: "anubis",
      level: 7,
      name: "Anubis",
    },
    {
      id: "jk54",
      pal: "monkey",
      level: 4,
      name: "Tanzee",
    },
  ],
  addBeast: (beast) =>
    set((state) => ({
      beasts: [...state.beasts, beast],
    })),
  removeBeast: (id) =>
    set((state) => ({
      beasts: state.beasts.filter((b) => b.id !== id),
    })),
});
