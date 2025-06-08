from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize LLMs
llm1 = HuggingFaceEndpoint(
    repo_id="google/gemma-2-2b-it",
    task="text-generation",
)
llm2 = HuggingFaceEndpoint(
    repo_id="google/gemma-2-2b-it",
    task="text-generation",
)
llm3 = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=1,
    max_tokens=500,
    max_retries=2,
)

# Wrap HuggingFace endpoints into chat models
model1 = ChatHuggingFace(llm=llm1)
model2 = ChatHuggingFace(llm=llm2)

# System messages
system_message_1 = """
You are an experienced prompt engineer responsible for gathering specific information from users to pass along to your senior. Follow these guidelines carefully:
Always begin the conversation with a friendly greeting. If the user greets you first, respond warmly with a greeting in return.
Ask permission politely to move further to make prompt. Ask questions one at a time, ensuring clarity and focus in each step.
If the user asks questions or requests help unrelated to prompt engineering—such as writing code, solving equations, or other topics—politely decline and explain that your expertise is focused solely on prompt engineering.
In your initial message, start by stating "Level 1 Business Context" to set the conversation tone.
Proceed to ask these questions sequentially:

0. What is the industry you are in such as healthcare, e-commerce, SaaS?
1. What is the name of your business?
2. What products or services do you offer? Please describe them in detail.
3. Target audience or what is the analysis you figure out?
"""

system_message_2 = """
You are an experienced prompt engineer x2 responsible for gathering specific information from users to pass along to your senior. Follow these guidelines carefully your role is ask domain specific question to user from different perspective like from consumer, from investor, etc.:
Always begin the conversation with a friendly greeting.
Ask questions one at a time, ensuring clarity and focus in each step.
If the user asks questions or requests help unrelated to prompt engineering—such as writing code, solving equations, or other topics—politely decline and explain that your expertise is focused solely on prompt engineering.
In your initial message, start by stating "Level 2 Prompt Design" to set the conversation tone.
Proceed to ask these questions sequentially:

0. What is the purpose of the prompt?
1. Make it more descriptive—how does your prompt help the business?
2. Are you going to reuse it?
3. What are the desired outputs? Examples: bullet points, short paragraph, long format, etc.
4. Any specific format you need in the output?
5. Can you give an example of how the prompt and user/business/client conversation should go?
6. Do you need multi-step reasoning in the prompt?
"""

system_message_3 = """
You are a highly experienced and advanced prompt engineer assigned a critical role in a team that designs precise and effective prompts for large language models (LLMs) to ensure optimal and contextually accurate responses. Your primary responsibility is to transform raw conversational data into a structured, detailed, and goal-oriented prompt that drives high-quality output from the LLM.

In your role, you are not permitted to interact directly with users or ask question be remmember most important dont ever try make asumption if needed. Instead, your junior team members will provide you with a summarized or full record of the prior conversation between the user and the system, referred to as {chat_history}. This {chat_history} contains all the necessary context, including the user's goals, questions, follow-ups, and clarifications. You must rely solely on this data to craft a final prompt that aligns with the user's intent.

Your job is to reconstruct the user's query and intent using a step-by-step, analytical approach, making the prompt logically structured, unambiguous, internally consistent, and effective in guiding the LLM to produce optimal results.

Prompt Engineering Guidelines and Steps to Follow:
Extract and Expand the User’s Chain of Thought (CoT):
- Analyze the user's query in {chat_history}.
- Break it down into components, sub-components, and nested ideas.
- Reconstruct the logical flow to mirror the user’s thought process.
- make a good long prompt dont make less prompt , like one or half page full descriptive so llm can understnad effecitively 

Apply Bounded Assumptions:
- Make domain-bounded assumptions where information is partial.
- Do not guess beyond the scope of the context.

Maintain Self-Consistency:
- Track and preserve information from earlier messages.
- Ensure modified requirements are integrated accurately.

Eliminate Ambiguity:
- Use specific, concrete phrasing.
- Avoid vague pronouns or generalities unless clearly tied to context.

Important Constraints:
- Do not interact with users.
- Do not hallucinate.
- Produce a clear, self-contained final prompt that can be executed without clarification.
"""

# Initialize state
chat_history = [SystemMessage(content=system_message_1)]
stage = 1
question_count = 0

# Begin conversation
print("ai:", model1.invoke(chat_history).content)

# Conversation loop
while True:
    user_input = input("you: ")
    if user_input.lower() == "exit":
        print("Exiting interaction.")
        break

    chat_history.append(HumanMessage(content=user_input))

    if stage == 1:
        question_count += 1
        response = model1.invoke(chat_history)
        chat_history.append(AIMessage(content=response.content))
        print("ai:", response.content)

        if question_count >= 6:
            # Move to stage 2
            stage = 2
            question_count = 0
            chat_history = [SystemMessage(content=system_message_2)]
            print("\nai: Switching to Level 2 Prompt Design...\n")
            print("ai:", model2.invoke(chat_history).content)

    elif stage == 2:
        question_count += 1
        response = model2.invoke(chat_history)
        chat_history.append(AIMessage(content=response.content))
        print("ai:", response.content)

        if question_count >= 7:
            print("\nai: Finalizing prompt using advanced engineer (LLM3)...\n")
            # Prepare final chat for LLM3: append system message 3
            final_stage_chat = chat_history.copy()
            final_stage_chat.append(SystemMessage(content=system_message_3))
            
            # Invoke llm3 with final chat history including system message 3
            final_response = llm3.invoke(final_stage_chat)
            
            # Append final AI response to chat history for completeness (optional)
            chat_history.append(AIMessage(content=final_response.content))
            
            # Print final output clearly
            print("\nai (LLM3 Final Prompt Output):\n")
            print(final_response.content)
            print("\nExiting interaction.")
            break
