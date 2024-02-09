import buildMap from "../utils/buildMap";
import recipes from "./recipes.json";

export function getRecipes(facility: string) {
  return recipes.filter((r) => r.facility == facility);
}

const indexedItems = buildMap(recipes);
export function getRecipeById(id: string) {
  return indexedItems[id];
}
