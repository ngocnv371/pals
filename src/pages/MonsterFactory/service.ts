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
import { ChatCompletionMessage } from "../../gpt/model";
const chance = new Chance();

export function setBingCookie(cookie: string) {}

export function generateMonster(): Monster {
  return {
    id: nanoid(),
    name: "",
    appearance: "",
    description: "",
    habitat: chance.pickone(habitats),
    roleInHabitat: chance.pickone(roleInHabitats),
    class: chance.pickone(classes),
    nature: chance.pickone(natures),
    type: chance.pickone(types),
  };
}

const pendingMonster: Monster = {
  id: "pending",
  name: "",
  appearance: "",
  description: "",
  class: "Regular",
  type: "Electric",
  nature: "Endurable",
  habitat: "Tundra",
  roleInHabitat: "Hunter",
};

const completeMonster: Monster = {
  id: "complete",
  name: "Snowgryph",
  appearance:
    "This creature has the front legs and head of a snowy owl and the hindquarters and wings of a snow leopard. Its plumage and fur are a pristine white to help it camouflage in snow drifts. Icy blue eyes peek out from beneath its feathered brows.",
  description:
    "The Snowgryph is a formidable hunter across the tundra. Well adapted for stealth hunting, it can spot prey from high altitudes and swoop down silently to capture them in its powerful talons. Its fur and feathers are infused with an ability to generate weak electric charges, enough to stun smaller prey. Larger creatures face the Snowgryph's razor sharp beak and claws. Solitary by nature, the Snowgryph defends its territory fiercely from other predators.",
  class: "Regular",
  type: "Electric",
  nature: "Endurable",
  habitat: "Tundra",
  roleInHabitat: "Hunter",
};

const instruction = `Fill in the blanks to finish the following monster entry:`;

function createPendingBeastiaryEntry(
  monster: Monster,
  role: string,
  instruction: string
): ChatCompletionMessage {
  const content = `${instruction}
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
  return {
    role,
    content,
  };
}

function createCompleteBeastiaryEntry(
  monster: Monster,
  role: string,
  instruction: string
): ChatCompletionMessage {
  const content = `${instruction}
  # Beastiary entry
  - class: ${monster.class}
  - type: ${monster.type}
  - nature: ${monster.nature}
  - habitat: ${monster.habitat}
  - role in habitat: ${monster.roleInHabitat}
  - name: ${monster.name}
  - appearance: ${monster.appearance}
  - description: ${monster.description}
  `;
  return {
    role,
    content,
  };
}

export function generateMessages(monster: Monster): ChatCompletionMessage[] {
  return [
    createPendingBeastiaryEntry(pendingMonster, "user", instruction),
    createCompleteBeastiaryEntry(completeMonster, "assistant", ""),
    createPendingBeastiaryEntry(monster, "user", instruction),
  ];
}

export function extractInfo({ content }: ChatCompletionMessage) {
  const key0 = "- name:";
  const key1 = "- appearance:";
  const key2 = "- description:";
  const [, relevantText] = content.split(key0);
  if (!relevantText) {
    console.error("failed to extract relevant parts", content);
    return;
  }

  const stripped = relevantText.replace(key1, key0).replace(key2, key0);

  const [name, appearance, description] = stripped
    .split(key0)
    .map((s) => s.trim());
  return {
    name,
    appearance,
    description,
  };
}

export async function generateDetail(monster: Monster) {
  const messages = generateMessages(monster);
  const msg = await OobaClient.chatCompletions({
    messages,
    max_tokens: 400,
    instruction_template: "Alpaca",
    stream: false,
    mode: "instruct",
  });
  console.debug("gpt response", msg);
  const lastMessage = msg.choices[msg.choices.length - 1].message;
  return lastMessage;
}
