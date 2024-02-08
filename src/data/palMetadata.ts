import { buildMapByKey } from "../utils/buildMap";
import palMetadata from "./pals.json";

const cachedPals = buildMapByKey(palMetadata, "title");

export default function getPalMetadata(key: string) {
  return cachedPals[key];
}
