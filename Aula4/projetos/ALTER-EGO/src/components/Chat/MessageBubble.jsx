import React from "react";
import { motion } from "framer-motion";

/**
 * MESSAGE BUBBLE COMPONENT
 * Displays individual chat messages with animations and typing effect
 */
export const MessageBubble = ({
  message,
  isUser,
  personaName,
  personaEmoji,
  userName,
  onCopy,
  isCopied,
}) => {
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const cursorVariants = {
    blink: {
      opacity: [1, 1, 0, 0],
      transition: {
        duration: 0.9,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`flex gap-3 mb-4 items-end ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-lg">
          {personaEmoji || "🤖"}
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`
            px-4 py-3 rounded-2xl max-w-xs lg:max-w-md
            ${
              isUser
                ? "bg-gradient-to-br from-accent to-purple-700 text-white rounded-br-none"
                : "bg-surface2 border border-border2 text-text rounded-bl-none"
            }
          `}
        >
          <p className="text-sm leading-relaxed break-words">
            {message.content}
            {message.isTyping && (
              <motion.span
                variants={cursorVariants}
                animate="blink"
                className="inline-block ml-1 w-1.5 h-4 bg-current"
              />
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-1 text-xs text-text3">
          <span>{formatTime(message.timestamp)}</span>
          {!isUser && !message.isTyping && (
            <button
              onClick={() => onCopy(message.content)}
              className={`transition-colors ${
                isCopied ? "text-green" : "text-text3 hover:text-text"
              }`}
              title="Copy message"
            >
              {isCopied ? "✓" : "📋"}
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink to-amber flex items-center justify-center font-bold text-sm">
          {userName?.[0]?.toUpperCase() || "U"}
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
