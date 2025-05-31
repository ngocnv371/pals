import { useAppStore } from "../store/useAppStore";

export function useInventoryItemQuantity(id: string) {
  const quantity = useAppStore((x) => x.inventory[id]);
  return quantity || 0;
}
