export const classes = [
  "Common",
  "Superior",
  "Elite",
  "Legendary",
  "Mythical",
  "Primordial",
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

export const habitats = [
  "Desert",
  "Forest",
  "Mountain",
  "Ocean",
  "River",
  "Lake",
  "Swamp",
  "Tundra",
  "Volcano",
  "Cave",
  "Ruins",
  "Village",
  "City",
  "Graveyard",
  "Abyss",
  "Dreamscape",
  "Wasteland",
  "Sky",
];

export const roleInHabitats = [
  "Hunter",
  "Prey",
  "Scavenger",
  "Ruler",
  "Guardian",
  "Guide",
  "Trickster",
  "Hermit",
  "Stalker",
];

export interface Monster {
  id: string;
  name: string;
  class: string;
  type: string;
  nature: string;
  appearance: string;
  description: string;
  habitat: string;
  roleInHabitat: string;
}
