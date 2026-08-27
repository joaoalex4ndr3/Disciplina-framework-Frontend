import React from "react";

/**
 * TAG COMPONENT
 * Reusable tag/badge
 */
export const Tag = ({
  children,
  variant = "default",
  onRemove = null,
  className = "",
}) => {
  const variantClasses = {
    default: "bg-accent/15 border-accent/30 text-accent3",
    cyan: "bg-cyan/10 border-cyan/20 text-cyan",
    success: "bg-green/10 border-green/20 text-green",
  };

  return (
    <div
      className={`
        inline-flex items-center gap-2
        px-3 py-1 rounded-full text-sm
        border border-accent/30
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 text-text2 hover:text-text transition-colors"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Tag;
