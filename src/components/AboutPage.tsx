import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Sparkles, Settings, Users, MessageSquare } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Prompt Engine</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transforming how businesses leverage AI through professional, tailored prompts
        </p>
      </div>
      
      {/* Mission Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At Prompt Engine, we believe that the right prompt is the key to unlocking the full potential of AI for your business. Our mission is to democratize access to high-quality LLM prompts, making it easy for businesses of all sizes to harness the power of AI without requiring specialized expertise.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We're committed to helping organizations achieve tangible results through better AI interactions, whether you're looking to enhance customer support, streamline content creation, or develop innovative AI-powered solutions tailored to your industry needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">1. Enter Your Requirements</h3>
            <p className="text-gray-600">
              Provide details about your business, industry, target audience, and specific use case for the AI prompt.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">2. Generate Your Prompt</h3>
            <p className="text-gray-600">
              Our engine analyzes your requirements and crafts a professional prompt optimized for your specific needs.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-indigo-600" />
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">Why Businesses Choose Us</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex">
            <div className="mr-4">
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Technical Precision</h3>
              <p className="text-gray-600">
                Our prompts are carefully engineered based on the latest best practices in prompt engineering, ensuring optimal results from any LLM platform.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex">
            <div className="mr-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Industry Expertise</h3>
              <p className="text-gray-600">
                Prompts are tailored to specific industries and use cases, incorporating relevant terminology and addressing common challenges.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex">
            <div className="mr-4">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Immediate Results</h3>
              <p className="text-gray-600">
                Skip the trial and error of prompt creation and get professional-quality results immediately, saving valuable time and resources.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 flex">
            <div className="mr-4">
              <Brain className="h-8 w-8 text-blue-600" />
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
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your AI Interactions?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Start creating professional, effective prompts today and see the difference in your AI results
        </p>
        <Link
          to="/create"
          className="inline-flex items-center px-6 py-3 bg-white text-blue-700 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Create Your First Prompt <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;