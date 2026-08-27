import React from "react";
import { motion } from "framer-motion";

/**
 * TYPING INDICATOR COMPONENT
 * Animated typing dots for "AI is thinking" state
 */
export const TypingIndicator = () => {
  const dotVariants = {
    initial: { y: 0, opacity: 0.5 },
    animate: {
      y: -8,
      opacity: 1,
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div className="flex items-center gap-2">
      {[0, 0.1, 0.2].map((delay) => (
        <motion.div
          key={delay}
          className="w-2 h-2 bg-accent rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay }}
        />
      ))}
    </div>
  );
};

export default TypingIndicator;
