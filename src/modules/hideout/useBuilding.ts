import { useAppStore } from "../store/useAppStore";
import { getBuildingInfo } from "./utils";

export function useBuilding(id: string) {
  return useAppStore((state) => getBuildingInfo(state.buildings, id));
}
