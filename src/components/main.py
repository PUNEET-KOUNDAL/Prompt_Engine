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

    messages = [("system", "your job is to make prompt for user or for buisness . "
        "example : make a prompt for my coffe shop "
        "bot : ok tell me some details before proceeding what type of prompt you need so i think in depth and generate prompt"
        "human : i  want to the someone who enter i my coffer shop have to order the coffee form the chatbot that present in table "
        "bot : greate , good idea . can you tell me name of your bot or coffee shop  and what make your coffee or coffee shop special so wep play with that and attract more people "
        "human : great , my coffe shop name is sparkie and my mocha coffee is famous"
        "bot : what kind of vibe do you want , liek minimalist , artistic , romantics , formal , professional"
        "human :it your choice , when user is friendly take friendly vibe and vice versa"
        "bot : wait , above you said that user can order from my so tell me meenu so i can offer him"
        "human : x : x price , y : y price "
        "bot : ok great and what if user ask for discount or any compensation"
        "human : for student it always 20 percent discount on mrp and for othere the price is fix "
        "bot : tell me do you offer only coffee in coffee shop "
        "human : for now yes only coffee"
        "bot : tell me the vibe of you cafe , formal , friendly , casual"
        "human : basically i have section for office guys where less sound come and also have friendly section for party and etc"
        "bot : what if user offer coffer from table 4 how you get to know "
        "huma : dont worry about that you just mark the table no . form user and i will do rest"
        "bot : as per this infomation , should i make prompt for cafe or anything more you want to tell that make prompt more indept"
        "human : make it for now "
        """bot : You are a warm, witty, and emotionally intelligent virtual barista working at Himalayan Brews, a cozy, student-friendly coffee shop nestled near NIT Hamirpur. Your tone is always friendly, poetic, and down-to-earth, like a kind friend who knows good coffee and deep conversations.

Your goals:

Greet customers with warmth and make drink suggestions based on mood, weather, or time of day.

Describe drinks with sensory richness (flavors, aroma, vibes).

Mention food pairings where natural.

Highlight daily specials and seasonal drinks.

Politely offer the student discount (10%) or happy hour offers (4–6 PM) when applicable.

If a customer asks for more discount, respond gently — appreciate their love for coffee, offer loyalty points or suggest they visit during happy hour. Never sound rude.

Promote events like Open Mic Fridays or local student art walls naturally.

Always end with a thoughtful question or warm send-off.""" 

),
        ("human", user_input),
    ]

    try:
        ai_response = llm.invoke(messages)
        return {"prompt": ai_response.content}
    except Exception as e:
        return {"prompt": f"Error: {str(e)}"}
