import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Sparkles, Settings, Users, MessageSquare } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 py-16 px-6 relative overflow-hidden">
      {/* Background Animated Gradients - matching other pages */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-slide-down">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-4">
            About Prompt Engine
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Transforming how businesses leverage AI through professional, tailored prompts
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16 animate-fade-in">
          <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl p-8 md:p-12 shadow-lg border border-blue-200">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At Prompt Engine, we believe that the right prompt is the key to unlocking the full potential of AI for your business. Our mission is to democratize access to high-quality LLM prompts, making it easy for businesses of all sizes to harness the power of AI without requiring specialized expertise.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We're committed to helping organizations achieve tangible results through better AI interactions, whether you're looking to enhance customer support, streamline content creation, or develop innovative AI-powered solutions tailored to your industry needs.
              </p>
            </div>
          </div>
        </section>

        {/* Our Parent Company Section */}
        <section className="mb-16 animate-fade-in">
          <div className="bg-blue-50 rounded-2xl p-8 shadow-md border border-blue-200">
            <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">Our Parent Company</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed text-center">
              Prompt Engine is proudly a venture owned by SPARKIE. We operate under their guidance and adhere to industry-leading standards.
            </p>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Please refer to the complete terms and conditions of service for full details on usage, liabilities, and disclaimers. We prioritize your success and data security.
            </p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center animate-slide-down">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">1. Enter Your Requirements</h3>
              <p className="text-gray-600">
                Provide details about your business, industry, target audience, and specific use case for the AI prompt.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">2. Generate Your Prompt</h3>
              <p className="text-gray-600">
                Our engine analyzes your requirements and crafts a professional prompt optimized for your specific needs.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">3. Use Your Prompt</h3>
              <p className="text-gray-600">
                Copy your custom prompt into any LLM platform and immediately start getting tailored, business-specific responses.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center animate-slide-down">Why Businesses Choose Us</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="mr-4 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Technical Precision</h3>
                <p className="text-gray-600">
                  Our prompts are carefully engineered based on the latest best practices in prompt engineering, ensuring optimal results from any LLM platform.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 flex border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="mr-4 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Industry Expertise</h3>
                <p className="text-gray-600">
                  Prompts are tailored to specific industries and use cases, incorporating relevant terminology and addressing common challenges.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 flex border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="mr-4 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Immediate Results</h3>
                <p className="text-gray-600">
                  Skip the trial and error of prompt creation and get professional-quality results immediately, saving valuable time and resources.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 flex border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-102 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="mr-4 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">No AI Expertise Required</h3>
                <p className="text-gray-600">
                  Our intuitive platform makes advanced AI prompt engineering accessible to everyone, regardless of technical background.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-2xl p-8 md:p-12 text-center shadow-lg border border-blue-200 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your AI Interactions?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start creating professional, effective prompts today and see the difference in your AI results
          </p>
          <Link
            to="/create"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-semibold hover:bg-gray-100 hover:text-blue-800 transition-colors transform hover:scale-105 shadow-md"
          >
            Create Your First Prompt <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>
      </div>

      {/* Tailwind CSS keyframe animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
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
        .animate-blob { animation: blob 7s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default AboutPage;
