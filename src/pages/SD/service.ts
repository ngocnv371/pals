import { A1111Client } from "./a1111-client";
import { SDClient, SDState, providers } from "./model";

const STORAGE_KEY = "sd";

export function saveData(data: SDState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadData(): SDState {
  const json = window.localStorage.getItem(STORAGE_KEY);
  if (!json) {
    return {
      provider: providers[0],
      apiKey: "",
      url: "",
    };
  }

  return JSON.parse(json) as SDState;
}

const sdMap = Object.freeze({
  automatic1111: A1111Client,
});

export function getSd(): SDClient {
  const state = loadData();
  const client: SDClient = (sdMap as any)[state.provider];
  client.setConfig(state.url, state.apiKey);

  return client;
}