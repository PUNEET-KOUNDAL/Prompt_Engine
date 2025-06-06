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
            <h2 className="text-3xl font-bold text-gray-800 mb-6"> Prompting Docs: Master the Art of AI Interaction</h2>
            <p className="text-lg text-gray-700 mb-4">
              The content presented here provides a detailed explanation of prompting strategies and the techniques employed to improve the overall performance and efficiency of Large Language Models (LLMs). These insights are fundamental for understanding how LLMs operate and how their responses can be influenced through well-structured inputs.

The techniques discussed—including the role of input design, contextual framing, and the use of examples (such as zero-shot, one-shot, and few-shot learning)—are essential tools for anyone working with AI systems. These methods enable users to fine-tune model behavior, guide response accuracy, and ensure alignment with specific tasks or goals.

This material is well-suited for educational purposes, especially in the fields of artificial intelligence, machine learning, and natural language processing. It serves as a foundational resource for students, researchers, and practitioners aiming to develop a deeper understanding of prompt engineering and its impact on modern AI systems.
            </p>
            <ul className="list-disc ml-8 text-gray-600 space-y-6 text-lg">
              <li>
                <span className="text-blue-700 font-semibold">Prompting Basics:</span> Prompts are fundamental to Large Language Models (LLMs) for generating desired output. Crafting a successful prompt often requires an iterative **hit-and-trial method**, as initial attempts rarely yield perfect results. Effective prompt crafting demands a deep understanding of the **domain**, and different LLMs may interpret the same prompt differently. Therefore, it's our responsibility to ensure the LLM understands the intent. For example, a prompt like "tell me about Pythagoras in a deeper way" versus "tell me about Pythagoras in an intuitive way" showcases how subtle keyword differences ("intuitive" vs. "deeper") can significantly alter the output, making it difficult to predict which will perform better in a given condition. **Domain-specific knowledge** is crucial for fine-tuning prompts, and ultimately, prompting remains an iterative process.
                <div className="my-4 text-center">
                  <img src=
                  "public\promt_basic.webp" alt="Prompting Basics Diagram" className="rounded-lg shadow-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Figure: Illustration of basic prompt structure and iteration.</p>
                </div>
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Working of Prompts:</span> A prompt typically consists of three important parts that guide an LLM in producing a good output: **Input**, **Context**, and **Examples**.
                <br /><br />
                **Input** can take various forms, such as a question, a task, or a query. It serves as the starting point, informing the model about the user's objective.
                <br /><br />
                **Context** is provided within the prompt, sometimes utilizing techniques like **Multi-Context Prompting (MCP)**. This component sets boundaries, giving the model instructions, rules, limitations, and defining the expected behavior.
                <br /><br />
                **Examples** are a crucial sub-part that become especially important in more advanced prompting. They help guide the model more clearly towards the desired output format and style.
                <br /><br />
                There are several types of example-based prompting techniques:
                <ul className="list-circle ml-8 mt-2 space-y-2">
                  <li>**Zero-shot learning:** No examples are provided. The model relies solely on the input and context to generate a response.</li>
                  <li>**One-shot learning:** A single example is included in the prompt to demonstrate the desired output format or pattern, helping the model understand the "playground" it operates within.</li>
                  <li>**Few-shot learning:** Multiple examples with some variation are given. This technique significantly enhances the model's understanding of the required structure, behavior, and intent behind the prompt.</li>
                </ul>
                <div className="my-4 text-center">
                  <img src="\public\technique_of_prompting.png" alt="Prompt Components and Learning Types Diagram" className="rounded-lg shadow-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Figure: Breakdown of prompt components and example-based learning.</p>
                </div>
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Advanced Prompt Engineering Techniques:</span> Advanced prompt engineering techniques are structured methods designed to enhance the performance of LLMs when tackling **complex and cognitively demanding tasks**. These tasks often include programming, solving mathematical problems, performing logical reasoning, completing word puzzles, and other intricate problem-solving activities.
                <br /><br />
                Through these advanced techniques, prompts are crafted to provide LLMs with clearer context, structured inputs, and more specific guidance. This significantly improves the model’s ability to understand and generate accurate and relevant responses. Furthermore, these techniques often leverage prior knowledge and logical reasoning frameworks to better guide the model's outputs, leading to more coherent and pertinent responses.
                <div className="my-4 text-center">
                  <img src="D:\PROJECTS\prompt_engine\prompt_engine\Prompt_Engine\public\technique_of_prompting.webp-auto" />
                  <p className="text-sm text-gray-500 mt-2">Figure: Conceptual representation of advanced prompt engineering.</p>
                </div>
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Chain of Thought (CoT):</span> **Chain of Thought (CoT) prompting** is an advanced technique that significantly enhances the **reasoning capabilities** of LLMs. Instead of asking the model to produce a direct answer, CoT prompting encourages it to generate a **step-by-step sequence of intermediate thoughts or logical steps** that culminate in the final solution. This structured reasoning process enables the model to better understand and solve complex problems by breaking them down into smaller, more manageable components.
                <br /><br />
                The effectiveness of CoT prompting has been empirically proven. For instance, its application to Google’s PaLM model led to a remarkable improvement in performance on the **GSM8K benchmark** (an arithmetic word problem dataset), boosting accuracy from 17.0% to 58.1%. This demonstrates CoT’s substantial potential in tasks requiring multi-step reasoning.
                <br /><br />
                Several variants of CoT prompting exist:
                <ul className="list-circle ml-8 mt-2 space-y-2">
                  <li>**Few-shot CoT prompting:** Involves providing the model with a few examples that include not only the final answers but also the detailed **reasoning steps**. Phrases like *“Let’s think step by step”* or *“Break the problem into smaller parts”* are often used to cue the model to engage in this structured reasoning. While more complex to implement than standard few-shot methods, this approach yields significantly better results on reasoning-intensive tasks.</li>
                  <li>**Zero-shot CoT prompting:** Utilizes reasoning cues without providing any examples. Even without prior demonstrations, simply prompting the model with phrases that encourage step-by-step thinking can activate its reasoning capabilities, often outperforming traditional zero-shot or few-shot baselines.</li>
                </ul>
                CoT prompting consistently outperforms standard baseline prompting across various linguistic styles, annotators, examples, and language models, highlighting its **robustness and effectiveness**. **Sensitivity in CoT prompting** refers to how prompt design influences model performance, emphasizing the importance of well-matched and clear prompts, especially for complex tasks. **Coherence in CoT** ensures that reasoning steps follow a logical order, where later steps do not illogically depend on earlier ones, and vice versa. Removing coherence negatively impacts system performance.
                <div className="my-4 text-center">
                  <img src="public\fewshortcot.png" alt="Chain of Thought Prompting Diagram" className="rounded-lg shadow-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Figure: Visualizing the Chain of Thought process.</p>
                </div>
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Self-Consistency:</span> **Self-consistency** is a technique for enhancing LLM performance by generating **multiple, diverse chains of thought** for the same problem. The model then selects the most **consistent answer** among all generated solutions. This method significantly increases the model's multi-step reasoning capabilities, similar to Chain of Thought prompting.
                <br /><br />
                It demonstrably improves the performance of CoT prompting across various benchmarks, including an impressive **+17.9% on GSM8K**, **+11.0% on SVAMP**, and **+12.2% on AQuA**. Self-consistency is an **unsupervised technique**, making it compatible with pre-trained language models as it requires no extra human annotation, training, fine-tuning, or model changes.
                <br /><br />
                For instance, it contributes up to a **+23% accuracy improvement** for larger models like LaMDA137B and GPT-3. Even for models that already perform well, self-consistency consistently offers additional gains, such as a **+12%-18% accuracy improvement** on tasks like AQuA and GSM8K over PaLM-540B.
                <div className="my-4 text-center">
                  <img src="\public\self_consistency.jpeg" alt="Self-Consistency Mechanism Diagram" className="rounded-lg shadow-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Figure: How self-consistency refines LLM outputs.</p>
                </div>
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Tree of Thought (ToT) Prompting:</span> **Tree of Thought (ToT) prompting** extends the concept of Chain of Thought by allowing LLMs to explore multiple reasoning paths. Instead of a single linear chain, ToT constructs a **tree-like structure** where each node represents an intermediate thought or step. This enables the model to **backtrack, explore alternatives, and prune unpromising paths**, leading to more robust and accurate solutions for complex problems, especially those requiring search and planning.
                <div className="my-4 text-center">
                  <img src="https://via.placeholder.com/600x300?text=Tree+of+Thought+Prompting" alt="Tree of Thought Prompting Diagram" className="rounded-lg shadow-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Figure: Illustrating the branching structure of Tree of Thought.</p>
                </div>
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Active Prompting:</span> **Active prompting** is a technique where the LLM itself plays a role in generating or refining the prompts used for subsequent steps or queries. Instead of relying solely on a fixed set of initial prompts, the model might **ask clarifying questions**, **generate potential sub-questions**, or **suggest improvements to the prompt** based on its current understanding of the task. This dynamic interaction helps in converging towards better solutions by actively involving the model in the prompt engineering process.
                <div className="my-4 text-center">
                  <img src="https://via.placeholder.com/600x300?text=Active+Prompting+Flow" alt="Active Prompting Flow Diagram" className="rounded-lg shadow-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Figure: The iterative process of active prompting.</p>
                </div>
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Reasoning Without Observation:</span> This technique focuses on tasks where the LLM needs to perform complex reasoning without direct access to external tools, real-world data, or immediate feedback. It requires the model to rely purely on its **internal knowledge and logical inference capabilities** to derive a solution. This is particularly relevant for abstract reasoning problems, hypothetical scenarios, or situations where external observation is either impossible or not provided.
                <div className="my-4 text-center">
                  <img src="https://via.placeholder.com/600x300?text=Reasoning+Without+Observation" alt="Reasoning Without Observation Diagram" className="rounded-lg shadow-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Figure: Conceptualizing reasoning without external data.</p>
                </div>
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Reason and Act (ReAct):</span> **Reason and Act (ReAct) prompting** is a powerful technique that interleaves **reasoning traces (Thought)** with **task-specific actions (Act)**. The LLM generates a thought process, then decides on an action to perform (e.g., using a search engine, calling an API, or generating a specific output format). The result of the action is then observed, and the model continues its thought process based on this observation. This iterative cycle of **Thought-Act-Observation** allows LLMs to perform dynamic problem-solving, leveraging external tools and adapting to real-time feedback.
                <div className="my-4 text-center">
                  <img src="https://via.placeholder.com/600x300?text=Reason+and+Act+(ReAct)" alt="Reason and Act (ReAct) Diagram" className="rounded-lg shadow-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Figure: The iterative Thought-Act-Observation loop of ReAct.</p>
                </div>
              </li>
              <li>
                <span className="text-blue-700 font-semibold">Reflection:</span> **Reflection** in prompt engineering involves the LLM critically evaluating its own generated output or reasoning process. After an initial attempt to solve a problem, the model is prompted to **critique its solution**, identify potential errors, or recognize areas for improvement. This self-assessment mechanism allows the model to **refine its answer or reasoning path iteratively**, leading to higher quality and more accurate outputs. It's often used in conjunction with other techniques to enhance robustness.
                <div className="my-4 text-center">
                  <img src="https://via.placeholder.com/600x300?text=LLM+Reflection+Process" alt="LLM Reflection Process Diagram" className="rounded-lg shadow-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Figure: The self-correction cycle through reflection.</p>
                </div>
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
            href="https://www.youtube.com/" // Replace with your actual YouTube channel URL
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