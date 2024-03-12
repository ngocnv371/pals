import { SDClient, Text2imgRequest, Text2imgResponse } from "./model";

// private key
let apiKey = "";
let baseUrl = "";
let props = "";

export const A1111Client: SDClient = {
  txt2img: function (request: Text2imgRequest): Promise<Text2imgResponse> {
    const url = `${baseUrl}/sdapi/v1/txt2img`;
    console.debug("props", props);
    const { prompt: suffixPrompt, ...overwrite } = JSON.parse(props);
    const prompt = request.prompt + suffixPrompt;
    const body = { ...request, ...overwrite, prompt };
    console.debug("body", body);
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data: Text2imgResponse = await res.json();
      if (!data) {
        throw new Error("malformed response");
      }
      const info = JSON.parse(data.info);
      const seeds = info.all_seeds.map((i: any) => "" + i);
      return { ...data, images: seeds };
    });
  },
  setConfig: function (url: string, key: string, p: string): void {
    apiKey = key;
    baseUrl = url;
    props = p;
  },
};
