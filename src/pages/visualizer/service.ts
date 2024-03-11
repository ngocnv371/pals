import { retryAsync } from "../../utils/retryAsync";
import { getSd } from "../SD/service";

export async function generateImages(prompt: string) {
  const res = await retryAsync(() =>
    getSd().txt2img({
      prompt,
    })
  );
  if (!res) {
    throw Error("sd failed");
  }

  return res.images;
}
