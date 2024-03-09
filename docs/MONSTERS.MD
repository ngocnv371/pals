# monsters

Example:

- Name: Thunderwolf
- Class: Regular
- Type: Electric, Fighting
- Nature: Blitz

# class

- Starter
- Regular
- Superior
- Emissary
- Zenith
- Legendary
- Ancient

# attack effectiveness matrix

- A type chart shows which modifiers are applied to move types when attacking Monster of each type.
- Please note that this only covers single types, not pairs.
- To get a dual-type Monster's matchup against a specific move type, go across the table's columns to each of the types, see what the effectiveness of the move is against both, and multiply the effectiveness together: in this way a Dragon-type move would hit for 0.25x damage on a Light/Steel Monster, while a Psychic-type move used against the same would do a 2x of its normal damage.

| Attack → Defense ↴ | Bug | Dark | Dragon | Electric | Fighting | Fire | Flying | Ghost | Grass | Ground | Ice | Light | Normal | Poison | Psychic | Rock | Steel | Water |
| ------------------ | --- | ---- | ------ | -------- | -------- | ---- | ------ | ----- | ----- | ------ | --- | ----- | ------ | ------ | ------- | ---- | ----- | ----- |
| Bug                | 1   | 1    | 1      | 1        | 0.5      | 2    | 2      | 1     | 1     | 0.5    | 1   | 1     | 1      | 1      | 1       | 2    | 1     | 1     |
| Dark               | 1   | 0.5  | 1      | 1        | 2        | 1    | 1      | 0.5   | 1     | 1      | 1   | 2     | 1      | 1      | 0       | 1    | 1     | 1     |
| Dragon             | 0.5 | 1    | 2      | 0.5      | 1        | 0.5  | 1      | 1     | 0.5   | 1      | 2   | 2     | 1      | 1      | 1       | 1    | 1     | 0.5   |
| Electric           | 1   | 1    | 1      | 0.5      | 1        | 1    | 0.5    | 1     | 1     | 2      | 1   | 0.5   | 1      | 1      | 1       | 1    | 0.5   | 1     |
| Fighting           | 0.5 | 0.5  | 1      | 1        | 1        | 1    | 2      | 1     | 1     | 1      | 1   | 1     | 1      | 1      | 2       | 0.5  | 1     | 1     |
| Fire               | 0.5 | 1    | 1      | 1        | 1        | 0.5  | 1      | 1     | 0.5   | 2      | 0.5 | 1     | 1      | 1      | 1       | 2    | 0.5   | 2     |
| Flying             | 0.5 | 1    | 1      | 2        | 0.5      | 1    | 1      | 1     | 0.5   | 0      | 2   | 1     | 1      | 1      | 1       | 2    | 1     | 1     |
| Ghost              | 1   | 2    | 1      | 1        | 0        | 1    | 1      | 2     | 1     | 1      | 1   | 2     | 0      | 0.5    | 1       | 1    | 1     | 1     |
| Grass              | 2   | 1    | 1      | 0.5      | 1        | 2    | 2      | 1     | 0.5   | 0.5    | 2   | 1     | 1      | 2      | 1       | 1    | 1     | 0.5   |
| Ground             | 1   | 1    | 1      | 0        | 1        | 1    | 1      | 1     | 2     | 1      | 2   | 1     | 1      | 0.5    | 1       | 0.5  | 1     | 2     |
| Ice                | 1   | 1    | 1      | 1        | 2        | 2    | 1      | 1     | 1     | 1      | 0.5 | 1     | 1      | 1      | 1       | 2    | 2     | 1     |
| Light              | 1   | 2    | 0.5    | 1        | 1        | 1    | 1      | 2     | 1     | 1      | 1   | 0.5   | 1      | 1      | 1       | 1    | 1     | 1     |
| Normal             | 1   | 1    | 1      | 1        | 2        | 1    | 1      | 0     | 1     | 1      | 1   | 1     | 1      | 1      | 1       | 1    | 1     | 1     |
| Poison             | 0.5 | 1    | 1      | 1        | 0.5      | 1    | 1      | 1     | 0.5   | 2      | 1   | 1     | 1      | 0.5    | 2       | 1    | 1     | 1     |
| Psychic            | 2   | 2    | 1      | 1        | 0.5      | 1    | 1      | 2     | 1     | 1      | 1   | 0.5   | 1      | 1      | 0.5     | 1    | 1     | 1     |
| Rock               | 1   | 1    | 1      | 1        | 2        | 0.5  | 0.5    | 1     | 2     | 2      | 2   | 1     | 0.5    | 0.5    | 1       | 1    | 2     | 2     |
| Steel              | 0.5 | 0.5  | 0.5    | 1        | 2        | 2    | 0.5    | 0.5   | 0.5   | 2      | 0.5 | 1     | 0.5    | 0      | 0.5     | 0.5  | 0.5   | 1     |
| Water              | 1   | 1    | 1      | 2        | 1        | 0.5  | 1      | 1     | 2     | 1      | 0.5 | 1     | 1      | 1      | 1       | 1    | 0.5   | 0.5   |

