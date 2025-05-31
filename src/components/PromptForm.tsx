import React, { useState, useRef, useEffect } from 'react';

const PromptChat: React.FC = () => {
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { type: 'user', text: trimmed }]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: '',
          industry: '',
          targetAudience: '',
          useCase: trimmed,
          additionalContext: '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data?.prompt || 'Sorry, I could not generate a response.';
      setMessages((prev) => [...prev, { type: 'bot', text: botMessage }]);
    } catch (err: any) {
      console.error('Failed to fetch response:', err);
      const errorMessage = err.message || 'Failed to fetch response from server. Please try again.';
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: `An error occurred: ${errorMessage.substring(0,100)}${errorMessage.length > 100 ? '...' : ''}` },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setIsTyping(false);
    setError(null);
  };

  return (
    <div className="min-h-screen h-screen relative flex flex-col font-sans bg-gray-950 overflow-hidden">
      {/* Full-page Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={'/videos/your-background-video.mp4'} // <--- IMPORTANT: REPLACE WITH YOUR VIDEO PATH
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        {/* Refined Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-purple-950/70 to-indigo-950/80 opacity-90"></div>
      </div>

      {/* Chat Content Area (Full Page, Centered Content) */}
      <div className="relative z-10 flex flex-col flex-grow w-full max-w-3xl mx-auto h-full">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/10 shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Sparkie AI
          </h1>
          {messages.length > 0 && (
            <button
              onClick={handleNewChat}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 text-white py-2 px-4 md:px-5 rounded-xl text-sm font-medium shadow-lg flex items-center justify-center group transform hover:scale-105 active:scale-95 new-chat-button-appear"
              title="Start a new chat"
            >
              New Chat
            </button>
          )}
        </div>

        {/* Messages Display Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
          {messages.length === 0 && !isTyping ? ( // Ensure welcome message doesn't show if bot is about to respond to an initial (future) auto-prompt
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6 py-10 space-y-5 h-full welcome-message-fade-in">
              <div className="text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 leading-tight animate-scale-in">
                Hi, I'm Sparkie.
              </div>
              <p className="text-gray-200 text-lg md:text-xl max-w-md animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                “I Don’t Guess Prompts, I Master Them — Hit, Trial, Repeat.”
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`rounded-xl px-4 py-3 text-base leading-relaxed max-w-[85%] break-words shadow-lg message-enter-animation ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-700 self-end ml-auto text-white rounded-br-md'
                    : 'bg-gray-700/90 self-start mr-auto text-gray-100 rounded-bl-md border border-gray-600/50'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {msg.text}
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex items-center space-x-3 bg-gray-700/90 self-start mr-auto rounded-xl px-4 py-3 text-gray-100 max-w-[85%] rounded-bl-md border border-gray-600/50 message-enter-animation">
              <div className="typing-animation">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-sm italic text-gray-300">Sparkie is thinking...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-600/90 text-red-50 p-3 rounded-xl mt-4 max-w-[90%] mx-auto text-center text-sm font-medium shadow-lg error-fade-in">
              {error}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 md:gap-3 px-3 py-3 md:px-4 md:py-4 border-t border-white/10 shrink-0"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Sparkie..."
            rows={1}
            className="flex-1 p-3 rounded-xl bg-gray-800/90 text-white border border-gray-600/70 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none custom-scrollbar placeholder:text-gray-300"
            style={{ overflowY: 'hidden' }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 px-4 py-3 md:px-5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 hidden md:inline-block">
              <path d="M3.105 3.105a1.5 1.5 0 011.952-.999l11.54 5.129a1.5 1.5 0 010 2.73l-11.54 5.129a1.5 1.5 0 01-1.952-.999V3.105z" />
            </svg>
            <span>Send</span>
          </button>
        </form>
      </div>

      {/* Custom CSS for scrollbar and animations (no changes from previous) */}
      <style jsx>{`
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 27, 47, 0.3); /* Darker, semi-transparent track */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b5cf6; /* purple-500 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7c3aed; /* purple-600 */
        }

        /* Typing Animation */
        .typing-animation { display: flex; align-items: center; gap: 5px; height: 10px; }
        .typing-animation span { width: 8px; height: 8px; background-color: #93C5FD; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
        .typing-animation span:nth-child(1) { animation-delay: -0.32s; }
        .typing-animation span:nth-child(2) { animation-delay: -0.16s; }
        .typing-animation span:nth-child(3) { animation-delay: 0s; }
        @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } }

        /* Message Entry Animation - Springier */
        .message-enter-animation { opacity: 0; transform: translateY(15px) scale(0.98); animation: messageEnter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes messageEnter { to { opacity: 1; transform: translateY(0) scale(1); } }

        /* Welcome Message Animations */
        .welcome-message-fade-in { animation: fadeIn 0.8s 0.1s ease-out forwards; }
        .animate-scale-in { opacity: 0; transform: scale(0.85); animation: scaleIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; animation-delay: 0.3s; }
        @keyframes scaleIn { to { opacity: 1; transform: scale(1); } }
        .animate-fade-in-up { opacity: 0; transform: translateY(15px); animation: fadeInSlideUp 0.6s ease-out forwards; }
        @keyframes fadeInSlideUp { to { opacity: 1; transform: translateY(0); } }

        /* Error Message Animation */
        .error-fade-in { opacity: 0; transform: translateY(-15px); animation: errorFadeIn 0.5s ease-out forwards; }
        @keyframes errorFadeIn { to { opacity: 1; transform: translateY(0); } }

        /* New Chat Button Animation */
        .new-chat-button-appear { opacity: 0; transform: translateY(-10px); animation: fadeInButton 0.4s ease-out forwards; animation-delay: 0.2s; }
        @keyframes fadeInButton { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default PromptChat;