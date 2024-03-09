import { Chance } from "chance";
import {
  Monster,
  classes,
  habitats,
  natures,
  roleInHabitats,
  types,
} from "./model";
import { nanoid } from "@reduxjs/toolkit";
import { OobaClient } from "../../gpt/ooba-client";
const chance = new Chance();

export function setBingCookie(cookie: string) {}

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
  Hello worldbuilding expert. Help me fill in the blanks to finish the following monster entry. Do not ask questions.
  # Beastiary entry
  - class: ${monster.class}
  - type: ${monster.type}
  - nature: ${monster.nature}
  - habitat: ${monster.habitat}
  - role in habitat: ${monster.roleInHabitat}
  - name: 
  - appearance: 
  - description:
  `;
  return prompt;
}

export async function generateDetail(monster: Monster) {
  const prompt = generatePrompt(monster);
  const msg = await OobaClient.chatCompletions({
    messages: [{ role: "user", content: prompt }],
    max_tokens: 400,
    instruction_template: "Alpaca",
    stream: false,
    mode: "instruct",
  });
  console.debug("gpt response", msg);
  return msg.choices[0].message.content;
}
