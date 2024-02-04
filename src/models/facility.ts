import Recipe from "./recipe";

export default interface Facility {
  id: string;
  recipes: Recipe[];
}
