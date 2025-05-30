import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PromptRequest, PromptResult } from '../types';

interface PromptContextType {
  promptRequest: PromptRequest;
  setPromptRequest: React.Dispatch<React.SetStateAction<PromptRequest>>;
  promptResult: PromptResult | null;
  setPromptResult: React.Dispatch<React.SetStateAction<PromptResult | null>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  generatePrompt: (request: PromptRequest) => Promise<void>;
}

const defaultPromptRequest: PromptRequest = {
  businessName: '',
  industry: '',
  targetAudience: '',
  useCase: '',
  additionalContext: '',
};

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error('usePrompt must be used within a PromptProvider');
  }
  return context;
};

export const PromptProvider = ({ children }: { children: ReactNode }) => {
  const [promptRequest, setPromptRequest] = useState<PromptRequest>(defaultPromptRequest);
  const [promptResult, setPromptResult] = useState<PromptResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePrompt = async (request: PromptRequest) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Extract business details from the user's description
    const description = request.useCase.toLowerCase();
    let inferredIndustry = '';
    let inferredAudience = '';
    let inferredBusiness = '';

    if (description.includes('fashion') || description.includes('clothing')) {
      inferredIndustry = 'Fashion Retail';
      inferredAudience = 'Fashion-conscious shoppers';
      inferredBusiness = 'StyleSense';
    } else if (description.includes('tech') || description.includes('software')) {
      inferredIndustry = 'Technology';
      inferredAudience = 'Tech professionals';
      inferredBusiness = 'TechFlow';
    } else if (description.includes('food') || description.includes('restaurant')) {
      inferredIndustry = 'Food & Beverage';
      inferredAudience = 'Food enthusiasts';
      inferredBusiness = 'FlavourFusion';
    } else {
      inferredIndustry = 'E-commerce';
      inferredAudience = 'Online shoppers';
      inferredBusiness = 'SmartServe';
    }

    const result: PromptResult = {
      title: `${inferredIndustry} AI Assistant Prompt`,
      prompt: generatePromptText({
        ...request,
        businessName: inferredBusiness,
        industry: inferredIndustry,
        targetAudience: inferredAudience,
      }),
      description: `AI-optimized prompt for ${inferredIndustry} businesses`,
      timestamp: new Date().toISOString(),
    };
    
    setPromptResult(result);
    setIsGenerating(false);
  };

  const generatePromptText = (request: PromptRequest): string => {
    return `You are an AI assistant for ${request.businessName}, a company in the ${request.industry} industry.

Your primary goal is to help ${request.targetAudience} with their needs.

Context and Requirements:
${request.useCase}

When responding to users:
1. Maintain a professional, helpful tone consistent with ${request.businessName}'s brand
2. Provide specific, actionable information related to user queries
3. Consider the needs and knowledge level of ${request.targetAudience}
4. Focus solutions on the specific industry context of ${request.industry}
5. Address customer concerns with empathy and precision

Always prioritize accuracy, clarity, and customer satisfaction in your responses.`;
  };

  return (
    <PromptContext.Provider
      value={{
        promptRequest,
        setPromptRequest,
        promptResult,
        setPromptResult,
        isGenerating,
        setIsGenerating,
        generatePrompt,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};