import { StateCreator } from "zustand";
import { AppState, HideoutSlice } from "../shared/types";
import { createBuilding } from "./utils";

export const createHideoutSlice: StateCreator<
  AppState,
  [],
  [],
  HideoutSlice
> = (set, get) => ({
  buildings: [
    { id: "ase98a0", type: "mine", workers: ["", "", "", ""], work: 0 },
    { id: "kea78s", type: "logging site", workers: ["", ""], work: 0 },
    { id: "td99as", type: "smelter", workers: ["", ""], work: 0 },
  ],
  addBuilding: (typeId) => {
    const newBuilding = createBuilding(typeId);
    set((state) => ({
      buildings: [...state.buildings, newBuilding],
    }));
    return newBuilding;
  },
  removeBuilding: (buildingId) => {
    set((state) => ({
      buildings: state.buildings.filter((b) => b.id !== buildingId),
    }));
  },
  assignWorker: (buildingId, index, workerId) => {
    set((state) => ({
      buildings: state.buildings.map((b) => {
        if (b.id !== buildingId) {
          return b;
        }
        const workers = b.workers.slice();
        workers[index] = workerId;
        return { ...b, workers };
      }),
    }));
  },
});
