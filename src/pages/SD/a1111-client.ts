import { SDClient, Text2imgRequest, Text2imgResponse } from "./model";

interface GeminiMessage {
  role: string;
  parts: { text: string }[];
}
interface GeminiCandidate {
  content: GeminiMessage;
  finish_reason: string;
  index: number;
}

interface GeminiResponse {
  candidates: GeminiCandidate[];
}

// private key
let apiKey = "";
let baseUrl = "";

export const GeminiClient: SDClient = {
  txt2img: function (request: Text2imgRequest): Promise<Text2imgResponse> {
    const url = `${baseUrl}/sdapi/v1/txt2img`;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    }).then(async (res) => {
      const data: Text2imgResponse = await res.json();
      if (!data) {
        throw new Error("malformed response");
      }
      return data;
    });
  },
  setConfig: function (url: string, key: string): void {
    apiKey = key;
    baseUrl = url;
  },
};
