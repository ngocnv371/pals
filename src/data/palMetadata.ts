import { buildMapByFieldMany, buildMapByKey } from "../utils/buildMap";
import palMetadata from "./pals.json";

const cachedPals = buildMapByKey(palMetadata, "title");
const cachedPalsById = buildMapByKey(palMetadata, "id");
const indexedByType = buildMapByFieldMany(palMetadata, (v) => v.types);

export function getPalsByType(type: string) {
  return indexedByType[type];
}

export function getPalMetadataById(id: string) {
  return cachedPalsById[id];
}

export default function getPalMetadata(title: string) {
  return cachedPals[title];
}
