import { create } from "zustand";
import { AppState } from "../shared/types";
import { createUISlice } from "../ui/slice";
import { createCageSlice } from "../cage/slice";
import { createInventorySlice } from "../inventory/slice";
import { createHideoutSlice } from "../hideout/slice";
import { createBreedingSlice } from "../breeding/slice";
import { createGameLoopSlice } from "../game-loop/slice";

export const useAppStore = create<AppState>()((...a) => ({
  ...createUISlice(...a),
  ...createCageSlice(...a),
  ...createInventorySlice(...a),
  ...createHideoutSlice(...a),
  ...createBreedingSlice(...a),
  ...createGameLoopSlice(...a),
}));
