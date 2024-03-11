import {
  ChatCompletionRequest,
  ChatCompletionResponse,
  CompletionRequest,
  CompletionResponse,
  GPTClient,
} from "./model";

const baseUrl = "https://api.anthropic.com";
export const ClaudeClient: GPTClient = {
  completions: function (opts: CompletionRequest): Promise<CompletionResponse> {
    throw new Error("Function not implemented.");
  },
  chatCompletions: function (
    opts: ChatCompletionRequest
  ): Promise<ChatCompletionResponse> {
    const url = `${baseUrl}/v1/messages`;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({
        max_tokens: 1024,
        messages: opts.messages,
        model: "claude-instant-1.2",
      }),
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": import.meta.env.VITE_CLAUDE_API_KEY,
      },
      mode: "no-cors",
    })
      .then((res) => {
        return res.json();
      })
      .catch((reason: any) => {
        console.error("claude failed", reason);
      });
  },
  setApiKey: function (key: string): void {
    throw new Error("Function not implemented.");
  },
};
