import Item from "./item";

export default interface Recipe {
  id: string;
  ingredients: Item[];
  produce: Item;
  work: number;
}
