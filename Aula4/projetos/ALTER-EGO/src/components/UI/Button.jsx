import React from "react";
import { motion } from "framer-motion";

/**
 * BUTTON COMPONENT
 * Reusable button with variants
 */
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  className = "",
  style = {},
  ...props
}) => {
  const baseClass =
    "font-body font-medium rounded-full border-0 cursor-pointer transition-all duration-200";

  const variantClasses = {
    primary:
      "bg-gradient-to-br from-accent to-purple-700 text-white hover:shadow-lg hover:shadow-accent/50 hover:translate-y-[-2px] disabled:opacity-50",
    ghost:
      "bg-surface border border-border2 text-text hover:bg-surface2 hover:border-accent hover:text-accent3 dark:hover:text-accent3",
    secondary:
      "bg-surface2 border border-border text-text hover:bg-surface hover:border-border2",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    icon: "p-2 w-10 h-10 flex items-center justify-center",
  };

  const combinedClass =
    `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  return (
    <motion.button
      className={combinedClass}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
