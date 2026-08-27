import React from "react";
import { motion } from "framer-motion";
import { Icon } from "../Common/Icon";
import Button from "../UI/Button";

/**
 * PERSONASELECTOR COMPONENT
 * Sidebar for selecting which persona to chat with
 */
export const PersonaSelector = ({
  personas,
  selectedId,
  onSelect,
  onApiKeyClick,
}) => {
  const containerVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="w-56 bg-bg2 border-r border-border flex flex-col p-3 max-h-screen"
    >
      <h3 className="text-xs text-text3 uppercase tracking-widest px-2 mb-3 font-semibold">
        Select Persona
      </h3>

      <div className="flex-1 overflow-y-auto space-y-1 mb-4">
        {personas.length === 0 ? (
          <p className="text-sm text-text3 px-2 py-2">
            No personas yet. Create one first!
          </p>
        ) : (
          <div className="space-y-1">
            {personas.map((p) => (
              <motion.button
                key={p.id}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                onClick={() => onSelect(p)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg
                  text-left text-sm transition-all
                  ${
                    selectedId === p.id
                      ? "bg-accent/20 border border-accent/40 text-accent3"
                      : "hover:bg-surface2 text-text2 hover:text-text"
                  }
                `}
              >
                <span className="text-xl flex-shrink-0">{p.emoji || "🤖"}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-xs text-text3 truncate">{p.tone}</div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onApiKeyClick}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium
          bg-surface border border-border2 hover:border-accent
          rounded-lg transition-colors text-text2 hover:text-text w-full justify-center"
      >
        <Icon.Key className="w-4 h-4" />
        API Key
      </button>
    </motion.div>
  );
};

export default PersonaSelector;
