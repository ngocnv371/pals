import fs from "fs";
import pals from "./pals.json" assert { type: "json" };

console.debug("all pals", pals.length);

const filtered = pals.filter((p) => !p.content.isBoss);
console.debug("filtered length", filtered.length);

// transform to useful format
const transformed = filtered.map((p) => ({
  id: p.id,
  name: p.title,
  attack: p.content.baseAttack,
  defense: p.content.defense,
  types: p.content.type,
  description: p.content.description,
  price: p.content.price,
  image: p.content.image,
  rarity: p.content.rarity,
}));

console.debug("peek first one", transformed[0]);

// convert to entity map
const ids = transformed.map((t) => t.id);
const entities = {};
transformed.forEach((t) => (entities[t.id] = t));
const state = { ids, entities };
console.debug("all pals ids:", ids.join(", "));

const json = JSON.stringify(state);
console.debug("serialized data length", json.length);

const filePath = "../src/data/pals.json";
fs.writeFile(filePath, json, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.debug(`file written to ${filePath}`);
});
