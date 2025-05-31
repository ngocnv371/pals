import { Inventory } from "../shared/types";

export function addInventory(inventory: Inventory, items: Inventory) {
  const updated = { ...inventory };
  for (const key in items) {
    updated[key] = (updated[key] || 0) + items[key];
  }
  return updated;
}

export function canRemoveInventory(inventory: Inventory, items: Inventory) {
  for (const key in items) {
    if ((inventory[key] || 0) < items[key]) {
      return false;
    }
  }
  return true;
}

export function removeInventory(inventory: Inventory, items: Inventory) {
  const updated = { ...inventory };
  for (const key in items) {
    if (updated[key]) {
      updated[key] = Math.max(0, updated[key] - items[key]);
      if (updated[key] === 0) delete updated[key];
    }
  }
  return updated;
}
