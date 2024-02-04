import data from "../../data/entities.json";
import pals from "../../data/pals.json";
import Metadata from "../../models/metadata";

export default function getMetadata(id: string): Metadata | undefined {
  return data.find((d) => id === d.id);
}

export function getPalMetadata(id: string) {
  return pals.find((p) => p.id == id);
}
