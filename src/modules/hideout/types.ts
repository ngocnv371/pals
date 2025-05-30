export interface BuildingType {
  id: string;
  name: string;
  description: string;
  /**
   * amount of work needed to produce item
   * */
  work: number;
}
export interface Building {
  id: string;
  /**
   * reference to #BuildingType
   */
  type: string;
  workers: string[];
  /**
   * amount of work accumulated from all assigned beasts
   */
  work: number;
}
