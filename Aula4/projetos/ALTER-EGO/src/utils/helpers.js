// ── ICON MAPPING ──
export const IconMap = {
  User: "User",
  Bot: "Bot",
  Chat: "Chat",
  Plus: "Plus",
  Edit: "Edit",
  Trash: "Trash",
  Send: "Send",
  Crown: "Crown",
  Star: "Star",
  Lightning: "Lightning",
  X: "X",
  ChevronRight: "ChevronRight",
  Dashboard: "Dashboard",
  Settings: "Settings",
  Logout: "Logout",
  Check: "Check",
  Brain: "Brain",
  Zap: "Zap",
  Globe: "Globe",
  Key: "Key",
  Mic: "Mic",
  Copy: "Copy",
  Download: "Download",
};

// ── FORMATTING ──
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// ── PERSONA SYSTEM PROMPT ──
export const generatePersonaPrompt = (persona) => {
  return `You are an AI clone mimicking this personality exactly:
Name: ${persona.name}
Tone: ${persona.tone}
Reply style: ${persona.style}
Characteristic keywords/phrases to use naturally: ${persona.keywords.join(", ") || "none specified"}
${
  persona.trainingData.length > 0
    ? `\nSample messages this person sends:\n${persona.trainingData.map((m) => `- "${m}"`).join("\n")}`
    : ""
}

IMPORTANT: Respond ONLY in character. Never break character. Match their tone, vocabulary, energy and style precisely. Keep replies ${
    persona.style === "Short replies"
      ? "short (1-3 sentences)"
      : persona.style === "Detailed"
        ? "detailed and thorough"
        : "natural"
  }. Use their keywords naturally in conversation.`;
};

// ── VALIDATION ──
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

// ── STORAGE ──
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Failed to get from storage: ${key}`, error);
    return defaultValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save to storage: ${key}`, error);
  }
};

// ── TEXT PROCESSING ──
export const truncateText = (text, length = 100) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export const getInitials = (name) => {
  return name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "U";
};

// ── ARRAYS ──
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
};
