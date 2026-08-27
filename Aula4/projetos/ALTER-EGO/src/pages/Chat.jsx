import React from "react";
import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import ChatWindow from "../components/Chat/ChatWindow";
import ChatInput from "../components/Chat/ChatInput";
import PersonaSelector from "../components/Chat/PersonaSelector";
import Modal from "../components/UI/Modal";
import InputField from "../components/UI/InputField";
import { Icon } from "../components/Common/Icon";
import useChat from "../hooks/useChat";
import useAppStore from "../store/useAppStore";

/**
 * CHATPAGE COMPONENT
 */
export const ChatPage = ({ personas, activePersonaId }) => {
  const [selectedPersonaId, setSelectedPersonaId] = React.useState(
    activePersonaId || null,
  );
  const [showApiKeyModal, setShowApiKeyModal] = React.useState(false);
  const [apiKeyInput, setApiKeyInput] = React.useState("");

  const selectedPersona = useAppStore((state) =>
    state.getPersona(selectedPersonaId),
  );
  const user = useAppStore((state) => state.user);
  const setApiKey = useAppStore((state) => state.setApiKey);
  const apiKey = useAppStore((state) => state.apiKey);

  const {
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
    copied,
  } = useChat(selectedPersonaId);

  const handlePersonaSelect = (persona) => {
    setSelectedPersonaId(persona.id);
  };

  React.useEffect(() => {
    const savedKey = localStorage.getItem("openrouter_api_key");
    if (savedKey && !apiKey) {
      setApiKey(savedKey);
    }
  }, [apiKey, setApiKey]);

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem("openrouter_api_key", apiKeyInput);
      setApiKey(apiKeyInput);
      setShowApiKeyModal(false);
      setApiKeyInput("");
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex h-full overflow-hidden"
    >
      {/* Persona Selector */}
      <PersonaSelector
        personas={personas}
        selectedId={selectedPersonaId}
        onSelect={handlePersonaSelect}
        onApiKeyClick={() => setShowApiKeyModal(true)}
      />

      {/* Chat Area */}
      {!selectedPersona ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 bg-bg">
          <div className="text-7xl">💬</div>
          <h3 className="font-head font-bold text-2xl">Select a Persona</h3>
          <p className="text-text2">
            Choose a personality clone from the left to start chatting
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <motion.div
            className="flex items-center justify-between px-6 py-4 border-b border-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="text-4xl">{selectedPersona.emoji}</div>
              <div>
                <h3 className="font-head font-bold text-lg">
                  {selectedPersona.name}
                </h3>
                <p className="text-xs text-text3">
                  {selectedPersona.tone} · {selectedPersona.style}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="md"
                onClick={clearChat}
                className="text-sm"
              >
                Clear
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={exportChat}
                className="text-sm flex items-center gap-2"
              >
                <Icon.Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </motion.div>

          {/* Messages */}
          <ChatWindow
            messages={messages}
            loading={loading}
            persona={selectedPersona}
            user={user}
            messagesEndRef={messagesEndRef}
            onCopyCopied={copyMessage}
            copied={copied}
          />

          {/* Input */}
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSend={sendMessage}
            onKeyDown={handleKeyDown}
            loading={loading}
            remainingMessages={
              user.plan === "free" ? user.msgLimit - user.msgCount : null
            }
            showLimit={user.plan === "free"}
            placeholder={`Message ${selectedPersona.name}...`}
          />
        </div>
      )}

      {/* API Key Modal */}
      <Modal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        title="OpenRouter API Key"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
            <Icon.Key className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-text">
                Get a free API key from{" "}
                <a
                  href="https://openrouter.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline font-semibold"
                >
                  openrouter.ai
                </a>
              </p>
              <p className="text-xs text-text2 mt-1">
                Your key is stored locally and never sent to our servers.
              </p>
            </div>
          </div>

          <InputField
            label="API Key"
            type="password"
            placeholder="sk-or-v1-..."
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
          />

          <Button
            variant="primary"
            size="lg"
            onClick={handleSaveApiKey}
            className="w-full"
          >
            Save API Key
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
};

export default ChatPage;
