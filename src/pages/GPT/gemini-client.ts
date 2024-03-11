import {
  ChatCompletionRequest,
  ChatCompletionResponse,
  CompletionRequest,
  CompletionResponse,
  GPTClient,
} from "./model";

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

const baseUrl = "https://generativelanguage.googleapis.com";
// private key
let apiKey = "";

export const GeminiClient: GPTClient = {
  completions: function (opts: CompletionRequest): Promise<CompletionResponse> {
    throw new Error("Function not implemented.");
  },
  chatCompletions: function (
    opts: ChatCompletionRequest
  ): Promise<ChatCompletionResponse> {
    const url = `${baseUrl}/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify({
        contents: opts.messages.map((m) => ({
          role: m.role != "user" ? "model" : m.role,
          parts: [{ text: m.content }],
        })),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data: GeminiResponse = await res.json();
        const adapted: ChatCompletionResponse = {
          choices: data.candidates.map((c) => ({
            finish_reason: c.finish_reason,
            index: c.index,
            message: {
              role: "assistant",
              content: c.content.parts[0].text,
            },
          })),
          id: "",
          created: 0,
          model: "",
          object: "",
          usage: { completion_tokens: 0, prompt_tokens: 0, total_tokens: 0 },
        };
        return adapted as any;
      })
      .catch((reason: any) => {
        console.error("gemini failed", reason);
      });
  },
  setApiKey: function (key: string): void {
    apiKey = key;
  },
};
