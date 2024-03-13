import fs from "fs";
import pals from "./pals.json" assert { type: "json" };
import dungeons from "./dungeons.json" assert { type: "json" };

console.debug("all pals", pals.length);

function title2id(title) {
  return pals.find((p) => p.title == title).id;
}

const transformed = dungeons.map((d) => {
  return { ...d, wilds: d.wilds.map(title2id), bosses: d.bosses.map(title2id) };
});

console.debug("peek first one", transformed[0]);

const json = JSON.stringify(transformed);
console.debug("serialized data length", json.length);

const filePath = "../src/data/dungeons.json";
fs.writeFile(filePath, json, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.debug(`file written to ${filePath}`);
});
