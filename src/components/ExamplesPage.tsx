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
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories & Examples</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how businesses are transforming their AI interactions with our custom prompts
        </p>
      </div>
      
      <div className="space-y-12">
        {examples.map((example, index) => (
          <div key={index} className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-800 to-purple-800 text-white p-8">
              <h2 className="text-2xl font-bold mb-2">{example.title}</h2>
              <div className="grid grid-cols-2 gap-4 text-blue-100 mb-6">
                <div>
                  <span className="font-medium">Business:</span>
                  <span className="ml-2">{example.business}</span>
                </div>
                <div>
                  <span className="font-medium">Industry:</span>
                  <span className="ml-2">{example.industry}</span>
                </div>
                <div>
                  <span className="font-medium">Audience:</span>
                  <span className="ml-2">{example.audience}</span>
                </div>
                <div>
                  <span className="font-medium">Use Case:</span>
                  <span className="ml-2">{example.useCase}</span>
                </div>
              </div>
              
              {/* Testimonial */}
              <blockquote className="border-l-4 border-purple-400 pl-4 mt-6">
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
                <h3 className="text-lg font-medium text-gray-700">Generated Prompt</h3>
                <button
                  onClick={() => copyExample(example.prompt)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Prompt
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap border border-gray-200">
                {example.prompt}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-16">
        <p className="text-xl mb-6">Ready to create your own customized prompt?</p>
        <Link
          to="/create"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Create Your Prompt <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default ExamplesPage;