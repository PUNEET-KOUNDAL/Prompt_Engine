import React from 'react';
import { Check, ArrowRight } from 'lucide-react'; // Ensure lucide-react is installed

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out our prompt engine",
      features: [
        "12 prompt generations per month",
        "Basic prompt templates",
        "Standard response time",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "Ideal for growing businesses",
      features: [
        "59 prompt generations per month",
        "Advanced prompt templates",
        "Priority response time",
        "Phone & email support",
        "Custom prompt fine-tuning",
        "Team collaboration tools"
      ],
      popular: true,
      studentPrice: "$2", // New student pricing
      studentPeriod: "per month" // New student period
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific needs",
      features: [
        "3 Expert as per required domain",
        "Custom prompt development",
        "Dedicated account manager",
        "24/7 priority support",
        "API access",
        "Meeting support",
        "Training and decision sessions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 py-16 px-6 relative overflow-hidden">
      {/* Background Animated Gradients - matching EducationPage and CareerPage */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-slide-down">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that best fits your business needs, or explore our special student offer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200
                hover:border-blue-300 hover:shadow-xl transition-all duration-300 ease-in-out
                ${plan.popular ? 'transform scale-105 border-blue-400 shadow-2xl animate-fade-in' : 'animate-fade-in'}
              `}
              style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium shadow-md">
                  Most Popular
                </div>
              )}

              <div className="p-8 flex flex-col h-full"> {/* Use flex-col and h-full for consistent height */}
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-700 mb-8 flex-grow">{plan.description}</p> {/* flex-grow to push buttons to bottom */}

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" /> {/* Blue checkmark */}
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-4"> {/* mt-auto to push buttons to the bottom */}
                  <button
                    // In a real app, this would navigate or open a modal
                    onClick={() => console.log(`Getting started with ${plan.name} plan`)}
                    className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-102 shadow-md
                      ${plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700'
                        : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:text-blue-800'
                      }`}
                  >
                    Get Started
                    <ArrowRight className="inline-block ml-2 h-5 w-5" />
                  </button>

                  {/* New: Apply as Student button for Professional plan */}
                  {plan.popular && plan.studentPrice && (
                    <button
                      // In a real app, this would navigate to a student application form
                      onClick={() => console.log(`Applying as student for Professional plan at ${plan.studentPrice}`)}
                      className="block w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-102 shadow-sm
                                 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 hover:text-green-800"
                    >
                      Apply as Student ({plan.studentPrice} {plan.studentPeriod})
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Solution Section */}
        <div className="mt-16 text-center bg-blue-50 rounded-2xl p-8 shadow-md border border-blue-200 animate-fade-in">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            We offer tailored enterprise solutions for organizations with specific requirements.
            Let's discuss how we can help you achieve your goals.
          </p>
          <a
            href="mailto:contact@promptengine.ai"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            Contact Sales
            <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </a>
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

export default PricingPage;