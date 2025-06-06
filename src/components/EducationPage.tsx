import React, { useState } from 'react';

// Only 'promptingDocs' remains as an internal navigable section
type SectionKey = 'promptingDocs';

const EducationPage: React.FC = () => {
  // Set 'promptingDocs' as the default active section
  const [activeSection, setActiveSection] = useState<SectionKey>('promptingDocs');
  const [sectionHistory, setSectionHistory] = useState<SectionKey[]>(['promptingDocs']); // Initial history reflects default section

  // Function to navigate to a new section (only relevant if more sections are added later)
  const navigateToSection = (section: SectionKey) => {
    if (activeSection !== section) {
      setSectionHistory(prevHistory => [...prevHistory, section]);
      setActiveSection(section);
    }
  };

  // Function to go back in history (less relevant now, but kept for extensibility)
  const goBack = () => {
    // If there's only one item in history (the current promptingDocs), don't go back
    if (sectionHistory.length > 1) {
      const newHistory = [...sectionHistory];
      newHistory.pop();
      const previousSection = newHistory[newHistory.length - 1];
      setSectionHistory(newHistory);
      setActiveSection(previousSection);
    } else {
      // If history is exhausted or only one section, stay on 'promptingDocs'
      setActiveSection('promptingDocs');
      setSectionHistory(['promptingDocs']);
    }
  };

  const renderContent = () => {
    // Since 'promptingDocs' is the only internal section, we can render its content directly
    // The switch statement is kept for potential future expansion, but 'default' handles the only case.
    switch (activeSection) {
      case 'promptingDocs':
      default: // 'promptingDocs' is the only case and default
        return (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 Prompting Docs: Master the Art of AI Interaction</h2>
            <p className="text-lg text-gray-700 mb-4">
              Dive into our comprehensive documentation on **how to prompt Large Language Models effectively**. From the basics of prompt construction to advanced techniques, these guides will help you unlock the full potential of AI.
            </p>
            <ul className="list-disc ml-8 text-gray-600 space-y-3 text-lg">
              <li>
                <span className="text-blue-700 font-semibold">Prompting Basics:</span> Understand the fundamental principles of crafting clear, concise, and effective prompts for various AI models.
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Advanced Prompt Engineering Techniques:</span> Explore strategies like Chain-of-Thought, Few-Shot Prompting, and persona-based prompting for complex tasks.
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Prompt Patterns for Specific Use Cases:</span> Discover ready-to-use prompt structures for summarization, translation, code generation, creative writing, and more.
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Troubleshooting & Refinement:</span> Learn how to debug poor responses and iteratively refine your prompts for optimal results.
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Integrating Prompts with Your Applications:</span> Guides on connecting your finely-tuned prompts to real-world applications and workflows.
              </li>
            </ul>
            {/* No back button needed as this is the primary and only internal view */}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 py-16 px-6 relative overflow-hidden">
      {/* Background Animated Gradients - adjusted for lighter theme */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="text-center animate-slide-down">
          {/* Main Title */}
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-4">
            Education & Docs @ PromptEngine
          </h1>
          {/* Main Description - this descriptive text remains as it describes the overall page purpose */}
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Your ultimate knowledge hub for the dynamic world of <span className="font-semibold text-blue-700">Machine Learning, Natural Language Processing, and Generative AI.</span> Explore comprehensive educational content, practical implementations, and community showcases.
          </p>
        </div>

        {/* --- Navigation Tabs / Buttons (White Theme) --- */}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {/* YouTube button is now a direct external link and is prominent */}
          <a
            href="https://www.youtube.com/@PromptEngineAI" // Replace with your actual YouTube channel URL
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out
                       bg-red-500 text-white border border-red-600 hover:bg-red-600 hover:text-white
                       transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            ▶️ YouTube Channel
          </a>
          {/* Prompting Docs button - always active as it's the default and only internal view */}
          <button
            onClick={() => navigateToSection('promptingDocs')}
            className={`
              px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out
              bg-blue-600 text-white shadow-lg
              transform hover:scale-105
            `}
          >
            📝 Prompting Docs
          </button>
        </div>
        {/* --- End Navigation Tabs / Buttons --- */}

        {/* Dynamic Content Renderer */}
        <div className={`p-8 bg-white rounded-2xl shadow-xl border border-gray-200 animate-fade-in`}>
          {/* Directly render the prompting docs content as it's the default and only view */}
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

        @keyframes slideInTop {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-top { animation: slideInTop 0.7s ease-out forwards; }

        .hover\\:shadow-blue-glow {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
};

// SectionCard component is no longer used for dynamic content,
// but keeping it here for reference or if you add other types of static cards later.
// For now, the main content area directly renders the prompting docs.
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
        bg-white p-8 rounded-2xl shadow-md border
        ${isPrimary ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-white animate-slide-in-top' : 'border-gray-200'}
        hover:border-blue-400 hover:shadow-blue-glow
        transition-all duration-300 ease-in-out
        transform hover:-translate-y-2 hover:scale-102
        cursor-pointer
      `}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <span className="text-5xl mr-4 transform hover:rotate-6 transition-transform duration-300">{icon}</span>
        <h2 className={`text-3xl font-extrabold ${isPrimary ? 'text-blue-700' : 'text-gray-800'}`}>
          {title}
        </h2>
      </div>
      <p className="text-lg text-gray-700 mb-4">{description}</p>
      {children}
    </div>
  );
};

export default EducationPage;
