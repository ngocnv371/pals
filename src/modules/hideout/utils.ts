import { Building, Blueprint } from "../shared/types";
import facilities from "../../data/facilities.json";
import { nanoid } from "nanoid";

export const typedFacilities: Record<string, Blueprint> = facilities;
export function getBuildingType(typeId: string): Blueprint {
  return typedFacilities[typeId];
}

export function getBuildingInfo(
  buildings: Building[],
  id: string
): (Building & Blueprint) | null {
  const building = buildings.find((b) => b.id == id);
  if (!building) {
    return null;
  }

  const type = typedFacilities[building.blueprintId] as Blueprint;
  return { ...type, ...building };
}

export function getBlueprint(id: string) {
  return typedFacilities[id];
}

export function createBuilding(typeId: string) {
  const type = typedFacilities[typeId];
  return {
    id: nanoid(),
    blueprintId: typeId,
    work: 0,
    workers: Array(type.slots).fill(""),
  } as Building;
}
