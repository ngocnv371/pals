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

export interface GPTClient {
  completions(opts: CompletionRequest): Promise<CompletionResponse>;
}
