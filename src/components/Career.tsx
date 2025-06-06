// src/components/CareerPage.tsx
import React from 'react';

const CareerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 py-16 px-6 relative overflow-hidden">
      {/* Background Animated Gradients - matching EducationPage */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            At <span className="text-blue-700 font-semibold">PromptEngine</span>, we’re pioneering tools for AI-powered prompt development and LLM integration. We're on the lookout for **passionate learners and builders** to join us as interns. If you're excited by LLMs, NLP, and making AI tools accessible — we want you!
          </p>
        </div>

        <div className="space-y-8">
          {/* Web Developer Intern */}
          <JobCard
            title="Web Developer Intern"
            responsibilities={[
              "Build intuitive UI components using **React** and **TailwindCSS**.",
              "Integrate **LLM API cards** (OpenAI, Gemini, Meta, Hugging Face).",
              "Implement dynamic settings (temperature, max tokens, etc.).",
              "Collaborate closely with designers and AI engineers."
            ]}
          />

          {/* Data Scientist Intern */}
          <JobCard
            title="Data Scientist Intern"
            responsibilities={[
              "Explore **prompt tuning** and LLM performance optimization.",
              "Design and test **Retrieval-Augmented Generation (RAG)** systems.",
              "Evaluate text generation from Hugging Face and OpenAI models.",
              "Support **dataset preparation** and prompt analytics."
            ]}
          />

          {/* DevOps Intern */}
          <JobCard
            title="DevOps Intern"
            responsibilities={[
              "Deploy APIs and LLM endpoints with robust **CI/CD** pipelines.",
              "Monitor system health and analyze usage logs.",
              "Work with **Docker**, GitHub Actions, and scalable environments.",
              "Assist in building developer-friendly APIs."
            ]}
          />
        </div>

        {/* Application Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 p-8 rounded-2xl shadow-md animate-fade-in">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">How to Apply</h3>
          <p className="text-gray-700 text-lg mb-3">
            Ready to make an impact? Send your resume and a short note on why you want to join us to:{' '}
            <a
              href="mailto:puneetkoundal707@gmail.com"
              className="underline text-blue-700 hover:text-blue-600 font-semibold transition-colors duration-300"
            >
              puneetkoundal707@gmail.com
            </a>
          </p>
          <p className="text-md text-gray-500 italic">
            We encourage applications from **students, self-taught developers, and AI enthusiasts**. Show us what you've built — GitHub links or portfolios are a plus!
          </p>
        </div>
      </div>

      {/* Tailwind CSS keyframe animations (matching EducationPage) */}
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
        .animate-pulse { animation: pulse 2s infinite ease-in-out; } /* Not used in this page, but kept for consistency if needed */
        .animate-blob { animation: blob 7s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

interface JobCardProps {
  title: string;
  responsibilities: string[];
}

const JobCard: React.FC<JobCardProps> = ({ title, responsibilities }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 animate-fade-in transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{title}</h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        {responsibilities.map((responsibility, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: responsibility }} />
        ))}
      </ul>
    </div>
  );
};

export default CareerPage;