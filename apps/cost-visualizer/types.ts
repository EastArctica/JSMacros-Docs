export interface LogData {
  cost: number;
  tokens_prompt: number;
  tokens_completion: number;
  generation_time: number; // in ms
  native_tokens_prompt: number;
  native_tokens_completion: number;
  native_tokens_reasoning: number;
  model: string;
}

export interface ParsedLogEntry extends LogData {
  filename: string;
  shortName: string;
  total_tokens: number;
  native_total_tokens: number;
}

export type LogStats = {
  totalCost: number;
  totalFiles: number;
  totalGenerationTime: number;
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalReasoningTokens: number;
  avgCost: number;
  avgTime: number;
};