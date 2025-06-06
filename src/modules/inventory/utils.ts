import { Inventory } from "../shared/types";

export function addInventory(inventory: Inventory, items: Inventory) {
  const updated = { ...inventory };
  for (const key in items) {
    if (typeof items[key] === "number") {
      const existing = updated[key] as number;
      updated[key] = (existing || 0) + items[key];
    } else {
      updated[key] = items[key];
    }
  }
  return updated;
}

export function canRemoveInventory(inventory: Inventory, items: Inventory) {
  for (const key in items) {
    if (typeof items[key] === "number") {
      const existing = inventory[key] as number;
      if (!existing || existing < items[key]) {
        return false; // not enough of this item
      }
    } else {
      if (!inventory[key]) {
        return false; // item not found
      }
    }
  }
  return true; // all items can be removed
}

export function removeInventory(inventory: Inventory, items: Inventory) {
  const updated = { ...inventory };
  for (const key in items) {
    if (typeof items[key] === "number") {
      const existing = updated[key] as number;
      if (existing && existing >= items[key]) {
        updated[key] = existing - items[key];
      } else {
        delete updated[key]; // remove item if quantity goes to zero
      }
    } else {
      delete updated[key]; // remove item if it's an object
    }
  }
  return updated;
}
