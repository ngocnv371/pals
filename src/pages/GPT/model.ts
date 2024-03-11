export interface CompletionRequest {
  prompt: string;
  max_tokens: number;
}

export interface CompletionChoice {
  index: number;
  finish_reason: string;
  text: string;
}

export interface CompletionUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface CompletionResponse {
  id: string;
  choices: CompletionChoice[];
  created: number;
  model: string;
  object: string;
  usage: CompletionUsage;
}

export interface ChatCompletionMessage {
  role: string;
  content: string;
}

export interface ChatCompletionChoice {
  index: number;
  finish_reason: string;
  message: ChatCompletionMessage;
}

export interface ChatCompletionResponse {
  id: string;
  choices: ChatCompletionChoice[];
  created: number;
  model: string;
  object: string;
  usage: CompletionUsage;
}

export interface ChatCompletionRequest {
  messages: ChatCompletionMessage[];
  max_tokens: number;
  stream: boolean;
  mode: string;
  instruction_template: string;
}

export interface GPTClient {
  setApiKey(key: string): void;
  completions(opts: CompletionRequest): Promise<CompletionResponse>;
  chatCompletions(opts: ChatCompletionRequest): Promise<ChatCompletionResponse>;
}

export const adapters = ["gemini", "claude", "bing-chat"];

export interface GPTState {
  apiKey: string;
  adapter: string;
}
