import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, RotateCcw, Sparkles, AlertCircle, Zap, Star } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const PromptChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [streakCount, setStreakCount] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null); // New state for session_id

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat when messages or typing state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Focus the textarea on initial load or new chat
  useEffect(() => {
    if (textareaRef.current && !isTyping) {
      textareaRef.current.focus();
    }
  }, [messages.length, isTyping]); // Trigger on messages change or typing state change

  // Auto-scroll to input area after initial load if no messages (for welcome screen)
  useEffect(() => {
    if (messages.length === 0 && textareaRef.current && inputContainerRef.current) {
      setTimeout(() => {
        inputContainerRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'end' 
        });
        textareaRef.current?.focus();
      }, 500);
    }
  }, [messages.length]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to handle API calls with error handling
  const callApi = useCallback(async (endpoint: string, payload: any) => {
    try {
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }
      setIsConnected(true);
      setError(null); // Clear previous errors on successful connection
      return await response.json();
    } catch (err: any) {
      console.error('API call failed:', err);
      const errorMessage = err.message || 'Connection failed. Please check your internet and try again.';
      setError(errorMessage);
      setIsConnected(false);

      const errorBotMessage: Message = {
        id: generateId(),
        type: 'bot',
        text: `I'm having trouble connecting right now. ${errorMessage.includes('Server error') ? 'The server might be busy.' : 'Please check your connection and try again.'}`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorBotMessage]);
      setIsTyping(false); // Stop typing indicator on error
      throw err; // Re-throw to be caught by the calling function if needed
    }
  }, []);

  // Function to start a new chat session on the backend
  const startNewSession = useCallback(async () => {
    setIsTyping(true);
    setMessages([]); // Clear messages immediately for new chat feel
    setInput('');
    setError(null);
    setStreakCount(0);

    try {
      const data = await callApi('/new_chat', sessionId ? { session_id: sessionId } : {});
      setSessionId(data.session_id); // Store the new session ID
      const botMessage: Message = {
        id: generateId(),
        type: 'bot',
        text: data.prompt, // This will be the initial greeting from LLM1
        timestamp: new Date()
      };
      setMessages([botMessage]); // Start messages with bot's initial greeting
    } catch (error) {
      // Error handling for new chat is already in callApi, no need to re-add specific bot message here
      console.error("Failed to start new chat session:", error);
    } finally {
      setIsTyping(false);
      textareaRef.current?.focus(); // Ensure focus on input
    }
  }, [sessionId, callApi]);

  // Initial load: Start a new chat if no session ID exists
  useEffect(() => {
    if (!sessionId && messages.length === 0) {
      startNewSession();
    }
  }, [sessionId, messages.length, startNewSession]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      text: trimmed,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null); // Clear error on new submission attempt

    // Maintain focus immediately after submission
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });

    // Simulate a slight delay for better UX before bot response
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      // IMPORTANT: Send the session_id with the request!
      const data = await callApi('/generate', {
        useCase: trimmed,
        session_id: sessionId, // <-- THIS IS THE KEY CHANGE
      });

      const botMessage: Message = {
        id: generateId(),
        type: 'bot',
        text: data?.prompt || 'I apologize, but I couldn\'t generate a response at this time.',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
      setStreakCount(prev => prev + 1);

      // If the backend indicates it's the final prompt, you might want to do something specific
      if (data.is_final_prompt) {
        console.log("Final prompt generated! Session complete.");
        // Optionally, reset session_id if backend deletes the session
        setSessionId(null); 
      }

    } catch (err) {
      // Error handling already in callApi, no need to re-add specific bot message here
      console.error('Failed to generate response:', err);
    } finally {
      setIsTyping(false);
      // Ensure focus is restored after bot response
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const quickPrompts = [
    "I'm in the e-commerce industry. My business is 'PetPals' and we offer organic pet food and handmade pet accessories.",
    "I'm a SaaS company called 'TaskFlow', providing project management software.",
    "My business, 'HealthyBites', is in healthcare, offering personalized meal plans for diabetes patients.",
    "I need to generate marketing copy for my new product.",
    "Can you help me design a prompt for customer support bot?",
    "Explain the concept of 'chain of thought' in prompt engineering."
  ];

  return (
    <div className="min-h-screen h-screen relative flex flex-col font-sans bg-white overflow-hidden mt-24">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-green-50/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.03),transparent_50%)]"></div>
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="relative z-10 flex flex-col flex-grow w-full max-w-4xl mx-auto h-full">
        {/* Enhanced Header */}
        <header className="flex items-center justify-between p-4 md:p-6 border-b border-green-100 backdrop-blur-sm shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Sparkie AI
              </h1>
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                  <span className="text-gray-600">
                    {isConnected ? 'Connected' : 'Connection Issues'}
                  </span>
                </div>
                {streakCount > 0 && (
                  <div className="flex items-center space-x-1 bg-green-50 border border-green-200 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-green-600" />
                    <span className="text-green-700 text-xs font-semibold">{streakCount} streak</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={startNewSession} // Use the new function to start a fresh session
            className="group bg-white hover:bg-green-50 transition-all duration-300 text-gray-700 hover:text-green-700 py-3 px-5 rounded-xl text-sm font-medium shadow-md hover:shadow-lg flex items-center justify-center space-x-2 border border-green-200 hover:border-green-300 transform hover:scale-105 active:scale-95"
            title="Start a new chat"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            <span>New Chat</span>
          </button>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
          {messages.length === 0 && !isTyping ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6 py-10 space-y-8 h-full">
              <div className="relative">
                <div className="text-6xl md:text-8xl font-extrabold tracking-tight text-gray-800 leading-tight welcome-text">
                  Hi, I'm Sparkie.
                </div>
                <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🌿</div>
              </div>
              <div className="space-y-6 max-w-2xl">
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed animate-fade-in-delayed">
                  "I Don't Guess Prompts, I Master Them — Hit, Trial, Repeat."
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(prompt);
                        setTimeout(() => {
                          textareaRef.current?.focus();
                        }, 100);
                      }}
                      className="p-3 text-sm bg-white hover:bg-green-50 border border-green-100 hover:border-green-200 rounded-xl text-gray-700 hover:text-green-700 transition-all duration-200 text-left hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
                    >
                      <Zap className="w-4 h-4 mb-1 text-green-500" />
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} group message-appear`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`max-w-[85%] md:max-w-[75%] space-y-2`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-base leading-relaxed shadow-md backdrop-blur-sm border transition-all duration-300 group-hover:shadow-lg ${
                      msg.type === 'user'
                        ? 'bg-green-500 text-white border-green-400 rounded-br-md message-user-glow' 
                        : 'bg-white text-gray-800 border-gray-200 rounded-bl-md message-bot-glow'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className={`text-xs text-gray-500 px-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex justify-start typing-appear">
              <div className="max-w-[85%] md:max-w-[75%]">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-4 backdrop-blur-sm shadow-md">
                  <div className="flex items-center space-x-3">
                    <div className="typing-animation">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="text-sm text-gray-600">Sparkie is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center error-appear">
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl max-w-md mx-auto text-center backdrop-blur-sm shadow-md">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Connection Error</span>
                </div>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="shrink-0 p-4 md:p-6 border-t border-green-100 backdrop-blur-sm" ref={inputContainerRef}>
          <form onSubmit={handleSubmit} className="relative">
            <div 
              className="flex items-end gap-3 p-4 bg-white backdrop-blur-sm border border-gray-200 rounded-2xl focus-within:border-green-300 focus-within:ring-2 focus-within:ring-green-100 transition-all duration-300 input-glow shadow-md"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isTyping}
                className="flex-1 bg-transparent text-gray-800 placeholder:text-gray-500 focus:outline-none resize-none custom-scrollbar disabled:opacity-50"
                style={{ overflowY: 'hidden' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 transition-all duration-300 p-3 rounded-xl font-semibold text-white flex items-center justify-center shadow-md transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-300 send-button-glow"
              >
                <Send className={`w-5 h-5 ${isTyping ? 'animate-pulse' : ''}`} />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 px-2 text-xs text-gray-500">
              <span>{input.length}/2000</span>
              <span>Powered by Sparkie AI</span>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10B981, #059669);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #047857);
        }

        .floating-orbs {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1));
          filter: blur(1px);
          animation: float 6s ease-in-out infinite;
        }

        .orb-1 {
          width: 200px;
          height: 200px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 60%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.5; }
        }

        .typing-animation {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 16px;
        }
        .typing-animation span {
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #10B981, #059669);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-animation span:nth-child(1) { animation-delay: -0.32s; }
        .typing-animation span:nth-child(2) { animation-delay: -0.16s; }
        .typing-animation span:nth-child(3) { animation-delay: 0s; }

        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0.8) translateY(0); 
            opacity: 0.7;
          }
          40% { 
            transform: scale(1.2) translateY(-8px); 
            opacity: 1;
          }
        }

        .welcome-text {
          animation: welcomeGlow 3s ease-in-out infinite alternate;
        }

        @keyframes welcomeGlow {
          from { filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.1)); }
          to { filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.2)); }
        }

        .message-appear {
          opacity: 0;
          transform: translateY(20px);
          animation: messageSlideIn 0.5s ease-out forwards;
        }

        @keyframes messageSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .typing-appear {
          opacity: 0;
          animation: fadeIn 0.3s ease-out forwards;
        }

        .error-appear {
          opacity: 0;
          animation: errorPop 0.4s ease-out forwards;
        }

        @keyframes errorPop {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in-delayed {
          opacity: 0;
          animation: fadeIn 0.8s ease-out 0.5s forwards;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        .message-user-glow:hover {
          box-shadow: 0 0 25px rgba(34, 197, 94, 0.3);
        }

        .message-bot-glow:hover {
          box-shadow: 0 0 25px rgba(156, 163, 175, 0.2);
        }

        .input-glow:focus-within {
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.1);
        }

        .send-button-glow:hover:not(:disabled) {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
      `}</style>
    </div>
  );
};

export default PromptChat;