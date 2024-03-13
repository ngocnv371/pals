# raw data

This folder contains files that are imported from somewhere else. They're not going into the build.

The scripts included in this folder are `transformers` to transform the raw data into usable format.

Run them with `nodejs`.

- `node ./transform-pals.js` -> [pals.json](../src/data/pals.json)
- `node ./transform-fusion.js` -> [fusion.json](../src/data/fusion.json)
- `node ./transform-dungeons.js` -> [dungeons.json](../src/data/dungeons.json)
