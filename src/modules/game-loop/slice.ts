import { StateCreator } from "zustand";
import { AppState, GameLoopSlice } from "../shared/types";
import { getBeastInfo } from "../cage/utils";
import { getBuildingType } from "../hideout/utils";

export const createGameLoopSlice: StateCreator<
  AppState,
  [],
  [],
  GameLoopSlice
> = (set, get) => ({
  lastUpdateTime: 0,
  update: (delta) => {
    function updateBuildings() {
      const { buildings, beasts, addItems } = get();
      const buildingsWithAtLeast1Worker = buildings.filter((b) =>
        b.workers.some(Boolean)
      );
      for (let building of buildingsWithAtLeast1Worker) {
        const workers = building.workers
          .filter(Boolean)
          .map((id) => getBeastInfo(beasts, id))
          .filter(Boolean);
        const totalWorkCapacity = workers.reduce(
          (prev, w) => prev + w!.workSpeed,
          0
        );

        const multiplier = delta / 1000;
        const totalWorkProduced = totalWorkCapacity * multiplier;
        building.work += totalWorkProduced;

        const buildingType = getBuildingType(building.type);
        const requiredWork = buildingType.work;
        const itemsProduced = Math.floor(building.work / requiredWork);
        if (itemsProduced > 0) {
          // add items to inventory
          const products = buildingType.products;
          Object.keys(products).forEach((k) => (products[k] *= itemsProduced));
          addItems(products);

          // the remaining work will carry over
          building.work = building.work % requiredWork;
        }
      }
      set({ buildings });
    }

    updateBuildings();
  },
});
