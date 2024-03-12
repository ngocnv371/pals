import fs from "fs";
import combinations from "./combinations.json" assert { type: "json" };
import pals from "./pals.json" assert { type: "json" };
console.debug("combinations", combinations.length);

function buildPalsTitleIndex() {
  const bag = {};
  pals.forEach((p) => (bag[p.title] = p));
  return bag;
}

const indexedPals = buildPalsTitleIndex();

function buildFusionIndex() {
  const bag = {};
  combinations.forEach((c) => {
    const _id1 = indexedPals[c.parent1Name].id;
    const _id2 = indexedPals[c.parent2Name].id;
    const [id1, id2] = [_id1, _id2].sort();
    const id3 = indexedPals[c.childName].id;

    if (bag[id1]) {
      bag[id1][id2] = id3;
    } else {
      bag[id1] = { [id2]: id3 };
    }
  });
  return bag;
}

const indexedFusion = buildFusionIndex();

const json = JSON.stringify(indexedFusion);
console.debug("serialized data length", json.length);

const filePath = "../src/data/fusion.json";
fs.writeFile(filePath, json, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.debug(`file written to ${filePath}`);
});
