// ── TONE & STYLE OPTIONS ──
export const TONE_OPTIONS = [
  "Casual",
  "Formal",
  "Funny",
  "Philosophical",
  "Aggressive",
  "Sarcastic",
  "Empathetic",
  "Technical",
];

export const STYLE_OPTIONS = [
  "Short replies",
  "Detailed",
  "Bullet points",
  "Storytelling",
  "Direct",
  "Poetic",
];

export const EMOJIS = [
  "🤖",
  "🧑‍💻",
  "👩‍💼",
  "😂",
  "🧠",
  "🦁",
  "🔥",
  "🌊",
  "⚡",
  "🎭",
  "🧬",
  "👾",
];

// ── PLANS ──
export const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "/forever",
    desc: "Perfect to get started",
    features: [
      "20 messages/day",
      "Up to 3 personas",
      "Basic tone & style",
      "Chat history (session)",
    ],
    cta: "Current Plan",
    featured: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    desc: "For power users",
    features: [
      "Unlimited messages",
      "Unlimited personas",
      "All tones & styles",
      "Persistent chat history",
      "Priority support",
      "Export chat history",
      "Early access to features",
    ],
    cta: "Upgrade to Pro",
    featured: true,
  },
];

// ── FEATURES ──
export const FEATURES = [
  {
    icon: "Brain",
    label: "Personality Cloning",
    desc: "Create custom personas with unique tones, styles, keywords and sample messages",
  },
  {
    icon: "Zap",
    label: "Smart Responses",
    desc: "Powered by advanced language models via OpenRouter",
  },
  {
    icon: "Chat",
    label: "Real-Time Chat",
    desc: "Live conversations with your custom personas",
  },
  {
    icon: "Globe",
    label: "Multi-Persona",
    desc: "Create unlimited personality clones for work, play, and more",
  },
];

// ── COLORS & THEMES ──
export const THEME_COLORS = {
  bg: "#06060e",
  bg2: "#0d0d1a",
  bg3: "#12122a",
  surface: "rgba(255,255,255,0.04)",
  surface2: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.08)",
  border2: "rgba(255,255,255,0.15)",
  text: "#f0f0ff",
  text2: "#9090b0",
  text3: "#5a5a7a",
  accent: "#7c5cfc",
  accent2: "#a78bfa",
  accent3: "#c4b5fd",
  cyan: "#22d3ee",
  pink: "#f472b6",
  green: "#34d399",
  amber: "#fbbf24",
  red: "#f87171",
};

// ── API ──
export const API_CONFIG = {
  OPENROUTER_API:
    import.meta.env.VITE_OPENROUTER_API_URL ||
    "https://openrouter.ai/api/v1/chat/completions",
  OPENROUTER_MODEL:
    import.meta.env.VITE_OPENROUTER_MODEL ||
    "meta-llama/llama-3-8b-instruct",
  APP_NAME: import.meta.env.VITE_OPENROUTER_APP_NAME || "AlterEgo",
  APP_URL:
    import.meta.env.VITE_OPENROUTER_APP_URL || window.location.origin,
  API_KEY_STORAGE: "openrouter_api_key",
  API_TIMEOUT: 30000,
  MAX_TOKENS: 500,
  TEMPERATURE: 0.85,
};

// ── DEFAULT USER ──
export const DEFAULT_USER_PERSONA = {
  id: 1,
  name: "Dev Bro",
  tone: "Casual",
  style: "Short replies",
  emoji: "🧑‍💻",
  keywords: ["bro", "ngl", "fire", "based", "bruh"],
  trainingData: [
    "omg bro that code is fire ngl",
    "bro just use useEffect lol",
    "bruh this bug is based",
  ],
  createdAt: new Date().toISOString(),
};
