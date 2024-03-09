import { Chance } from "chance";
import { BingChat } from "bing-chat";
import {
  Monster,
  classes,
  habitats,
  natures,
  roleInHabitats,
  types,
} from "./model";
import { nanoid } from "@reduxjs/toolkit";
const chance = new Chance();
let api: BingChat;

export function setBingCookie(cookie: string) {
  api = new BingChat({
    cookie,
  });
}

export function generateMonster(): Monster {
  return {
    id: nanoid(),
    name: "",
    description: "",
    habitat: chance.pickone(habitats),
    roleInHabitat: chance.pickone(roleInHabitats),
    class: chance.pickone(classes),
    nature: chance.pickone(natures),
    type: chance.pickone(types),
  };
}

export function generatePrompt(monster: Monster): string {
  const prompt = `
  Imagine a monster like this:
  - class: ${monster.class}
  - type: ${monster.type}
  - nature: ${monster.nature}
  - habitat: ${monster.habitat}
  - role in habitat: ${monster.roleInHabitat}

  What is its name? and what does it look like?
  `;
  return prompt;
}

export function generateDetail(monster: Monster) {
  //
}
