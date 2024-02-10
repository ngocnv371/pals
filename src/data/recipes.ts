import buildMap, { buildMapByField, buildMapByKey } from "../utils/buildMap";
import recipes from "./recipes.json";

export function getRecipes(facility: string) {
  return recipes.filter((r) => r.facility == facility);
}

const indexedItems = buildMap(recipes);
const indexedByFacility = buildMapByField(recipes, 'facility')

export function getRecipesByFacility(facility: string) {
  return indexedByFacility[facility]
}

export function getRecipeById(id: string) {
  return indexedItems[id];
}
