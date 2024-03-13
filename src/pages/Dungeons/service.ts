import dungeons from "../../data/dungeons.json";
import { Dungeon } from "./model";

export function getAllDungeons() {
  return dungeons as Dungeon[];
}

export function getDungeon(type: string) {
  return (dungeons as Dungeon[]).find((d) => d.type == type);
}
