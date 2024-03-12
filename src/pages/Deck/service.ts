import { Chance } from "chance";
import pals from "../../data/pals.json";
import { DeckItem } from "./model";
import { nanoid } from "@reduxjs/toolkit";

const chance = new Chance();

export function generateItem(): DeckItem {
  return {
    id: nanoid(),
    type: chance.pickone(pals.filter((p) => p.rarity < 5)).id,
  };
}
