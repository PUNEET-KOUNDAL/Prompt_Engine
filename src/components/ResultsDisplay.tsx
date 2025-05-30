import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, ArrowLeft, Download } from 'lucide-react';
import { usePrompt } from '../context/PromptContext';

const ResultsDisplay: React.FC = () => {
  const navigate = useNavigate();
  const { promptResult, isGenerating } = usePrompt();
  const [copied, setCopied] = useState(false);
  
  // If no result and not generating, redirect to form
  useEffect(() => {
    if (!promptResult && !isGenerating) {
      navigate('/create');
    }
  }, [promptResult, isGenerating, navigate]);

  const copyToClipboard = () => {
    if (!promptResult) return;
    
    navigator.clipboard.writeText(promptResult.prompt);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const downloadPrompt = () => {
    if (!promptResult) return;
    
    const element = document.createElement('a');
    const file = new Blob([promptResult.prompt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${promptResult.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isGenerating) {
    return <LoadingState />;
  }

  if (!promptResult) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/create')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Form
      </button>
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Generated Prompt</h1>
        <p className="text-lg text-gray-600">
          Here's your professionally crafted LLM prompt ready to use
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Prompt Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6">
          <h2 className="text-xl font-semibold">{promptResult.title}</h2>
          <p className="text-blue-100 mt-1">{promptResult.description}</p>
        </div>
        
        {/* Prompt Content */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">PROMPT</h3>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center text-gray-500 hover:text-blue-600 text-sm py-1 px-2 rounded transition-colors"
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              
              <button
                onClick={downloadPrompt}
                className="flex items-center text-gray-500 hover:text-blue-600 text-sm py-1 px-2 rounded transition-colors"
                aria-label="Download prompt"
              >
                <Download className="h-4 w-4 mr-1" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-md p-4 font-mono text-sm whitespace-pre-wrap">
            {promptResult.prompt}
          </div>
        </div>
        
        {/* Usage Instructions */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">How to Use This Prompt</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Copy the prompt above or download it as a text file.</li>
            <li>Paste it into your preferred LLM interface (ChatGPT, Claude, etc.).</li>
            <li>The LLM will now respond according to your business requirements.</li>
            <li>You can modify parts of the prompt to further refine the AI's responses.</li>
          </ol>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/create')}
              className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Create Another Prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading State Component
const LoadingState: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Generating Your Prompt</h1>
        <p className="text-lg text-gray-600">
          Please wait while we craft the perfect prompt for your business needs...
        </p>
      </div>
      
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md max-w-lg text-center">
        <p className="text-blue-700">
          We're analyzing your requirements and creating a professional prompt optimized for your specific business needs.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;