import { Chance } from "chance";
import { BookItem } from "./model";
import { nanoid } from "@reduxjs/toolkit";
import { getAllPals } from "../pals/service";

const chance = new Chance();

export function generateItem(): BookItem {
  return {
    id: nanoid(),
    cardId: chance.pickone(getAllPals().filter((p) => p.rarity < 5)).id,
  };
}
