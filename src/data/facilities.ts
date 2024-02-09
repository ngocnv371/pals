import { buildMapByKey } from "../utils/buildMap";
import items from "./facilities.json";

const indexedItems = buildMapByKey(items, 'name');

export function getAllFacilityTypes() {
  return items;
}

export function getFacilityType(type: string) {
  return indexedItems[type];
}
