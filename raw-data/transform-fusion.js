import fs from "fs";
import combinations from "./combinations.json" assert { type: "json" };

console.debug("combinations", combinations.length);

const cached = buildIndex();

function buildIndex() {
  const bag = {};
  combinations.forEach((c) => {
    if (bag[c.parent1Name]) {
      bag[c.parent1Name][c.parent2Name] = c.childName;
    } else {
      bag[c.parent1Name] = { [c.parent2Name]: c.childName };
    }
  });
  return bag;
}

const json = JSON.stringify(cached);
console.debug("json length", json.length);

const filePath = "../src/data/fusion.json";
fs.writeFile(filePath, json, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.debug(`file written to ${filePath}`);
});
