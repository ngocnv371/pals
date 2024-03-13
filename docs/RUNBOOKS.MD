# get updated pals.json from Palworld

This `pals.json` is not really from Palworld, not directly but rather from [https://www.palpedia.net/]. Go there and grab it.

# get updated combinations.json

Do it the same.

# generate new card

TBD.

# get locations

Visit [https://game8.co/games/Palworld/archives/440117] and get it from each table.

```js
const bag = [];
$0.querySelectorAll("tr").forEach((tr) => {
  if (!tr) {
    return;
  }

  const first = tr.querySelector("td:nth-child(1)");
  const second = tr.querySelector("td:nth-child(2)");
  if (!first || !second) {
    return;
  }

  bag.push({
    name: first.innerText,
    level: +second.innerText,
  });
});
bag;
```
