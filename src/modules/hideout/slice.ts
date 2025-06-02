import { StateCreator } from "zustand";
import { AppState, HideoutSlice } from "../shared/types";
import { createBuilding, getBlueprint } from "./utils";

export const createHideoutSlice: StateCreator<
  AppState,
  [],
  [],
  HideoutSlice
> = (set, get) => ({
  buildings: [
    { id: "ase98a0", blueprintId: "mine", workers: ["", "", "", ""], work: 0 },
    { id: "kea78s", blueprintId: "logging site", workers: ["", ""], work: 0 },
    { id: "td99as", blueprintId: "smelter", workers: ["", ""], work: 0 },
  ],
  canConstructBuilding: (blueprintId) => {
    const blueprint = getBlueprint(blueprintId);
    return get().canRemoveItems(blueprint.price);
  },
  constructBuilding: (blueprintId) => {
    const blueprint = getBlueprint(blueprintId);
    const newBuilding = createBuilding(blueprintId);
    get().removeItems(blueprint.price);
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
  getIsBeastAvailable: (id: string) => {
    const { buildings } = get();
    const assignedWorkers = buildings.flatMap((b) => b.workers).filter(Boolean);
    return !assignedWorkers.includes(id);
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
