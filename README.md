# 🤖 AI‑Powered Code Reviewer (MERN)

[![MERN](https://img.shields.io/badge/MERN-Stack-1f2937?logo=mongodb&logoColor=white)](https://developer.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-1f2937?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-1f2937?logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-1f2937?logo=express)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-1f2937.svg)](LICENSE)

A modern web app that **reviews code with AI** and returns actionable feedback: bugs, security smells, complexity, best‑practice tips, and refactors. Built with the **MERN stack** with a clean, modular structure (`/Backend`, `/Frontend`).

> Tip: This README is designed to be recruiter‑friendly and contributor‑ready. Copy/paste works as‑is. Update any sections marked as _optional_.

---

## ✨ Features

- Paste code or upload a file and get **AI review** in seconds
- Highlights **issues**, suggests **fixes**, and shares **best practices**
- **Language‑agnostic** prompt pipeline (JS/TS, Python, C/C++, Java, etc.)
- **History** of reviews to compare changes over time _(optional)_
- Ready for **cloud deployment** (Render)

---

## 🧱 Tech Stack

**Frontend:** React 18, Vite, Tailwind
**Backend:** Node.js, Express, MongoDB (Mongoose)  
**AI Providers:** Pluggable – supports **Google Gemini**  (choose with env)  
**Other:** axios, CORS, dotenv



---

## 📦 Monorepo Layout

```
AI-Powered-Code-Reviewer-using-the-MERN-Stack-/
├─ Backend/
│  ├─ src/ (controllers, routes, services)
│  ├─ package.json
│  └─ ... (env, README)
├─ Frontend/
│  ├─ src/ (components)
│  ├─ package.json
│  └─ ... (vite/CRA config)
└─ README.md
```

---

## ⚙️ Local Setup (Dev)

### 1) Clone
```bash
git clone https://github.com/usamafaheem-dev/AI-Powered-Code-Reviewer-using-the-MERN-Stack-.git
cd AI-Powered-Code-Reviewer-using-the-MERN-Stack-
```

### 2) Backend
```bash
cd Backend
npm install
cp .env.example .env   # create if missing
npm run dev            # nodemon recommended
```
**`.env` (Backend)**
```
# Choose one provider and keep its key
GEMINI_API_KEY=your_gemini_key_here        # if using Google Generative AI
OPENAI_API_KEY=your_openai_key_here        # if using OpenAI

MONGODB_URI=mongodb+srv://<user>:<pass>@cluster/db
JWT_SECRET=supersecret_dev_key
PORT=5000
CLIENT_ORIGIN=http://localhost:5173        # or 3000
```

### 3) Frontend
Open a second terminal:
```bash
cd Frontend
npm install
cp .env.example .env   # create if missing
npm run dev            # Vite: http://localhost:5173
```
**`.env` (Frontend)**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🔌 API (Sketch)

> Adjust names if your actual routes differ.

```
POST   /api/review           # body: { code, language? } → { summary, issues[], suggestions[] }



```

**Response example (`/api/review`)**
```json
{
  "summary": "Overall solid. Watch error handling and input validation.",
  "issues": [
    {"type":"security","line":23,"message":"Use parameterized queries to avoid injection."},
    {"type":"bug","line":58,"message":"Null check before using response.data."}
  ],
  "suggestions": [
    "Extract a util for API calls",
    "Add unit tests for the service layer"
  ]
}
```

---

## 🧠 How AI Review Works

- Backend builds a **prompt** from the code snippet (and filename/language when provided)
- Sends to **Gemini** using your API key
- Normalizes the result into a consistent `{summary, issues[], suggestions[]}` schema
- Frontend renders a readable report with copyable patches _(optional)_

> Add rate‑limiting if you plan to expose public endpoints.

---

## 🛡️ Quality & Security

- Input size limits (e.g., 20–50 KB) to control token usage
- Basic sanitization + CORS
- Store only what you need; avoid saving raw code unless required

---

## 🧪 Scripts

_Backend_
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

_Frontend_
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🚀 Deployment

- **Backend:** Render 
  - Set env vars (`MONGODB_URI`, `GEMINI_API_KEY`/`OPENAI_API_KEY`, `CLIENT_ORIGIN`)
- **Frontend:** Netlify / Vercel
  - Set `VITE_API_BASE_URL` to the deployed backend URL

> For monorepos, deploy folders separately. On Render, set **Root Directory** to `Backend/`.

---



## 🗺️ Roadmap

- [ ] Inline diff view with patch suggestions
- [ ] Repo‑level analysis (upload zip / GitHub URL)
- [ ] PR bot integration (webhooks)
- [ ] Syntax‑aware suggestions per language
- [ ] Dark/light theme toggle

---

## 📄 License

MIT © Usama Faheem

---

## 🙌 Credits

- MERN community & docs
- Google Gemini 
- All contributors
