// src/components/CareerPage.tsx
import React from 'react';

const CareerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-purple-400">Join PromptEngine</h1>
        <p className="text-lg mb-10 text-gray-300">
          At <span className="text-purple-300 font-semibold">PromptEngine</span>, we’re building powerful tools for AI-powered prompt development and LLM integration.
          We’re looking for passionate learners and builders to join us as interns. If you're excited by LLMs, NLP, and making AI tools accessible — we want you!
        </p>

        <div className="space-y-12">
          {/* Web Developer Intern */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-purple-700">
            <h2 className="text-2xl font-semibold text-purple-300">Web Developer Intern</h2>
            <ul className="list-disc ml-6 mt-3 space-y-1 text-gray-200">
              <li>Build UI components in React with TailwindCSS</li>
              <li>Integrate LLM API cards (OpenAI, Gemini, Meta, Hugging Face)</li>
              <li>Work on dynamic settings (temperature, max tokens, etc.)</li>
              <li>Collaborate with designers and AI engineers</li>
            </ul>
          </div>

          {/* Data Scientist Intern */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-purple-700">
            <h2 className="text-2xl font-semibold text-purple-300">Data Scientist Intern</h2>
            <ul className="list-disc ml-6 mt-3 space-y-1 text-gray-200">
              <li>Explore prompt tuning and LLM performance optimization</li>
              <li>Design and test Retrieval-Augmented Generation (RAG)</li>
              <li>Evaluate text generation from Hugging Face and OpenAI models</li>
              <li>Support dataset preparation and prompt analytics</li>
            </ul>
          </div>

          {/* DevOps Intern */}
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-purple-700">
            <h2 className="text-2xl font-semibold text-purple-300">DevOps Intern</h2>
            <ul className="list-disc ml-6 mt-3 space-y-1 text-gray-200">
              <li>Deploy APIs and LLM endpoints with CI/CD</li>
              <li>Monitor system health and usage logs</li>
              <li>Work with Docker, GitHub Actions, and scalable environments</li>
              <li>Assist in building developer-friendly APIs</li>
            </ul>
          </div>
        </div>

        {/* Application Section */}
        <div className="mt-12 bg-purple-800/10 border border-purple-700 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-purple-300 mb-2">How to Apply</h3>
          <p className="text-gray-200">
            Send your resume and a short note on why you want to join us to:{' '}
            <a
              href="mailto:puneetkoundal707@gmail.com"
              className="underline text-purple-400 hover:text-purple-300"
            >
              puneetkoundal707@gmail.com
            </a>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            We encourage applications from students, self-taught developers, and AI enthusiasts.
            Show us what you've built — GitHub links or portfolios are a plus!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
