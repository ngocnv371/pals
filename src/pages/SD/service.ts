import { A1111Client } from "./a1111-client";
import { SDClient, SDState, providers } from "./model";

const STORAGE_KEY = "sd";

export function saveData(data: SDState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadData(): SDState {
  const json = window.localStorage.getItem(STORAGE_KEY);
  if (!json) {
    return initState();
  }

  return JSON.parse(json) as SDState;
}

const defaultProps = `
{
  "model": "dreamshaperXL_sfwLightningDPMSDE",
  "prompt": ", in Pokémon styke. Vibrant, cute, anime, fantasy, reminiscent of Pokémon series",
  "negative_prompt": "realistic, modern, horror, dystopian, violent",
  "save_images": true,
  "send_images": false,
  "batch_size": 2,
  "steps": 5,
  "cfg_scale": 2,
  "width": 768,
  "height": 1152,
  "sampler_index": "DPM++ SDE Karras"
}`;
export function initState(): SDState {
  return {
    provider: providers[0],
    apiKey: "",
    url: "",
    props: defaultProps,
  };
}

const sdMap = Object.freeze({
  automatic1111: A1111Client,
});

export function getSd(): SDClient {
  const state = loadData();
  const client: SDClient = (sdMap as any)[state.provider];
  client.setConfig(state.url, state.apiKey, state.props);

  return client;
}
