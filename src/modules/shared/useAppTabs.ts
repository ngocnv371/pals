import { create } from "zustand";

type AppTabsState = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export const useAppTabs = create<AppTabsState>((set) => ({
  show: true,
  setShow: (show) => set({ show }),
}));
