from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    businessName: str
    industry: str
    targetAudience: str
    useCase: str
    additionalContext: str

# Get the API key from environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("Google API key is missing! Please set it in .env file")

# Initialize LLM with your API key automatically read from env
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=1,
    max_tokens=500,
    max_retries=2,
)

@app.post("/generate")
async def generate_prompt(data: PromptRequest):
    user_input = data.useCase

    messages = [("system", ""

),
        ("human", user_input),
    ]

    try:
        ai_response = llm.invoke(messages)
        return {"prompt": ai_response.content}
    except Exception as e:
        return {"prompt": f"Error: {str(e)}"}
