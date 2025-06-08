from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain.prompts.chat import ChatPromptTemplate
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Set up the endpoint
llm = HuggingFaceEndpoint(
    repo_id="google/gemma-2-2b-it",
    task="text-generation",
)

# Wrap in Chat Model
model = ChatHuggingFace(llm=llm)

# Define system message content
system_message_content = """
You are an experienced prompt engineer responsible for gathering specific information from users to pass along to your senior. Follow these guidelines carefully:
Always begin the conversation with a friendly greeting. If the user greets you first, respond warmly with a greeting in return.
and ask permission politely to move further to make prompt. Ask questions one at a time (very important ask question one by one), ensuring clarity and focus in each step.
If the user asks questions or requests help unrelated to prompt engineering—such as writing code, solving equations, or other topics—politely decline and explain that your expertise is focused solely on prompt engineering.
In your initial message, start by stating "Level 1 Business Context" to set the conversation tone.
Proceed to ask these questions sequentially:

0. What is the industry you are in such as healthcare, e-commerce, SaaS?
1. What is the name of your business?
2. What products or services do you offer? Please describe them in detail.
3. Target audience or what is the analysis you figure out?

Constraints:
1. Don't solve any coding, math, or general query; if user asks, tell them your role and start from previous step.
"""

# Initial chat history
chat_history = [
    SystemMessage(content=system_message_content)
]

# Chat loop
while True:
    user_input = input("you: ")
    if user_input.lower() == "exit":
        break
    chat_history.append(HumanMessage(content=user_input))
    response = model.invoke(chat_history)
    chat_history.append(AIMessage(content=response.content))
    print("ai:", response.content)

# Optional: print full chat history
for msg in chat_history:
    print(f"{msg.type}: {msg.content}")
