export interface BuildingType {
  id: string;
  name: string;
  description: string;
}
export interface Building {
  id: string;
  type: string;
  beasts: string[];
}
