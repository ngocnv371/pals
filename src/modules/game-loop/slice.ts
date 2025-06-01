import { StateCreator } from "zustand";
import {
  AppState,
  ProductionStatus,
  GameLoopSlice,
  Inventory,
} from "../shared/types";
import { getBeastInfo } from "../cage/utils";
import { getBuildingType } from "../hideout/utils";
import { canRemoveInventory, removeInventory } from "../inventory/utils";

export const createGameLoopSlice: StateCreator<
  AppState,
  [],
  [],
  GameLoopSlice
> = (set, get) => ({
  lastUpdateTime: 0,
  update: (delta) => {
    const multiplier = delta / 1000;
    function updateBuildings() {
      const { buildings, beasts, addItems, removeItems, inventory } = get();
      const buildingsWithAtLeast1Worker = buildings.filter((b) =>
        b.workers.some(Boolean)
      );
      for (let building of buildingsWithAtLeast1Worker) {
        let status: ProductionStatus = building.status || {
          work: 0,
          paused: false,
          paid: false,
        };

        // don't process this building if it's paused
        if (status.paused) {
          return;
        }

        const meta = getBuildingType(building.blueprintId);
        if (!status.paid) {
          // try to pay
          if (canRemoveInventory(inventory, meta.ingredients)) {
            removeItems(meta.ingredients);
            status.paid = true;
          } else {
            // no ingredients, no work
            return;
          }
        }

        building.status = status;
        const workers = building.workers
          .filter(Boolean)
          .map((id) => getBeastInfo(beasts, id))
          .filter(Boolean);
        const totalWorkCapacity = workers.reduce(
          (prev, w) => prev + w!.workSpeed,
          0
        );

        const totalWorkProduced = totalWorkCapacity * multiplier;
        status.work += totalWorkProduced;

        const requiredWork = meta.work;
        const itemsProduced = Math.floor(status.work / requiredWork);

        // it is possible to produce multiple items in the same turn, but have to pay for each
        for (let i = 0; i < itemsProduced; i++) {
          // first one is already paid before hand
          if (i === 0) {
            addItems(meta.products);
          } else {
            // if we can pay then produce as normal, otherwise the effort is lost
            if (canRemoveInventory(inventory, meta.ingredients)) {
              removeItems(meta.ingredients);
              addItems(meta.products);
            }
          }
        }

        // once we produce anything, reset the state
        if (itemsProduced > 0) {
          status.paid = false;
          status.work = 0;
        }
      }
      set({ buildings });
    }

    updateBuildings();
  },
});
