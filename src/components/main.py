from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os
import uuid # To generate unique session IDs

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173", # Assuming your React app runs on port 3000
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize LLMs (these can be moved outside the request handling for efficiency if not already)
# Ensure HF_API_TOKEN is set in your .env if the models require it or for rate limits
llm1 = HuggingFaceEndpoint(
    repo_id="google/gemma-2-2b-it",
    task="text-generation",
    # hf_token=os.getenv("HF_API_TOKEN")
)
llm2 = HuggingFaceEndpoint(
    repo_id="google/gemma-2-2b-it",
    task="text-generation",
    # hf_token=os.getenv("HF_API_TOKEN")
)
llm3 = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=1,
    max_tokens=500,
    max_retries=2,
    google_api_key=os.getenv("GOOGLE_API_KEY")
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
- When referring to chat history, specifically reference messages by their role (User, AI).

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

# In-memory session store (for demonstration purposes)
sessions: Dict[str, Dict[str, Any]] = {}

class GenerateRequest(BaseModel):
    useCase: str
    session_id: Optional[str] = None

class GenerateResponse(BaseModel):
    prompt: str
    session_id: str
    status: str
    is_final_prompt: bool = False

@app.post("/generate", response_model=GenerateResponse)
async def generate_prompt(request: GenerateRequest):
    session_id = request.session_id
    user_input = request.useCase

    if not session_id or session_id not in sessions:
        # New session or invalid session_id, initialize
        session_id = str(uuid.uuid4())
        sessions[session_id] = {
            # Start with the system message for stage 1
            "chat_history": [SystemMessage(content=system_message_1)],
            "stage": 1,
            "question_count": 0,
            "messages_sent_to_frontend": [] # To track messages already sent
        }
        
        # Get initial greeting from model1
        try:
            initial_response = model1.invoke(sessions[session_id]["chat_history"])
            sessions[session_id]["chat_history"].append(AIMessage(content=initial_response.content))
            return GenerateResponse(
                prompt=initial_response.content,
                session_id=session_id,
                status="continue",
                is_final_prompt=False
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to start conversation: {e}")

    session_data = sessions[session_id]
    chat_history = session_data["chat_history"]
    stage = session_data["stage"]
    question_count = session_data["question_count"]

    # Append user's latest message to the *current* chat history
    chat_history.append(HumanMessage(content=user_input))

    try:
        if stage == 1:
            question_count += 1
            response = model1.invoke(chat_history)
            chat_history.append(AIMessage(content=response.content))
            
            if question_count >= 4: # Based on system message 1 having 4 questions (0-3)
                # Transition to stage 2
                stage = 2
                question_count = 0 # Reset question count for the new stage
                
                # Append the system message for stage 2 to the *existing* chat history
                chat_history.append(SystemMessage(content=system_message_2))
                
                # Get initial greeting/question for stage 2 from model2
                # Pass the full chat_history (including stage 1 and stage 2 system message) to model2
                response_content = model2.invoke(chat_history).content
                chat_history.append(AIMessage(content=response_content))
                
                session_data.update({
                    "stage": stage,
                    "question_count": question_count,
                    "chat_history": chat_history
                })
                return GenerateResponse(
                    prompt=f"Switching to Level 2 Prompt Design...\n{response_content}",
                    session_id=session_id,
                    status="continue",
                    is_final_prompt=False
                )
            
            session_data.update({
                "question_count": question_count,
                "chat_history": chat_history
            })
            return GenerateResponse(
                prompt=response.content,
                session_id=session_id,
                status="continue",
                is_final_prompt=False
            )

        elif stage == 2:
            question_count += 1
            response = model2.invoke(chat_history)
            chat_history.append(AIMessage(content=response.content))
            
            if question_count >= 7: # Based on system message 2 having 7 questions (0-6)
                # Finalize prompt using advanced engineer (LLM3)
                
                # Prepare the full chat history for LLM3, including the system message for LLM3
                # We want to format the chat history for the system prompt.
                # A common approach is to format it as a string within the system prompt.
                
                # Format the existing chat history (excluding the stage system messages that are not meant for LLM3 to "talk" to)
                formatted_history = []
                for msg in chat_history:
                    if isinstance(msg, HumanMessage):
                        formatted_history.append(f"User: {msg.content}")
                    elif isinstance(msg, AIMessage):
                        formatted_history.append(f"AI: {msg.content}")
                
                # Create the final system message with the embedded chat history
                final_system_message_content = system_message_3.format(
                    chat_history="\n".join(formatted_history)
                )
                
                # The messages passed to LLM3 should primarily be the instruction for LLM3 itself
                # and then a single "HumanMessage" that LLM3 is supposed to respond to, containing the context.
                # Here, we're making the entire instruction and context part of the system message,
                # then giving a blank human message to trigger the response.
                
                # Alternatively, you could pass the entire `chat_history` list directly to `llm3.invoke`
                # if `llm3` is designed to interpret a list of LangChain Message objects.
                # Given system_message_3 expects {chat_history} as a string, this formatting is better.

                final_prompt_messages = [
                    SystemMessage(content=final_system_message_content),
                    HumanMessage(content="Please generate the final comprehensive prompt based on the provided chat history.")
                ]
                
                final_response = llm3.invoke(final_prompt_messages)
                
                # Append final AI response to chat history for completeness (optional, as session is deleted)
                # chat_history.append(AIMessage(content=final_response.content))
                
                # Clear session data after final prompt
                del sessions[session_id]
                
                return GenerateResponse(
                    prompt=f"Finalizing prompt using advanced engineer (LLM3)...\n{final_response.content}",
                    session_id=session_id,
                    status="completed",
                    is_final_prompt=True
                )
            
            session_data.update({
                "question_count": question_count,
                "chat_history": chat_history
            })
            return GenerateResponse(
                prompt=response.content,
                session_id=session_id,
                status="continue",
                is_final_prompt=False
            )

    except Exception as e:
        print(f"Error during prompt generation: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred during AI processing: {e}")

@app.post("/new_chat", response_model=GenerateResponse)
async def new_chat(request: Optional[Dict[str, Any]] = None):
    session_id = request.get("session_id") if request and "session_id" in request else None
    if session_id and session_id in sessions:
        del sessions[session_id] # Clean up existing session

    # Start a new session
    new_session_id = str(uuid.uuid4())
    sessions[new_session_id] = {
        "chat_history": [SystemMessage(content=system_message_1)], # Initialize with stage 1 system message
        "stage": 1,
        "question_count": 0,
        "messages_sent_to_frontend": []
    }
    
    # Get initial greeting from model1 for the new chat
    try:
        initial_response = model1.invoke(sessions[new_session_id]["chat_history"])
        sessions[new_session_id]["chat_history"].append(AIMessage(content=initial_response.content))
        return GenerateResponse(
            prompt=initial_response.content,
            session_id=new_session_id, # Crucially, return the new session ID
            status="continue",
            is_final_prompt=False
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start new chat: {e}")