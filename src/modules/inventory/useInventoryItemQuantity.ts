import { useAppStore } from "../store/useAppStore";

export function useInventoryItemQuantity(id: string) {
  const item = useInventoryItem(id);
  if (!item) {
    return 0;
  }

  return typeof item === "number" ? item : item.quantity;
}

export function useInventoryItem(id: string) {
  const item = useAppStore((x) => x.inventory[id]);
  return item;
}
