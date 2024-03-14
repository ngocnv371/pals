import config from "../../data/config.json";

export type ConfigType = typeof config;

export function getConfig(): ConfigType {
  return config;
}
