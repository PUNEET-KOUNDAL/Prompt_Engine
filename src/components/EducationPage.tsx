import React, { useState, useEffect } from 'react';

type SectionKey = 'main' | 'educationalPosts' | 'aiMlNews' | 'studentProjects' | 'youtubePlaylist';

const EducationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('main');
  // State to store the history of active sections
  const [sectionHistory, setSectionHistory] = useState<SectionKey[]>(['main']);

  // Function to navigate to a new section
  const navigateToSection = (section: SectionKey) => {
    // Only add to history if it's a new section, not the current one
    if (activeSection !== section) {
      setSectionHistory(prevHistory => [...prevHistory, section]);
      setActiveSection(section);
    }
  };

  // Function to go back in history
  const goBack = () => {
    if (sectionHistory.length > 1) {
      const newHistory = [...sectionHistory];
      newHistory.pop(); // Remove the current section
      const previousSection = newHistory[newHistory.length - 1]; // Get the last one
      setSectionHistory(newHistory);
      setActiveSection(previousSection);
    } else {
      // If no history, just go to main (or do nothing)
      setActiveSection('main');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'educationalPosts':
        return (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-purple-300 mb-6">🎓 Deep Dive: Educational Posts</h2>
            <p className="text-lg text-gray-200 mb-4">
              Explore our curated articles and guides designed to elevate your understanding of Machine Learning, NLP, and Generative AI. Each post is crafted to provide hands-on experience and actionable insights.
            </p>
            <ul className="list-disc ml-8 text-gray-300 space-y-3 text-lg">
              <li>
                <span className="text-purple-400 font-semibold">Prompt Engineering Mastery:</span> Unlock the secrets to crafting effective prompts for large language models, from basic principles to advanced techniques.
              </li>
              <li>
                <span className="text-purple-400 font-semibold">NLP Tasks with LLMs:</span> Hands-on tutorials covering sentiment analysis, text summarization, Q&A systems, and more, all powered by the latest LLMs.
              </li>
              <li>
                <span className="text-purple-400 font-semibold">Demystifying Fine-tuning & RAG:</span> Understand the power of fine-tuning models for specific tasks and dive into Retrieval-Augmented Generation for enhanced AI responses.
              </li>
              <li>
                <span className="text-purple-400 font-semibold">ML from Beginner to Advanced:</span> A comprehensive series covering core machine learning concepts, algorithms, and practical implementations.
              </li>
            </ul>
            <button
              onClick={goBack} // Changed to goBack
              className="mt-8 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Back
            </button>
          </div>
        );
      case 'aiMlNews':
        return (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-purple-300 mb-6">📢 Latest in AI/ML News</h2>
            <p className="text-lg text-gray-200 mb-4">
              Stay ahead of the curve with our concise and impactful updates on the rapidly evolving AI and Machine Learning landscape.
            </p>
            <ul className="list-disc ml-8 text-gray-300 space-y-3 text-lg">
              <li>
                <span className="text-purple-400 font-semibold">Generative AI Breakthroughs:</span> Discover the most exciting new developments and applications in the world of GenAI.
              </li>
              <li>
                <span className="text-purple-400 font-semibold">Major Platform Releases:</span> Get the scoop on significant updates and new models from industry leaders like OpenAI, Google, and Meta.
              </li>
              <li>
                <span className="text-purple-400 font-semibold">Open-Source Model Trends:</span> Track the rise and impact of open-source models such as Mistral, Phi, Llama, and more.
              </li>
              <li>
                <span className="text-purple-400 font-semibold">Key Conference Announcements:</span> Important takeaways and dates from leading AI conferences like NeurIPS, ICML, and AAAI.
              </li>
            </ul>
            <button
              onClick={goBack} // Changed to goBack
              className="mt-8 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Back
            </button>
          </div>
        );
      case 'studentProjects':
        return (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-purple-300 mb-6">🚀 Showcase: Student & Community Projects</h2>
            <p className="text-lg text-gray-200 mb-4">
              Be inspired by the creativity and innovation of our community! We feature compelling projects that push the boundaries of AI/ML.
            </p>
            <ul className="list-disc ml-8 text-gray-300 space-y-3 text-lg">
              <li>
                <span className="text-purple-400 font-semibold">Innovative Prompt Design:</span> See how unique prompts are used to create fascinating AI outputs.
              </li>
              <li>
                <span className="text-purple-400 font-semibold">Mini NLP/ML Applications:</span> Discover compact yet powerful applications built with OpenAI, HuggingFace, and other leading AI tools.
              </li>
              <li>
                <span className="text-purple-400 font-semibold">Chatbot & LLM UX Experiments:</span> Explore novel user experiences and interfaces designed for AI-powered conversational agents.
              </li>
            </ul>
            <p className="text-md text-gray-400 mt-6">
              Have a groundbreaking project you'd like to share with the community? We'd love to feature it!
              <br />
              Email us at{' '}
              <a href="mailto:puneetkoundal707@gmail.com" className="underline text-purple-400 hover:text-purple-300 transition-colors duration-300">
                puneetkoundal707@gmail.com
              </a>
            </p>
            <button
              onClick={goBack} // Changed to goBack
              className="mt-8 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Back
            </button>
          </div>
        );
      case 'youtubePlaylist':
        return (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-purple-300 mb-6">🎥 YouTube Playlist: Your Visual Learning Hub</h2>
            <p className="text-lg text-gray-200 mb-4">
              Get ready for our upcoming comprehensive Machine Learning video series on YouTube. We're committed to making complex concepts accessible and engaging.
            </p>
            <ul className="list-disc ml-8 text-gray-300 space-y-3 text-lg">
              <li>
                <span className="text-purple-400 font-semibold">Beginner-Friendly ML Explanations:</span> Core concepts broken down into easy-to-understand segments.
              </li>
              <li>
                <span className="text-purple-400 font-semibold">Intuitive Visual Breakdowns:</span> Complex algorithms and ideas visualized for deeper understanding.
              </li>
              <li>
                <span className="text-purple-400 font-semibold">Real-World Mini Projects & Demos:</span> Apply what you learn with practical, hands-on coding examples.
              </li>
            </ul>
            <p className="mt-6 text-xl text-purple-400 font-semibold animate-pulse">
              📅 Expected Launch: Late July / Early August!
            </p>
            <p className="text-md text-gray-400 mt-2">
              🎯 The link to our playlist will appear here once it goes live. Stay tuned!
            </p>
            <button
              onClick={goBack} // Changed to goBack
              className="mt-8 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Back
            </button>
          </div>
        );
      case 'main':
      default:
        return (
          <>
            {/* YouTube Section at the very top of the main view */}
            <SectionCard
              title="🎥 YouTube Playlist (Coming Soon)"
              description="Our comprehensive Machine Learning video series is launching soon! Visual explanations, intuitive breakdowns, and real-world projects await."
              icon="▶️"
              onClick={() => navigateToSection('youtubePlaylist')} // Changed to navigateToSection
              isPrimary
            >
              <p className="mt-2 text-sm text-purple-400 font-semibold">
                Expected: Late July / Early August
              </p>
              <p className="text-sm text-gray-400">
                Link will be updated here once live.
              </p>
            </SectionCard>

            <div className="grid md:grid-cols-2 gap-8">
              <SectionCard
                title="🎓 Educational Posts"
                description="Dive into hands-on articles and guides on prompt engineering, NLP with LLMs, fine-tuning, RAG, and advanced ML."
                icon="✍️"
                onClick={() => navigateToSection('educationalPosts')} // Changed to navigateToSection
              />
              <SectionCard
                title="📢 AI/ML News"
                description="Get short, digestible updates on GenAI breakthroughs, major releases from tech giants, open-source model trends, and conference announcements."
                icon="📰"
                onClick={() => navigateToSection('aiMlNews')} // Changed to navigateToSection
              />
              <SectionCard
                title="🚀 Student Projects"
                description="Showcasing community and student projects: prompt design experiments, mini NLP/ML apps, and innovative chatbot UX designs."
                icon="💡"
                onClick={() => navigateToSection('studentProjects')} // Changed to navigateToSection
              >
                <p className="text-sm text-gray-500 mt-2">Want to feature your project? <span className="text-purple-400 underline">Email us!</span></p>
              </SectionCard>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white py-16 px-6 relative overflow-hidden">
      {/* Background Animated Gradients */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {activeSection === 'main' && (
          <div className="text-center animate-slide-down">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              Education @ PromptEngine
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your ultimate knowledge hub for the dynamic world of <span className="font-semibold text-purple-300">Machine Learning, Natural Language Processing, and Generative AI.</span> Empowering developers, students, and enthusiasts to innovate and excel.
            </p>
          </div>
        )}

        {/* Dynamic Content Renderer */}
        <div className={`p-8 bg-gray-900 rounded-2xl shadow-2xl border border-purple-800 ${activeSection !== 'main' ? 'animate-fade-in' : ''}`}>
          {renderContent()}
        </div>
      </div>

      {/* Tailwind CSS keyframe animations (add to your CSS or a <style> tag if not using PostCSS/build step) */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slide-down { animation: slideDown 0.8s ease-out forwards; }
        .animate-pulse { animation: pulse 2s infinite ease-in-out; }
        .animate-blob { animation: blob 7s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

interface SectionCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  children?: React.ReactNode;
  isPrimary?: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, icon, onClick, children, isPrimary = false }) => {
  return (
    <div
      className={`
        bg-gray-800 p-8 rounded-2xl shadow-xl border
        ${isPrimary ? 'border-purple-600 bg-gradient-to-br from-gray-850 to-gray-900 animate-slide-in-top' : 'border-purple-700'}
        hover:border-purple-500 hover:shadow-purple-glow
        transition-all duration-300 ease-in-out
        transform hover:-translate-y-2 hover:scale-102
        cursor-pointer
      `}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <span className="text-5xl mr-4 transform hover:rotate-6 transition-transform duration-300">{icon}</span>
        <h2 className={`text-3xl font-extrabold ${isPrimary ? 'text-purple-300' : 'text-purple-300'}`}>
          {title}
        </h2>
      </div>
      <p className="text-lg text-gray-300 mb-4">{description}</p>
      {children}
      <style jsx>{`
        @keyframes slideInTop {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-top { animation: slideInTop 0.7s ease-out forwards; }

        .hover\\:shadow-purple-glow {
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.6), 0 0 30px rgba(168, 85, 247, 0.3);
        }
      `}</style>
    </div>
  );
};

export default EducationPage;