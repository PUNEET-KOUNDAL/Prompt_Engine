import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out our prompt engine",
      features: [
        "5 prompt generations per month",
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
        "49 prompt generations per month",
        "Advanced prompt templates",
        "Priority response time",
        "Phone & email support",
        "Custom prompt fine-tuning",
        "Team collaboration tools"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific needs",
      features: [
        "3 Expert as per required domain ",
        "Custom prompt development",
        "Dedicated account manager",
        "24/7 priority support",
        "API access",
        "Meeting support ",
        "Training and decision sessions"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the plan that best fits your business needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 ${
              plan.popular ? 'transform scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                Most Popular
              </div>
            )}

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                )}
              </div>
              <p className="text-gray-600 mb-8">{plan.description}</p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/create"
                className={`block text-center py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Started
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We offer tailored enterprise solutions for organizations with specific requirements.
          Let's discuss how we can help you achieve your goals.
        </p>
        <a
          href="mailto:contact@promptengine.ai"
          className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Contact Sales
        </a>
      </div>
    </div>
  );
};

export default PricingPage;