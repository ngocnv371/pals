import Gender from "./gender";

export default interface Pal {
  id: string;
  type: string;
  level: number;
  gender: Gender;
}
