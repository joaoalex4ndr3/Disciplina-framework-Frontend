import { useState, useCallback, useRef, useEffect } from "react";
import chatService from "../services/chatService";
import useAppStore from "../store/useAppStore";
import { simulateTyping } from "../utils/typeText";

/**
 * USECHAT HOOK
 * Handles all chat logic and state with typing animation
 */
export const useChat = (personaId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [copied, setCopied] = useState(null);
  const messagesEndRef = useRef(null);
  const typingCancelRef = useRef(null);

  // Store selectors
  const messages = useAppStore((state) => state.getMessages(personaId));
  const addMessage = useAppStore((state) => state.addMessage);
  const setMessages = useAppStore((state) => state.setMessages);
  const pagination = useAppStore((state) => state.pagination);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.updateUser);
  const getPersona = useAppStore((state) => state.getPersona);
  const apiKey = useAppStore((state) => state.apiKey);

  // Auto scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Cleanup typing effect on unmount or personaId change
  useEffect(() => {
    return () => {
      if (typingCancelRef.current) {
        typingCancelRef.current();
        typingCancelRef.current = null;
      }
    };
  }, [personaId]);

  /**
   * Update specific message in conversation (uses fresh store state)
   */
  const updateMessage = useCallback(
    (messageIndex, updates) => {
      const currentMessages = useAppStore.getState().messages[personaId] || [];
      const updated = currentMessages.map((msg, idx) =>
        idx === messageIndex ? { ...msg, ...updates } : msg,
      );
      setMessages(personaId, updated);
    },
    [personaId, setMessages],
  );

  /**
   * Start typing animation for a message
   */
  const startTypingAnimation = useCallback(
    (messageIndex, fullText) => {
      // Cancel any existing typing animation
      if (typingCancelRef.current) {
        typingCancelRef.current();
      }

      // Start new typing animation
      typingCancelRef.current = simulateTyping(
        fullText,
        (partialText) => {
          updateMessage(messageIndex, { content: partialText });
        },
        {
          speed: 30, // 30ms between characters for natural feel
          onComplete: () => {
            // Mark message as done typing
            updateMessage(messageIndex, { isTyping: false });
            typingCancelRef.current = null;
          },
        },
      );
    },
    [updateMessage],
  );

  // Send message to chat service
  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading || !personaId) return;

    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    const persona = getPersona(personaId);
    if (!persona) return;

    // Check message limit
    const remaining = user.msgLimit - user.msgCount;
    if (user.plan === "free" && remaining <= 0) {
      addMessage(personaId, {
        role: "assistant",
        content:
          "🔒 You've hit your daily limit. Upgrade to Pro for unlimited chats!",
        timestamp: new Date(),
        isTyping: false,
      });
      return;
    }

    // Add user message
    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
      isTyping: false,
    };

    const conversation = [...messages, userMessage];
    setMessages(personaId, conversation);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const currentApiKey =
        localStorage.getItem("openrouter_api_key") || apiKey || "";

      console.log(
        "[useChat] sendMessage apiKey present:",
        Boolean(currentApiKey),
      );

      if (!currentApiKey) {
        setError("API key is missing. Please set your OpenRouter API key.");
        setShowApiKeyModal(true);
        setLoading(false);
        return;
      }

      const reply = await chatService.sendMessage(
        conversation,
        persona,
        currentApiKey,
      );

      // Add response message with typing animation
      const aiMessage = {
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isTyping: true,
      };

      const updatedConversation = [...conversation, aiMessage];
      setMessages(personaId, updatedConversation);

      // Get the index of the new message (last one)
      const messageIndex = updatedConversation.length - 1;

      // Start typing animation
      startTypingAnimation(messageIndex, reply);

      // Update user message count
      if (user.plan === "free") {
        setUser({ msgCount: user.msgCount + 1 });
      }
    } catch (err) {
      setError(err.message);

      const errorMessage = {
        role: "assistant",
        content: `⚠️ ${err.message || "Something went wrong. Check your API key."}`,
        timestamp: new Date(),
        isTyping: false,
      };

      addMessage(personaId, errorMessage);
    } finally {
      setLoading(false);
    }
  }, [
    input,
    loading,
    personaId,
    apiKey,
    messages,
    user,
    getPersona,
    addMessage,
    setMessages,
    setUser,
    startTypingAnimation,
  ]);

  // Clear chat
  const clearChat = useCallback(() => {
    if (typingCancelRef.current) {
      typingCancelRef.current();
      typingCancelRef.current = null;
    }
    setMessages(personaId, []);
  }, [personaId, setMessages]);

  // Copy message
  const copyMessage = useCallback(
    (index) => {
      const message = messages[index];
      if (message?.content) {
        navigator.clipboard?.writeText(message.content);
        setCopied(index);
        setTimeout(() => setCopied(null), 2000);
      }
    },
    [messages],
  );

  // Export chat
  const exportChat = useCallback(() => {
    const persona = getPersona(personaId);
    if (!persona || messages.length === 0) return;

    const text = messages
      .map((m) => `[${m.role === "user" ? "You" : persona.name}] ${m.content}`)
      .join("\n\n");

    const a = document.createElement("a");
    a.href = "data:text/plain," + encodeURIComponent(text);
    a.download = `chat-${persona.name}-${Date.now()}.txt`;
    a.click();
  }, [personaId, messages, getPersona]);

  // Handle keypresses
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  return {
    messages,
    loading,
    error,
    input,
    setInput,
    sendMessage,
    clearChat,
    copyMessage,
    exportChat,
    handleKeyDown,
    messagesEndRef,
    showApiKeyModal,
    setShowApiKeyModal,
    copied,
  };
};

export default useChat;
