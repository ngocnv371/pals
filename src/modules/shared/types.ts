export interface Blueprint {
  id: string;
  name: string;
  description: string;
  /**
   * amount of work needed to produce item
   * */
  work: number;
  slots: number;
  /**
   * the result of production
   */
  products: Inventory;
  /**
   * items used in production to produce products
   */
  ingredients: Inventory;
  /**
   * items need to pay to construct this building
   */
  price: Inventory;
  /**
   * skills required to work at this building
   */
  skills: WorkSkillSet;
}

export interface Building {
  id: string;
  blueprintId: string;
  workers: string[];
  status?: ProductionStatus;
}

export interface ProductionStatus {
  /**
   * amount of work accumulated from all assigned beasts
   */
  work: number;
  paused: boolean;
  /**
   * the ingredients are satisfied and consumed
   */
  paid: boolean;
}

export interface Item {
  id: string;
  name: string;
}

export type SkillType =
  | "cooling"
  | "farming"
  | "gathering"
  | "generatingElectricity"
  | "handiwork"
  | "kindling"
  | "lumbering"
  | "medicineProduction"
  | "mining"
  | "planting"
  | "transporting"
  | "watering";

export interface ItemInfo {
  name: string;
  description?: string;
  [key: string]: any;
}

export type InventoryItem =
  | number
  | {
      type: string;
      quantity: number;
      [key: string]: any; // for extra properties like eggType, etc.
    };

export type Inventory = Record<string, InventoryItem>;
export type WorkSkillSet = Record<string, number>;

/**
 * define the base data of the specie
 */
export interface Pal {
  id: string;
  types: string[];
  name: string;
  description: string;
  workSpeed: number;
  attack: number;
  defense: number;
  rarity: number;
  price: number;
  image: string;
  breedingPower: number;
  workSkills: WorkSkillSet;
}

/**
 * represent an instance of a Pal, once caught will have its own generated id
 */
export interface Beast {
  id: string;
  pal: string;
  name: string;
  level: number;
}

export interface CageSlice {
  beasts: Beast[];
  addBeast: (beast: Beast) => void;
  removeBeast: (id: string) => void;
}

export type HideoutSlice = {
  buildings: Building[];
  canConstructBuilding: (blueprintId: Blueprint["id"]) => boolean;
  constructBuilding: (blueprintId: Blueprint["id"]) => Building;
  removeBuilding: (buildingId: string) => void;
  getIsBeastAvailable: (id: string) => boolean;
  assignWorker: (buildingId: string, index: number, workerId: string) => void;
};

export interface InventorySlice {
  inventory: Inventory;
  addItems: (items: Inventory) => void;
  canRemoveItems: (items: Inventory) => boolean;
  removeItems: (items: Inventory) => void;
}

export interface BreedingSlice {
  maleBeastId: string;
  femaleBeastId: string;
  setMale: (beastId: string) => void;
  setFemale: (beastId: string) => void;
  canBreed: () => boolean;
  breed: () => Beast | null;
}

export interface UISlice {
  showTabs: boolean;
  setShowTabs: (show: boolean) => void;
}

export interface GameLoopSlice {
  /**
   * not time from `new Date().getTime()`, but the total time accumulated from `deltaMs` when `update`
   */
  lastUpdateTime: number;
  /**
   * update the app as if `deltaMs` time has ellapsed
   * @param deltaMs ellapsed milliseconds
   */
  update: (deltaMs: number) => void;
}

export type AppState = HideoutSlice &
  InventorySlice &
  CageSlice &
  BreedingSlice &
  GameLoopSlice &
  UISlice;

export interface UniqueItem {
  id: string;
  /**
   * indicates what this is, ex: Egg
   */
  type: string;
}

export interface Egg extends UniqueItem {
  /**
   * indicates which beasts can be hatched from this egg
   */
  element: string;
  breedingPower: number;
  /**
   * the pool of possible traits from the parents
   */
  heritableTraits: string[];
}
