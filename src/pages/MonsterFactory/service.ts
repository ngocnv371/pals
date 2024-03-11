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
import { ChatCompletionMessage } from "../GPT/model";
import { getGpt } from "../GPT/service";
const chance = new Chance();

export function generateMonsters(n: number, className?: string) {
  return chance.n(() => generateMonster(className), n);
}

export function generateMonster(className?: string): Monster {
  // don't generate the crazy ones
  const [mythical, primordial, ...simpleClasses] = classes.slice().reverse();
  return {
    id: nanoid(),
    name: "",
    appearance: "",
    abilities: "",
    behavior: "",
    habitat: chance.pickone(habitats),
    roleInHabitat: chance.pickone(roleInHabitats),
    class: className || chance.pickone(simpleClasses),
    nature: chance.pickone(natures),
    type: chance.pickone(types),
  };
}

const pendingMonster: Monster = {
  id: "pending",
  name: "",
  appearance: "",
  abilities: "",
  behavior: "",
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
    "\
A fierce beast with electrical feathers and talons hunting across the tundra,\
lit by the aurora borealis, detailed, realistic.",
  abilities:
    "\
Powerful wings for high altitude spotting and swooping prey.\
Razor sharp beak and claws.\
Feathers and fur generate weak electric charges to stun small prey.\
",
  behavior:
    "\
Solitary and highly territorial .",
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
  - abilities:
  - behavior:
  - appearance: [insert text-to-image prompt]
  `.trim();
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
  - abilities: ${monster.abilities}
  - behavior: ${monster.behavior}
  - appearance: ${monster.appearance}
  `.trim();
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
  const keys = ["- name:", "- abilities:", "- behavior:", "- appearance:"];
  const [, relevantText] = content.split(keys[0]);
  if (!relevantText) {
    console.error("failed to extract relevant parts", content);
    return;
  }

  let stripped = relevantText;
  keys.forEach((k) => (stripped = stripped.replace(k, keys[0])));

  const [name, abilities, behavior, appearance] = stripped
    .split(keys[0])
    .map((s) => s.trim());
  return {
    name,
    abilities,
    behavior,
    appearance,
  };
}

export async function generateDetail(monster: Monster) {
  const messages = generateMessages(monster);
  const msg = await getGpt().chatCompletions({
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

export async function parseFiles(files: FileList) {
  function parseFile(file: File) {
    return new Promise<any>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        console.debug("file reader loaded", file.name);
        try {
          const text = fileReader.result as string;
          const data = JSON.parse(text);
          resolve(data);
        } catch (err) {
          console.debug("failed too parse file", file.name, err);
        }
      };
      fileReader.readAsText(file);
    });
  }

  for (let i = 0; i < files.length; i++) {
    parseFile(files[i]);
  }

  const results = await Promise.allSettled([...files].map(parseFile));

  return results
    .filter((r) => r.status === "fulfilled")
    .map((r: any) => r.value);
}

const STORAGE_KEY = "beastiary";

export function saveData(data: any) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadData(): any {
  const json = window.localStorage.getItem(STORAGE_KEY);
  if (!json) {
    return null;
  }

  return JSON.parse(json);
}
