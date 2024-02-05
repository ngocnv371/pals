import React from "react";
import { Base } from "../../models/base";
import Pal from "../../models/pal";

interface AppContextData {
  pals: Pal[];
  bases: Base[];
  selectedBaseId: string;
  addBase: (base: Omit<Base, "id">) => void;
  selectBase: (id: string) => void;
  breed: (palId1: string, palId2: string) => Pal
}

const AppContext = React.createContext<AppContextData | null>(null);

export default AppContext;
