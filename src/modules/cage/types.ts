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
