import { Chance } from "chance";
import { DeckItem } from "./model";
import { nanoid } from "@reduxjs/toolkit";
import { getAllPals } from "../pals/service";

const chance = new Chance();

export function generateItem(): DeckItem {
  return {
    id: nanoid(),
    type: chance.pickone(getAllPals().filter((p) => p.rarity < 5)).id,
  };
}
