import { buildMapByField, buildMapByFieldMany, buildMapByKey } from "../utils/buildMap";
import palMetadata from "./pals.json";

const cachedPals = buildMapByKey(palMetadata, "title");
const indexedByType = buildMapByFieldMany(palMetadata, v => v.content.type);

export function getPalsByType(type: string) {
  return indexedByType[type];
}

export default function getPalMetadata(key: string) {
  return cachedPals[key];
}
