import { ItemInfo } from "../shared/types";
import { useAppStore } from "../store/useAppStore";
import { getItemInfo } from "./utils";

export function useItemInfo(id: string): ItemInfo | null {
  return useAppStore((state) => getItemInfo(state.inventory, id));
}
