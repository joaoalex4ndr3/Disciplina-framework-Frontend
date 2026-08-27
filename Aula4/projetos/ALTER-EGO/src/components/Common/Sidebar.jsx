import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import Button from "../UI/Button";

/**
 * SIDEBAR COMPONENT
 * Main navigation sidebar
 */
export const Sidebar = ({
  page,
  onPageChange,
  user,
  onLogout,
  personasCount = 0,
}) => {
  const navItems = [
    { id: "dashboard", icon: Icon.Dashboard, label: "Dashboard" },
    {
      id: "personas",
      icon: Icon.User,
      label: "My Personas",
      badge: personasCount,
    },
    { id: "chat", icon: Icon.Chat, label: "Chat" },
    { id: "pricing", icon: Icon.Crown, label: "Upgrade" },
    { id: "settings", icon: Icon.Settings, label: "Settings" },
  ];

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
      className="
        w-56 bg-bg2 border-r border-border
        flex flex-col p-4 relative z-10
        max-h-screen overflow-y-auto
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center flex-shrink-0">
          <Icon.Bot className="w-5 h-5 text-white" />
        </div>
        <span className="font-head font-bold text-lg tracking-tight">
          Alter<span className="text-accent">Ego</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1 mb-6">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            initial="initial"
            animate="animate"
            onClick={() => onPageChange(item.id)}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg text-sm
              transition-all duration-200 font-medium
              ${
                page === item.id
                  ? "bg-accent/15 border border-accent/40 text-accent3"
                  : "text-text2 hover:bg-surface2 hover:text-text"
              }
            `}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-accent text-white">
                {item.badge}
              </span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-border mb-4" />

      {/* Message limit (if free plan) */}
      {user?.plan === "free" && (
        <div className="mb-4 p-3 rounded-lg bg-accent/10 border border-accent/25">
          <div className="text-xs text-text2 mb-2 font-semibold">
            {user.msgCount}/{user.msgLimit} messages
          </div>
          <div className="h-1 bg-surface2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-cyan"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min((user.msgCount / user.msgLimit) * 100, 100)}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="flex items-center gap-3 p-2 rounded-lg">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-pink flex items-center justify-center font-bold text-sm flex-shrink-0">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{user?.name}</div>
          <div className="text-xs text-text3">
            {user?.plan === "pro" ? "⚡ Pro" : "Free plan"}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogout}
          className="p-2 text-text3 hover:text-red transition-colors"
          title="Logout"
        >
          <Icon.Logout className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
