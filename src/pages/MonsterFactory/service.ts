import { Chance } from "chance";
import { Monster, classes, natures, types } from "./model";
const chance = new Chance();

export function generateMonster(): Monster {
  return {
    name: "?",
    description: "",
    class: chance.pickone(classes),
    nature: chance.pickone(natures),
    type: chance.pickone(types),
  };
}
