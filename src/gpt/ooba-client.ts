import {
  ChatCompletionRequest,
  ChatCompletionResponse,
  CompletionRequest,
  CompletionResponse,
  GPTClient,
} from "./model";

export const OobaClient: GPTClient = {
  completions: function (opts: CompletionRequest): Promise<CompletionResponse> {
    const url = "http://localhost:5000/v1/completions";
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(opts),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((reason: any) => {
        console.error("ooba failed", reason);
      });
  },
  chatCompletions: function (
    opts: ChatCompletionRequest
  ): Promise<ChatCompletionResponse> {
    const url = "http://localhost:5000/v1/chat/completions";
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(opts),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((reason: any) => {
        console.error("ooba failed", reason);
      });
  },
};
