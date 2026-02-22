"""
main.py
-------
FastAPI backend for the portfolio chatbot.

How a request flows:
  1. React sends  POST /chat  { "message": "...", "session_id": "abc123" }
  2. We look up (or create) the chat history for that session_id
  3. We prepend the system prompt + history and send to OpenRouter
  4. OpenRouter runs Mistral Small 3.1 24B (free) and returns the reply
  5. We store the reply and return it to React

Run with:
  uvicorn main:app --reload --port 8000
"""

import os
import uuid
from typing import Optional

from openai import OpenAI
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from context_loader import build_system_prompt

# ── Load .env ────────────────────────────────────────────────────────────────
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    raise RuntimeError("OPENROUTER_API_KEY not set. Add it to ChatHOT/.env")

# ── OpenRouter client ────────────────────────────────────────────────────────
# OpenRouter is OpenAI-compatible — we just point the base_url at their API.
# The model string tells OpenRouter which model to route to.
client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
)

MODEL = "google/gemma-3-4b-it:free"

# Build system prompt once at startup (reads PDF + portfolio data)
SYSTEM_PROMPT = build_system_prompt()

# ── FastAPI app ───────────────────────────────────────────────────────────────
app = FastAPI(title="Portfolio Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── In-memory session store ───────────────────────────────────────────────────
# Key  : session_id
# Value: list of OpenAI-format message dicts {"role": "user"/"assistant", "content": "..."}
chat_sessions: dict[str, list] = {}


# ── Schemas ───────────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str


# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/")
def health_check():
    return {"status": "Portfolio chatbot API is running ✅"}


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    session_id = req.session_id or str(uuid.uuid4())

    if session_id not in chat_sessions:
        chat_sessions[session_id] = []

    history = chat_sessions[session_id]

    try:
        # Gemma via Google AI Studio does not support the "system" role.
        # Workaround: prepend the system prompt as the very first user message,
        # paired with a canned assistant acknowledgement. This only appears once
        # at the start of every request (not stored in history).
        priming: list = [
            {"role": "user", "content": SYSTEM_PROMPT},
            {"role": "assistant", "content": "Understood. I'll answer questions about Krishna Mahajan's portfolio and resume."},
        ]

        # Build the full messages array:
        # [ priming turns ]  +  [ session history ]  +  [ new user message ]
        messages = [
            *priming,
            *history,
            {"role": "user", "content": req.message},
        ]

        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=0.7,
        )

        reply_text = response.choices[0].message.content

        # Persist turn to history
        history.append({"role": "user", "content": req.message})
        history.append({"role": "assistant", "content": reply_text})
        chat_sessions[session_id] = history

        return ChatResponse(reply=reply_text, session_id=session_id)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/chat/{session_id}")
def clear_session(session_id: str):
    chat_sessions.pop(session_id, None)
    return {"status": "cleared"}

