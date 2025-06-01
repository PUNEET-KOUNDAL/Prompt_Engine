import React, { useState } from 'react';
import { ArrowRight, Zap, Users, Briefcase, MessageSquare, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Ensure Link is imported if used for navigation

const LandingPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative font-inter"> {/* Added font-inter for consistent typography */}
      {/* Hero Section with Background Video */}
      {/* Changed height to h-screen for full homepage view */}
      <section className="relative overflow-hidden text-white h-screen flex items-center justify-center rounded-b-3xl">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          // Ensure the video path is correct. It should be accessible from the public directory.
          // For example, if your video is in `public/videos/prompt_engine.mp4`, the src would be `/videos/prompt_engine.mp4`.
          // If it's directly in `public/prompt_engine.mp4`, then `/prompt_engine.mp4` is correct.
          src="/prompt_engine.mp4"
          onError={(e) => console.error("Video failed to load:", e)} // Added error handling for video
        >
          {/* Fallback for browsers that don't support the video tag */}
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better readability - Removed blur and set opacity to 0 for no color */}
        <div className="absolute inset-0 bg-black bg-opacity-0 z-10 rounded-b-3xl" />

        {/* Main Content - Adjusted for button to be at the bottom center */}
        <div className="container relative z-20 mx-auto px-4 flex flex-col justify-end items-center h-full pb-16"> {/* Added flex-col, justify-end, items-center, and pb-16 */}
          {/* Removed the h1 tag with "AI Prompts" text */}
          <Link
            to="/create"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-full text-lg font-medium hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Creating <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 rounded-t-3xl mt-[-20px] relative z-30"> {/* Adjusted margin and rounded corners */}
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Elevate Your AI Communication
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-blue-600" />}
              title="Smart Analysis"
              description="Our AI automatically understands your business context and generates tailored prompts."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-purple-600" />}
              title="Industry Focused"
              description="Get prompts specifically designed for your industry's unique requirements and terminology."
            />
            <FeatureCard
              icon={<Briefcase className="h-10 w-10 text-indigo-600" />}
              title="Professional Results"
              description="Generate prompts that maintain your brand voice and deliver consistent results."
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 shadow-md"> {/* Added shadow */}
              <div className="text-4xl font-bold text-blue-600 mb-2">91.3%</div>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-md"> {/* Added shadow */}
              <div className="text-4xl font-bold text-purple-600 mb-2">2K+</div>
              <p className="text-gray-600">Prompts Generated</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 shadow-md"> {/* Added shadow */}
              <div className="text-4xl font-bold text-indigo-600 mb-2">200+</div>
              <p className="text-gray-600">Business Sectors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-t-3xl"> {/* Added rounded corners */}
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-blue-100">
            Join thousands of businesses already using our AI prompt engine
          </p>
          <Link
            to="/create"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 rounded-full text-lg font-medium hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chatbot Dialog */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-8 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
            <h3 className="text-white font-medium">Prompt Assistant</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 bg-gray-50 h-96 overflow-y-auto">
            <div className="bg-blue-100 rounded-lg p-3 mb-4 max-w-[80%]">
              👋 Hi! I can help you create the perfect prompt for your business. Would you like to:
              <div className="mt-3 space-y-2">
                <Link
                  to="/create"
                  className="block bg-white text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                >
                  Create a new prompt
                </Link>
                <button className="block w-full bg-white text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors text-left">
                  Talk to customer support
                </button>
                <button className="block w-full bg-white text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors text-left">
                  Learn more about our service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      <div className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl inline-block">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default LandingPage;
