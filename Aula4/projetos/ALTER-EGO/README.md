# 🚀 AlterEgo — AI Persona Chat App

<p align="center">
  <b>Create, customize, and chat with AI personalities in real-time</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Build-Vite-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/API-OpenRouter-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-cyan?style=for-the-badge" />
</p>

---

## 🌐 Live Demo

🔗 https://your-live-demo-link.vercel.app

---

## 📸 Preview

![App Screenshot](./preview.png)

---

## 🧠 About The Project

**AlterEgo** is an AI-powered web application that enables users to create and interact with different AI personas.

Unlike generic chatbots, AlterEgo focuses on **personality-driven conversations**, allowing users to simulate different behaviors, tones, and identities.

---

## ✨ Key Features

* 🤖 AI Persona-based Chat System
* 🎭 Custom Personality Configuration
* ⚡ Real-time Response Handling
* 🔌 OpenRouter LLM Integration
* 📱 Fully Responsive UI
* 💾 Local Storage-based session persistence

---

## 🏗️ Architecture Overview

```
Frontend (React + Vite)
        ↓
Browser (API Call)
        ↓
OpenRouter API
        ↓
LLM Response
```

⚠️ Current Design:

* Direct API calls from frontend
* No backend layer

🚨 Limitation:

* API keys are exposed in the browser

---

## 🔐 Security Consideration

This project is currently **frontend-only**, which means:

* API key is stored in localStorage
* Not suitable for production-level deployment

### ✅ Recommended Fix

```
Frontend → Backend → OpenRouter API
```

This ensures:

* 🔒 API key protection
* 🛡️ Rate limiting
* 📊 Better control

---

## 🛠️ Tech Stack

| Category   | Technology       |
| ---------- | ---------------- |
| Frontend   | React + Vite     |
| Styling    | Tailwind CSS     |
| API        | OpenRouter       |
| Deployment | Vercel / Railway |

---

## 📂 Project Structure

```
ALTER-EGO/
│
├── src/                # React source code
├── server.mjs         # Node server (Railway deployment)
├── .env.example       # Environment variables template
├── index.html
├── package.json
├── vercel.json
└── railway.toml
```

---

## ⚙️ Environment Variables

Create a `.env` file in root:

```
VITE_OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
VITE_OPENROUTER_MODEL=meta-llama/llama-3-8b-instruct
VITE_OPENROUTER_APP_NAME=AlterEgo
VITE_OPENROUTER_APP_URL=https://your-domain.vercel.app
```

---

## 📦 Installation & Setup

```
git clone https://github.com/your-username/alterego.git
cd alterego
npm install
npm run dev
```

---

## 🚀 Build & Production

```
npm run build
npm run preview
```

---

## 🌍 Deployment Guide

### 🔹 Vercel

1. Import repo to Vercel
2. Build Command → `npm run build`
3. Output Directory → `dist`
4. Add environment variables
5. Deploy 🚀

---

### 🔹 Railway

1. Create project from GitHub
2. Build → `npm run build`
3. Start → `npm run start`
4. Add environment variables
5. Deploy

---

## 📈 Future Enhancements

* 🔐 Backend proxy for API security
* 🧠 Memory-based conversations
* 🎤 Voice interaction
* 📊 Analytics dashboard
* 🧩 Plugin system

---

## 🤝 Contributing

```
# Fork the repo
git checkout -b feature/your-feature
git commit -m "Added new feature"
git push origin feature/your-feature
```

---

## 🐛 Known Issues

* API key exposure in frontend
* No rate limiting
* Limited conversation memory

---

## 👨‍💻 Author

**Tushar Singh**
🚀 Full-Stack MERN Developer
💡 Passionate about AI + Scalable Systems

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project:

👉 Star this repo
👉 Share with others
👉 Contribute

---

## 💀 Final Note

> “Good developers write code. Great developers build systems.”
# ALTER-EGO
