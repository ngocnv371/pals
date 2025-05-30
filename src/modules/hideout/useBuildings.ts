import { create } from "zustand";
import { Building, BuildingType } from "./types";
import { nanoid } from "nanoid";
import facilities from "../../data/facilities.json";
import { useInterval } from "../shared/useInterval";
import { useMemo, useRef } from "react";
import buildMap from "../../utils/buildMap";

const facilityMap = buildMap(facilities);

type UseBuildingsState = {
  buildings: Building[];
  createBuilding: (typeId: BuildingType["id"]) => Building;
  assignWorker: (buildingId: string, index: number, beastId: string) => void;
  removeBuilding: (buildingId: string) => void;
  update: (ms: number) => void;
};

export const useBuildings = create<UseBuildingsState>((set, get) => ({
  buildings: [
    { id: "ase98a0", type: "mine", workers: ["", "", "", ""], work: 0 },
    { id: "kea78s", type: "logging site", workers: ["", ""], work: 0 },
  ],
  createBuilding: (typeId) => {
    const newBuilding: Building = {
      id: nanoid(),
      type: typeId,
      workers: [],
      work: 0,
    };
    set((state) => ({
      buildings: [...state.buildings, newBuilding],
    }));
    return newBuilding;
  },
  assignWorker: (buildingId, index, beastId) => {
    set((state) => ({
      buildings: state.buildings.map((b) => {
        if (b.id !== buildingId) {
          return b;
        }
        const workers = b.workers.slice();
        workers[index] = beastId;
        return { ...b, workers };
      }),
    }));
  },
  removeBuilding: (buildingId) => {
    set((state) => ({
      buildings: state.buildings.filter((b) => b.id !== buildingId),
    }));
  },
  update: (ms) => {
    const { buildings } = get();
    for (let b of buildings) {
      // get assigned workers
      // get workers workspeed
      // resolve work amount
      // add work amount to building
      // check accumulated work amount against building work requirement
      // produce items
      b.work = (b.work + Math.random() * 10) % 500;
    }
    set((state) => ({ buildings }));
  },
}));

export const useBuildingById = (id: string) => {
  if (!id) {
    return undefined;
  }

  return useBuildings((state) => state.buildings.find((b) => b.id === id));
};

export const useBuildingType = (type: string): BuildingType | undefined => {
  return facilityMap[type];
};

export function useBuildingsUpdate() {
  const { update } = useBuildings();
  const lastUpdateRef = useRef(new Date().getTime());

  useInterval(() => {
    console.log("update buildings");
    const now = new Date().getTime();
    const delta = now - lastUpdateRef.current;
    update(delta);
    lastUpdateRef.current = new Date().getTime();
  }, 1000);
}
