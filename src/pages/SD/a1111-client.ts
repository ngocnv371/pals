import { SDClient, Text2imgRequest, Text2imgResponse } from "./model";

// private key
let apiKey = "";
let baseUrl = "";

export const A1111Client: SDClient = {
  txt2img: function (request: Text2imgRequest): Promise<Text2imgResponse> {
    const url = `${baseUrl}/sdapi/v1/txt2img`;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "no-cors",
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
