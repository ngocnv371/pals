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

export interface Item {
  id: string;
  name: string;
}

export type Inventory = Record<string, number>;

/**
 * define the base data of the specie
 */
export interface Pal {
  id: string;
  types: string[];
  name: string;
  description: string;
  attack: number;
  defense: number;
  rarity: number;
  price: number;
  image: string;
  breedingPower: number;
}

/**
 * represent an instance of a Pal, once caught will have its own generated id
 */
export interface Beast {
  id: string;
  pal: string;
  name: string;
  level: number;
  building: string;
}

export interface CageState {
  beasts: Beast[];
  setBeasts: (beasts: Beast[]) => void;
  addBeast: (beast: Beast) => void;
  removeBeast: (id: string) => void;
  clearDuty: (id: string) => void;
  assignDuty: (id: string, building: string) => void;
}

export type UseBuildingsState = {
  buildings: Building[];
  createBuilding: (typeId: BuildingType["id"]) => Building;
  assignWorker: (buildingId: string, index: number, beastId: string) => void;
  removeBuilding: (buildingId: string) => void;
  update: (ms: number) => void;
};

export interface InventoryState {
  inventory: Inventory;
  add: (items: Inventory) => void;
  canRemove: (items: Inventory) => boolean;
  remove: (items: Inventory) => void;
  set: (items: Inventory) => void;
  clear: () => void;
}
