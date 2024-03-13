import dungeons from "../../data/dungeons.json";
import { Dungeon } from "./model";

export function getAllDungeons() {
  return dungeons as Dungeon[];
}
