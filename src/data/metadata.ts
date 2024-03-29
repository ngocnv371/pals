import buildMap from "../utils/buildMap";
import metadata from "./entities.json";

const cached = buildMap(metadata);

export const entities = metadata

export default function getMetadata(id: string) {
  return cached[id];
}
