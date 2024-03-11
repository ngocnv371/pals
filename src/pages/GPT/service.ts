import { BingChat } from "bing-chat";
import { ClaudeClient } from "./claude-client";
import { GeminiClient } from "./gemini-client";
import { GPTClient, GPTState, adapters } from "./model";

const STORAGE_KEY = "gpt";

export function saveData(data: GPTState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadData(): GPTState {
  const json = window.localStorage.getItem(STORAGE_KEY);
  if (!json) {
    return {
      adapter: adapters[0],
      apiKey: "",
    };
  }

  return JSON.parse(json) as GPTState;
}

const gptMap = Object.freeze({
  gemini: GeminiClient,
  claude: ClaudeClient,
  "bing-chat": BingChat,
});

export function getGpt(): GPTClient {
  const state = loadData();
  const client: GPTClient = (gptMap as any)[state.adapter];
  client.setApiKey(state.apiKey);

  return client;
}
