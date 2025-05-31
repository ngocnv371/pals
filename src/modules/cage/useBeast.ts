import { useAppStore } from "../store/useAppStore";
import { Beast, Pal } from "../shared/types";
import { getBeastInfo } from "./utils";

export function useBeast(id: string): (Beast & Pal) | null {
  return useAppStore((state) => getBeastInfo(state.beasts, id));
}
