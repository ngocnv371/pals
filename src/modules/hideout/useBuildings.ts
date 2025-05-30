import { create } from "zustand";
import { Building, BuildingType } from "./types";
import { nanoid } from "nanoid";
import facilities from '../../data/facilities.json' with { type: 'json' }

type UseBuildingsState = {
  buildings: Building[];
  createBuilding: (typeId: BuildingType["id"]) => Building;
  assignBeast: (buildingId: string, index: number, beastId: string) => void;
  removeBuilding: (buildingId: string) => void;
};

export const useBuildings = create<UseBuildingsState>((set, get) => ({
  buildings: [
    { id: "ase98a0", type: "mine", beasts: ['', '', '', ''] },
    { id: "kea78s", type: "logging site", beasts: ['', ''] },
  ],
  createBuilding: (typeId) => {
    const newBuilding: Building = {
      id: nanoid(),
      type: typeId,
      beasts: [],
    };
    set((state) => ({
      buildings: [...state.buildings, newBuilding],
    }));
    return newBuilding;
  },
  assignBeast: (buildingId, index, beastId) => {
    set((state) => ({
      buildings: state.buildings.map((b) =>
      {
        if (b.id !== buildingId) {
          return b;
        }
        const beasts = b.beasts.slice()
        beasts[index] = beastId
        return { ...b, beasts }
      }
      ),
    }));
  },
  removeBuilding: (buildingId) => {
    set((state) => ({
      buildings: state.buildings.filter((b) => b.id !== buildingId),
    }));
  },
}));

export const useBuildingById = (id: string) => {
  if (!id) {
    return undefined;
  }

  return useBuildings((state) => state.buildings.find((b) => b.id === id));
};


export const useBuildingType = (type: string): BuildingType | undefined => {
  if (!type) {
    return undefined;
  }

  return facilities.find(f => f.id === type)
}