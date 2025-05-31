import { StateCreator } from "zustand";
import { AppState, UISlice } from "../shared/types";

export const createUISlice: StateCreator<AppState, [], [], UISlice> = (
  set
) => ({
  showTabs: true,
  setShowTabs: (show) => {
    set((state) => ({ showTabs: show }));
  },
});
