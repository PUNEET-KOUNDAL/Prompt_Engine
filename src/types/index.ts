export interface PromptRequest {
  businessName: string;
  industry: string;
  targetAudience: string;
  useCase: string;
  additionalContext: string;
}

export interface PromptResult {
  title: string;
  prompt: string;
  description: string;
  timestamp: string;
}