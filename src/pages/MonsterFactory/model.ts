export const classes = [
  "Starter",
  "Regular",
  "Superior",
  "Emissary",
  "Zenith",
  "Legendary",
  "Ancient",
];

export const types = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Light",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
];

export const natures = [
  "Aggressive",
  "Blitz",
  "Blockhead",
  "Bullet",
  "Butcher",
  "Calm",
  "Dauntless",
  "Debonair",
  "Discreet",
  "Endurable",
  "Hallucination",
  "Hasty",
  "Impenetrable",
  "Intelligent",
  "Lazy",
  "Mirage",
  "Momentum",
  "Mystic",
  "Potential",
  "Profound",
  "Quantum",
  "Reaper",
  "Sage",
  "Savage",
  "Sedate",
  "Specialized",
  "Spooky",
  "Stalwart",
  "Steadfast",
  "Supreme",
  "Tank",
  "Trembling",
  "Verve",
  "Vigorous",
  "Wail",
  "Wise",
];

export interface Monster {
  id: string;
  name: string;
  class: string;
  type: string;
  nature: string;
  description: string;
}
