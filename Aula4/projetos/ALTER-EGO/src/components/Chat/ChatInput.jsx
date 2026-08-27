import React from "react";
import { motion } from "framer-motion";
import { Icon } from "../Common/Icon";
import Button from "../UI/Button";

/**
 * CHATINPUT COMPONENT
 * Input area with send button and keyboard shortcuts
 */
export const ChatInput = ({
  value,
  onChange,
  onSend,
  onKeyDown,
  loading,
  remainingMessages,
  showLimit,
  placeholder = "Type a message...",
}) => {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="px-6 py-4 border-t border-border"
    >
      {showLimit && remainingMessages !== null && (
        <p className="text-xs text-text3 text-center mb-3">
          {remainingMessages} messages remaining today
        </p>
      )}

      <div className="flex items-end gap-3 bg-surface border border-border2 rounded-2xl p-3">
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          rows={1}
          className="
            flex-1 resize-none bg-transparent
            text-text placeholder-text3 outline-none
            font-body text-sm leading-relaxed
            max-h-32 overflow-y-auto
          "
          style={{
            minHeight: "40px",
            maxHeight: "120px",
          }}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
          }}
        />

        <motion.button
          onClick={onSend}
          disabled={loading || !value.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            flex-shrink-0 w-10 h-10 rounded-xl
            flex items-center justify-center transition-all
            ${
              value.trim() && !loading
                ? "bg-gradient-to-br from-accent to-purple-700 text-white hover:shadow-lg hover:shadow-accent/50"
                : "bg-surface2 text-text2 cursor-not-allowed"
            }
          `}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Icon.Send className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      <p className="text-xs text-text3 text-center mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </motion.div>
  );
};

export default ChatInput;
