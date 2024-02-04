import Gender from "./gender";

export default interface Pal {
  id: string;
  specieId: string;
  level: number;
  gender: Gender;
}
