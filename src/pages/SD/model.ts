export interface Text2imgResponse {
  images: string[];
  info: string;
}

export interface Text2imgRequest {
  prompt: string;
  negative?: string;
  seed?: number;
  subseed?: number;
  batch_size?: number;
  steps?: number;
  cfg_scale?: number;
  width?: number;
  height?: number;
  sampler_index?: string;
}

export interface SDClient {
  setConfig(url: string, key: string): void;
  txt2img(request: Text2imgRequest): Promise<Text2imgResponse>;
}

export const providers = ["automatic1111"];

export interface SDState {
  apiKey: string;
  url: string;
  provider: string;
}
