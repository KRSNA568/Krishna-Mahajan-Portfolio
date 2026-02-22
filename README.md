# Krishna Mahajan — Developer Portfolio

A modern, animated 3D developer portfolio with a built-in AI chatbot. Built with React, Three.js, TailwindCSS, Framer Motion on the frontend and a FastAPI + MongoDB backend that lets visitors chat with an LLM trained on my resume and portfolio data.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Chatbot Setup](#-chatbot-setup)
- [Environment Variables](#-environment-variables)

---

## ✨ Features

- 🌌 3D visuals powered by **React Three Fiber** and **Drei**
- ⚡ Smooth scroll-based animations using **Framer Motion**
- 🎨 Clean, responsive UI with **TailwindCSS v4**
- 📄 Resume viewer modal with PDF download
- 🤖 **AI Chatbot** — floating widget that answers questions about my resume & projects
  - FastAPI backend with session-based conversation history
  - Powered by **Gemma 3** (free) via **OpenRouter**
  - Conversations persisted in **MongoDB Atlas**
- 🚀 Lightning-fast development with **Vite**

---

## 🛠 Tech Stack

### Frontend
| Tech | Description |
|---|---|
| React + Vite | UI library + fast dev bundler |
| TailwindCSS v4 | Utility-first CSS framework |
| Framer Motion | Animation library |
| React Three Fiber / Drei | 3D rendering with Three.js |

### Backend (ChatBot/)
| Tech | Description |
|---|---|
| FastAPI | Python async web framework |
| Motor | Async MongoDB driver |
| MongoDB Atlas | Cloud database for chat sessions |
| OpenRouter | LLM API gateway (free tier) |
| Gemma 3 4B | LLM model via OpenRouter |
| pdfplumber | PDF text extraction for resume context |

---

## 📁 Project Structure

```bash
├── public/
│   ├── assets/             # Images, logos, project screenshots
│   ├── models/             # 3D Astronaut GLTF model
│   └── Krishna_resume.pdf  # Resume served for viewer modal
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ChatBot.jsx     # Floating AI chat widget
│   │   ├── ResumeModal.jsx # PDF resume viewer modal
│   │   └── ...
│   ├── constants/          # Project data, socials, experience
│   ├── sections/           # Page sections (Hero, About, Projects, etc.)
│   ├── App.jsx
│   └── main.jsx
├── ChatBot/                # FastAPI AI chatbot backend
│   ├── main.py             # FastAPI app + OpenRouter + MongoDB
│   ├── context_loader.py   # Builds LLM system prompt from resume PDF
│   ├── requirements.txt
│   ├── .env                # API keys (not committed)
│   └── .env.example
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### Frontend

```bash
# 1. Clone the repo
git clone https://github.com/krishnamahajan/Portfolio.git
cd Portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# Runs at http://localhost:5174
```

### Backend (AI Chatbot)

```bash
# 1. Create and activate Python virtual environment
python3 -m venv .venv
source .venv/bin/activate      # macOS/Linux
# .venv\Scripts\activate       # Windows

# 2. Install Python dependencies
pip install -r ChatBot/requirements.txt

# 3. Add your environment variables
cp ChatBot/.env.example ChatBot/.env
# Fill in OPENROUTER_API_KEY and MONGODB_URI in ChatBot/.env

# 4. Start the API server
cd ChatBot
uvicorn main:app --port 8000
# Runs at http://localhost:8000
```

---

## 🤖 Chatbot Setup

The chatbot reads your resume PDF and portfolio data at startup to build a system prompt, then routes user messages to an LLM via OpenRouter.

1. Get a free API key at [openrouter.ai/keys](https://openrouter.ai/keys)
2. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas) and copy your connection string
3. Add both to `ChatBot/.env` (see below)

---

## 🔑 Environment Variables

Create `ChatBot/.env` with the following:

```env
# OpenRouter — free LLM API
OPENROUTER_API_KEY=your_openrouter_api_key_here

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```
