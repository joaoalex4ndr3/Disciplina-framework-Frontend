import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * GLOBAL APP STORE
 * Manages: user, personas, chat messages, auth state
 */
export const useAppStore = create(
  persist(
    (set, get) => ({
      // ── USER STATE ──
      user: null,

      setUser: (user) => set({ user }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      logout: () => set({ user: null, personas: [], messages: {} }),

      // ── PERSONAS STATE ──
      personas: [
        {
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
        },
      ],

      addPersona: (persona) =>
        set((state) => ({
          personas: [
            ...state.personas,
            { ...persona, id: Date.now(), createdAt: new Date().toISOString() },
          ],
        })),

      updatePersona: (id, updates) =>
        set((state) => ({
          personas: state.personas.map((p) =>
            p.id === id ? { ...p, ...updates } : p,
          ),
        })),

      deletePersona: (id) =>
        set((state) => ({
          personas: state.personas.filter((p) => p.id !== id),
        })),

      getPersona: (id) => get().personas.find((p) => p.id === id),

      // ── MESSAGES STATE ──
      messages: {},

      getMessages: (personaId) => get().messages[personaId] || [],

      setMessages: (personaId, messages) =>
        set((state) => ({
          messages: { ...state.messages, [personaId]: messages },
        })),

      addMessage: (personaId, message) =>
        set((state) => ({
          messages: {
            ...state.messages,
            [personaId]: [...(state.messages[personaId] || []), message],
          },
        })),

      clearMessages: (personaId) =>
        set((state) => ({
          messages: { ...state.messages, [personaId]: [] },
        })),

      // ── API KEY STATE ──
      apiKey: localStorage.getItem("openrouter_api_key") || "",

      setApiKey: (key) => {
        try {
          localStorage.setItem("openrouter_api_key", key || "");
        } catch (error) {
          console.error("Failed to save API key to localStorage", error);
        }
        set({ apiKey: key });
      },

      // ── UI STATE ──
      currentPage: "dashboard",

      setCurrentPage: (page) => set({ currentPage: page }),

      selectedPersonaId: null,

      setSelectedPersonaId: (id) => set({ selectedPersonaId: id }),
    }),
    {
      name: "alterego-store",
      partialize: (state) => ({
        user: state.user,
        personas: state.personas,
        messages: state.messages,
        apiKey: state.apiKey,
      }),
    },
  ),
);

export default useAppStore;
