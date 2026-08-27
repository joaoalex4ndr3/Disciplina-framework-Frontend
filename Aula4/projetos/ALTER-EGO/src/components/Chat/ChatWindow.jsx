import React, { useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { TypingIndicator } from "../UI/TypingIndicator";
import { motion } from "framer-motion";

/**
 * CHATWINDOW COMPONENT
 * Displays message history with auto-scroll
 */
export const ChatWindow = ({
  messages,
  loading,
  persona,
  user,
  messagesEndRef,
  onCopyCopied,
  copied,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
    >
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
          <div className="text-6xl">{persona?.emoji || "🤖"}</div>
          <h3 className="font-head font-semibold text-xl text-text">
            Chat with {persona?.name}
          </h3>
          <p className="text-text2 max-w-xs">
            This persona responds in a{" "}
            <span className="font-bold lowercase">{persona?.tone}</span> tone
            with <span className="font-bold lowercase">{persona?.style}</span>.
          </p>
          {persona?.keywords.length > 0 && (
            <div className="flex gap-2 flex-wrap justify-center mt-4">
              {persona.keywords.map((k, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm bg-accent/10 border border-accent/30 text-accent3"
                >
                  {k}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              message={msg}
              isUser={msg.role === "user"}
              personaName={persona?.name}
              personaEmoji={persona?.emoji}
              userName={user?.name}
              onCopy={() => onCopyCopied(i)}
              isCopied={copied === i}
            />
          ))}

          {loading && (
            <div className="flex gap-3 items-end">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-lg">
                {persona?.emoji || "🤖"}
              </div>
              <div className="bg-surface2 border border-border2 px-4 py-3 rounded-2xl">
                <TypingIndicator />
              </div>
            </div>
          )}
        </>
      )}

      <div ref={messagesEndRef} />
    </motion.div>
  );
};

export default ChatWindow;
