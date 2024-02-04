import React, { useState } from "react";
import AppContext from "./Context";
import { Base } from "../../models/base";
import Pal from "../../models/pal";
import { nanoid } from "nanoid";
import pals from "../../data/pals.json";
import Chance from "chance";
const chance = Chance();

const defaultBase: Base = {
  id: "default",
  name: "Shack",
  facilities: [
    {
      id: "facility_stone",
      recipes: [
        {
          id: "recipe_stone",
          ingredients: [],
          produce: { id: "stone", quantity: 1 },
          work: 100,
        },
      ],
    },
    {
      id: "facility_lumber",
      recipes: [
        {
          id: "recipe_lumber",
          ingredients: [],
          produce: { id: "lumber", quantity: 1 },
          work: 100,
        },
      ],
    },
  ],
};

const defaultPals: Pal[] = Array.from({ length: 20 }).map(() => {
  const d: Pal = {
    id: nanoid(),
    specieId: chance.pickone(pals).id,
    level: chance.natural({ min: 1, max: 40 }),
    gender: chance.pickone(["female", "male"]),
  };
  return d;
});

export default function AppProvider({ children }: React.PropsWithChildren) {
  const [pals, setPals] = useState<Pal[]>(defaultPals);
  const [bases, setBases] = useState<Base[]>([defaultBase]);
  const [selectedBaseId, setSelectedBaseId] = useState<string>("");

  function addBase(base: Omit<Base, "id">) {
    const id = Math.random().toString();
    const initializedBase = { id, ...base };
    setBases((old) => [...old, initializedBase]);
  }

  function selectBase(id: string) {
    setSelectedBaseId(() => id);
  }

  return (
    <AppContext.Provider
      value={{ pals, bases, selectedBaseId, addBase, selectBase }}
    >
      {children}
    </AppContext.Provider>
  );
}
