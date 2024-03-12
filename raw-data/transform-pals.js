import fs from "fs";
import pals from "./pals.json" assert { type: "json" };

console.debug("pals", pals.length);

const filtered = pals.filter((p) => !p.isBoss);
console.debug("filtered", filtered.length);

const transformed = filtered.map((p) => ({
  id: p.id,
  title: p.title,
  attack: p.baseAttack,
  defense: p.defense,
  types: p.type,
  description: p.description,
  price: p.price,
  image: p.image,
  rarity: p.rarity,
}));

console.debug("peek first one", transformed[0]);

const json = JSON.stringify(transformed);
console.debug("json length", json.length);

const filePath = "../src/data/pals.json";
fs.writeFile(filePath, json, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.debug(`file written to ${filePath}`);
});