# natures

- Each nature has different stat modifiers
- Example a monster with 100 stats for HP, Attack, Defense, SpAttack, SpDefense, Speed
- If the nature is modfiyng 30% HP, -20% Attack, 40% Defense, 10% SpAttack, -20% SpDefense, -40% Speed
- The monster stats would be 130 HP, 80 Attack, 140 Defense, 110 SpAttack, 80 SpDefense, 60 Speed
- All natures stat changes sum always equal to 0

| ID  | Nature Name   | Hit Points (HP) | Attack Stat | Defense Stat | SpAttack Stat | SpDefense Stat | Speed Stat |
| --- | ------------- | --------------- | ----------- | ------------ | ------------- | -------------- | ---------- |
| 1   | Aggressive    | -60%            | 60%         | -60%         | 60%           | -60%           | 60%        |
| 2   | Blitz         | 0%              | 40%         | -60%         | 40%           | -60%           | 40%        |
| 3   | Blockhead     | 0%              | -60%        | 60%          | -60%          | 60%            | 0%         |
| 4   | Bullet        | -30%            | 40%         | 10%          | -50%          | 10%            | 20%        |
| 5   | Butcher       | 0%              | 60%         | 30%          | -60%          | 30%            | -60%       |
| 6   | Calm          | 40%             | -60%        | 20%          | 40%           | 20%            | -60%       |
| 7   | Dauntless     | 30%             | -30%        | -60%         | 50%           | 50%            | -40%       |
| 8   | Debonair      | 40%             | -40%        | 30%          | -40%          | 30%            | -20%       |
| 9   | Discreet      | 40%             | -30%        | 30%          | -30%          | 30%            | -40%       |
| 10  | Endurable     | 30%             | -20%        | 30%          | -40%          | 30%            | -30%       |
| 11  | Hallucination | 60%             | -60%        | -60%         | 60%           | -60%           | 60%        |
| 12  | Hasty         | -40%            | 40%         | -60%         | 40%           | -40%           | 60%        |
| 13  | Impenetrable  | -10%            | -30%        | 50%          | -30%          | 50%            | -30%       |
| 14  | Intelligent   | 30%             | -50%        | -30%         | 40%           | 40%            | -30%       |
| 15  | Lazy          | 60%             | -40%        | 0%           | -20%          | 60%            | -60%       |
| 16  | Mirage        | 0%              | 40%         | 10%          | -60%          | 10%            | 0%         |
| 17  | Momentum      | 0%              | 40%         | 40%          | -40%          | -40%           | 0%         |
| 18  | Mystic        | 0%              | -40%        | 40%          | 40%           | -40%           | 0%         |
| 19  | Potential     | -20%            | 50%         | -60%         | 50%           | -60%           | 40%        |
| 20  | Profound      | 40%             | -60%        | 50%          | -50%          | 60%            | -40%       |
| 21  | Quantum       | 0%              | -40%        | -40%         | 40%           | 40%            | 0%         |
| 22  | Reaper        | 0%              | 40%         | 40%          | -60%          | 40%            | -60%       |
| 23  | Sage          | 0%              | -40%        | 20%          | 40%           | 20%            | -40%       |
| 24  | Savage        | -10%            | 60%         | -40%         | 60%           | -50%           | -20%       |
| 25  | Sedate        | 20%             | -10%        | 20%          | -30%          | 20%            | -20%       |
| 26  | Specialized   | 0%              | -60%        | 20%          | 50%           | 50%            | -60%       |
| 27  | Spooky        | 20%             | -60%        | 10%          | 60%           | 30%            | -60%       |
| 28  | Stalwart      | 30%             | 50%         | 50%          | -30%          | -60%           | -40%       |
| 29  | Steadfast     | 0%              | 0%          | 0%           | 0%            | 0%             | 0%         |
| 30  | Supreme       | 40%             | 50%         | 50%          | -50%          | -50%           | -40%       |
| 31  | Tank          | 0%              | -60%        | 40%          | 40%           | 40%            | -60%       |
| 32  | Trembling     | 60%             | 60%         | -60%         | -60%          | -60%           | 60%        |
| 33  | Verve         | 10%             | 50%         | -10%         | -60%          | 30%            | -20%       |
| 34  | Vigorous      | -60%            | 60%         | -60%         | -60%          | 60%            | 60%        |
| 35  | Wail          | -20%            | -60%        | 30%          | 50%           | -10%           | 10%        |
| 36  | Wise          | 30%             | -30%        | 30%          | -30%          | 30%            | -30%       |
