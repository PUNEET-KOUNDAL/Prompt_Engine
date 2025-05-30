import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { usePrompt } from '../context/PromptContext';

const PromptForm: React.FC = () => {
  const navigate = useNavigate();
  const { generatePrompt } = usePrompt();
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    await generatePrompt({
      businessName: '',
      industry: '',
      targetAudience: '',
      useCase: prompt,
      additionalContext: '',
    });
    navigate('/result');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            Create Professional AI Prompts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your business need, and we'll craft the perfect prompt for you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur" />
            <div className="relative bg-white rounded-2xl shadow-xl p-1">
              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setIsTyping(true);
                }}
                onBlur={() => setIsTyping(false)}
                placeholder="Example: I need an AI assistant that can help customers with product recommendations and support inquiries for my online fashion store..."
                className="w-full min-h-[200px] p-6 rounded-xl bg-transparent focus:outline-none text-lg"
                style={{ resize: 'none' }}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`
                group relative inline-flex items-center px-8 py-4 
                bg-gradient-to-r from-blue-600 to-purple-600
                text-white text-lg font-medium rounded-xl
                transition-all duration-300 transform
                hover:scale-105 hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isTyping ? 'animate-pulse' : ''}
              `}
              disabled={!prompt.trim()}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Prompt
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </form>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Our AI will analyze your description and create a professional prompt optimized for your needs
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center text-gray-500">
              <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
              AI-Powered Analysis
            </div>
            <div className="flex items-center text-gray-500">
              <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
              Industry-Specific Output
            </div>
            <div className="flex items-center text-gray-500">
              <Sparkles className="h-4 w-4 mr-2 text-indigo-500" />
              Professional Results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptForm;