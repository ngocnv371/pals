import { Chance } from "chance";
import { BingChat } from "bing-chat";
import { Monster, classes, natures, types } from "./model";
const chance = new Chance();
let api: BingChat;

export function setBingCookie(cookie: string) {
  api = new BingChat({
    cookie,
  });
}

export function generateMonster(): Monster {
  return {
    name: "?",
    description: "",
    class: chance.pickone(classes),
    nature: chance.pickone(natures),
    type: chance.pickone(types),
  };
}

export function generateDetail(monster: Monster) {
  //
}
