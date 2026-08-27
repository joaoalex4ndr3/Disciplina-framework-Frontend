import React from "react";
import { motion } from "framer-motion";
import { Icon } from "../Common/Icon";
import Button from "../UI/Button";
import { Tag } from "../UI/Loader";

/**
 * PERSONACARD COMPONENT
 * Card displaying persona information
 */
export const PersonaCard = ({
  persona,
  onEdit,
  onDelete,
  onChat,
  showActions = true,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(124,92,252,0.15)" }}
      transition={{ duration: 0.2 }}
      className="
        group bg-surface border border-border rounded-xl overflow-hidden
        p-6 hover:border-accent/40 transition-colors
      "
    >
      {/* Header with emoji and actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{persona.emoji || "🤖"}</div>
        {showActions && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEdit}
              className="p-2 rounded-lg bg-surface2 hover:bg-accent/20 text-text2 hover:text-accent transition-colors"
              title="Edit persona"
            >
              <Icon.Edit className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="p-2 rounded-lg bg-surface2 hover:bg-red/20 text-text2 hover:text-red transition-colors"
              title="Delete persona"
            >
              <Icon.Trash className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Name and tags */}
      <h3 className="font-head font-semibold text-lg mb-2 truncate">
        {persona.name}
      </h3>
      <div className="flex gap-2 mb-4 flex-wrap">
        <Tag variant="default">{persona.tone}</Tag>
        <Tag variant="cyan">{persona.style}</Tag>
      </div>

      {/* Keywords preview */}
      {persona.keywords.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-text3 uppercase tracking-widest mb-2 font-semibold">
            Keywords
          </p>
          <div className="flex gap-1 flex-wrap">
            {persona.keywords.slice(0, 4).map((k, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded bg-surface2 text-text3"
              >
                {k}
              </span>
            ))}
            {persona.keywords.length > 4 && (
              <span className="text-xs px-2 py-1 text-text3">
                +{persona.keywords.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Chat button */}
      {onChat && (
        <Button
          variant="primary"
          size="md"
          onClick={onChat}
          className="w-full flex items-center justify-center gap-2"
        >
          <Icon.Chat className="w-4 h-4" />
          Chat with {persona.name}
        </Button>
      )}
    </motion.div>
  );
};

export default PersonaCard;
