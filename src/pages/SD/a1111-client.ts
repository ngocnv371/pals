import { SDClient, Text2imgRequest, Text2imgResponse } from "./model";

// private key
let apiKey = "";
let baseUrl = "";

export const A1111Client: SDClient = {
  txt2img: function (request: Text2imgRequest): Promise<Text2imgResponse> {
    const url = `${baseUrl}/sdapi/v1/txt2img`;
    // model: dreamshaperXL_sfwLightningDPMSDE
    const overwrite: Omit<Text2imgRequest, "prompt"> = {
      save_images: true,
      send_images: false,
      batch_size: 2,
      steps: 8,
      cfg_scale: 2,
      width: 768,
      height: 1152,
      sampler_index: "DPM++ SDE Karras",
    };
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...request, ...overwrite }),
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
  setConfig: function (url: string, key: string): void {
    apiKey = key;
    baseUrl = url;
  },
};
