import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy } from 'lucide-react';

const ExamplesPage: React.FC = () => {
  const examples = [
    {
      title: "E-commerce Customer Support",
      business: "ShopSmart",
      industry: "E-commerce",
      audience: "Online shoppers",
      useCase: "Customer Support",
      testimonial: {
        text: "The prompts generated have revolutionized our customer service. Our response accuracy improved by 85%!",
        author: "Sarah Chen",
        role: "Customer Success Manager at ShopSmart"
      },
      prompt: `You are an AI assistant for ShopSmart, an e-commerce company.

Your primary goal is to help online shoppers with customer support issues.

When responding to users:
1. Maintain a professional, helpful tone consistent with ShopSmart's brand
2. Provide specific, actionable information related to order tracking, returns, and product questions
3. Consider the needs and knowledge level of online shoppers
4. Focus solutions on the specific industry context of e-commerce
5. Address customer concerns with empathy and precision

Always prioritize accuracy, clarity, and customer satisfaction in your responses.`
    },
    {
      title: "Financial Advisory Services",
      business: "WealthWise",
      industry: "Finance",
      audience: "Individual investors",
      useCase: "Investment Advice",
      testimonial: {
        text: "These prompts helped us deliver consistent, compliant financial guidance across all our AI channels.",
        author: "Michael Rodriguez",
        role: "Head of Digital at WealthWise"
      },
      prompt: `You are an AI assistant for WealthWise, a company in the finance industry.

Your primary goal is to help individual investors with investment advice.

When responding to users:
1. Maintain a professional, helpful tone consistent with WealthWise's brand
2. Provide specific, actionable information related to investment advice
3. Consider the needs and knowledge level of individual investors
4. Focus solutions on the specific industry context of finance
5. Address customer concerns with empathy and precision
6. Always include disclaimers about not providing official financial advice

Always prioritize accuracy, clarity, and customer satisfaction in your responses.`
    },
    {
      title: "Healthcare Patient Support",
      business: "MediCare Plus",
      industry: "Healthcare",
      audience: "Patients",
      useCase: "Health Information",
      testimonial: {
        text: "The AI prompts have transformed how we handle patient inquiries, making our responses more empathetic and accurate.",
        author: "Dr. Emily Watson",
        role: "Digital Health Director at MediCare Plus"
      },
      prompt: `You are an AI assistant for MediCare Plus, a company in the healthcare industry.

Your primary goal is to help patients with health information and guidance.

When responding to users:
1. Maintain a professional, helpful tone consistent with MediCare Plus's brand
2. Provide specific, actionable information related to general health questions and services
3. Consider the needs and knowledge level of patients with varying medical knowledge
4. Focus solutions on the specific industry context of healthcare
5. Address patient concerns with empathy and precision
6. Include disclaimers that you're not providing medical advice and recommend consulting healthcare professionals

Always prioritize accuracy, clarity, and patient well-being in your responses.`
    }
  ];

  const copyExample = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 py-16 px-6 relative overflow-hidden">
      {/* Background Animated Gradients - matching PricingPage */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-slide-down">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-4">
            Success Stories & Examples
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            See how businesses are transforming their AI interactions with our custom prompts.
          </p>
        </div>

        <div className="space-y-12">
          {examples.map((example, index) => (
            <div
              key={index}
              className={`
                bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200
                hover:border-blue-300 hover:shadow-xl transition-all duration-300 ease-in-out
                animate-fade-in
              `}
              style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
            >
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-8">
                <h2 className="text-3xl font-bold mb-2">{example.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100 mb-6">
                  <div>
                    <span className="font-semibold">Business:</span>
                    <span className="ml-2">{example.business}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Industry:</span>
                    <span className="ml-2">{example.industry}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Audience:</span>
                    <span className="ml-2">{example.audience}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Use Case:</span>
                    <span className="ml-2">{example.useCase}</span>
                  </div>
                </div>

                {/* Testimonial */}
                <blockquote className="border-l-4 border-blue-200 pl-4 mt-6">
                  <p className="text-lg italic mb-4">"{example.testimonial.text}"</p>
                  <footer className="text-sm">
                    <strong className="font-medium">{example.testimonial.author}</strong>
                    <br />
                    {example.testimonial.role}
                  </footer>
                </blockquote>
              </div>

              <div className="p-8">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">Generated Prompt</h3>
                  <button
                    onClick={() => copyExample(example.prompt)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Copy className="h-5 w-5 mr-2" />
                    Copy Prompt
                  </button>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap border border-blue-200 text-gray-800">
                  {example.prompt}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 bg-blue-50 rounded-2xl p-8 shadow-md border border-blue-200 animate-fade-in">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Ready to create your own customized prompt?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            Start crafting powerful AI interactions that drive your business forward.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            Create Your Prompt <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Tailwind CSS keyframe animations (matching previous pages) */}
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

export default ExamplesPage;