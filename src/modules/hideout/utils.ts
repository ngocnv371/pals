import { Building, BuildingType } from "../shared/types";
import facilities from "../../data/facilities.json";
import { nanoid } from "nanoid";

const typedFacilities: Record<string, BuildingType> = facilities;
export function getBuildingType(typeId: string): BuildingType {
  return typedFacilities[typeId];
}

export function getBuildingInfo(
  buildings: Building[],
  id: string
): (Building & BuildingType) | null {
  const building = buildings.find((b) => b.id == id);
  if (!building) {
    return null;
  }

  const type = typedFacilities[building.type] as BuildingType;
  return { ...type, ...building };
}

export function createBuilding(typeId: string) {
  const type = typedFacilities[typeId];
  return {
    id: nanoid(),
    type: typeId,
    work: 0,
    workers: Array(type.slots).fill(""),
  } as Building;
}
