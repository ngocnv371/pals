import { Base } from "../../models/base";
import Facility from "../../models/facility";

export function getBaseById(bases: Base[], id: string): Base | undefined {
  return bases.find((b) => b.id == id);
}

export function getFacilityById(
  bases: Base[],
  baseId: string,
  facilityId: string
): Facility | undefined {
  const base = getBaseById(bases, baseId);
  if (!base) {
    return undefined;
  }

  return base.facilities.find((f) => f.id == facilityId);
}
