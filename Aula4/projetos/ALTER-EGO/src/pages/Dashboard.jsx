import React from "react";
import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import { Icon } from "../components/Common/Icon";
import PersonaCard from "../components/Persona/PersonaCard";

/**
 * DASHBOARD PAGE
 */
export const Dashboard = ({ user, personas, onPageChange }) => {
  const stats = [
    { label: "Personas Created", value: personas.length, color: "accent" },
    { label: "Messages Today", value: user.msgCount, color: "cyan" },
    {
      label: "Plan",
      value: user.plan === "pro" ? "Pro ⚡" : "Free",
      color: "green",
    },
    {
      label: "Limit",
      value: user.plan === "pro" ? "∞" : user.msgLimit,
      color: "amber",
    },
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="p-8 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="font-head font-black text-4xl mb-2">
          Welcome back, {user.name} 👋
        </h1>
        <p className="text-text2">Your AI personality hub</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-6 rounded-xl bg-surface border border-border"
          >
            <p className="text-xs text-text2 uppercase tracking-widest mb-2 font-semibold">
              {s.label}
            </p>
            <p
              className="font-head font-black text-3xl"
              style={{
                color:
                  s.color === "accent"
                    ? "#7c5cfc"
                    : s.color === "cyan"
                      ? "#22d3ee"
                      : s.color === "green"
                        ? "#34d399"
                        : "#fbbf24",
              }}
            >
              {s.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Personas Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-head font-bold text-2xl">Your Personas</h2>
          <Button
            variant="ghost"
            size="md"
            onClick={() => onPageChange("personas")}
            className="text-sm"
          >
            View all →
          </Button>
        </div>

        {personas.length === 0 ? (
          <div className="p-12 rounded-xl bg-surface border border-border text-center">
            <div className="text-6xl mb-4">🧬</div>
            <h3 className="font-head font-bold text-xl mb-2">
              No personas yet
            </h3>
            <p className="text-text2 mb-6">
              Create your first AI personality clone
            </p>
            <Button variant="primary" onClick={() => onPageChange("personas")}>
              Create Persona
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-4">
            {personas.slice(0, 4).map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <PersonaCard persona={p} showActions={false} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
        <Button
          variant="primary"
          onClick={() => onPageChange("personas")}
          className="flex items-center gap-2"
        >
          <Icon.Plus className="w-5 h-5" />
          New Persona
        </Button>
        <Button
          variant="ghost"
          onClick={() => onPageChange("chat")}
          className="flex items-center gap-2"
        >
          <Icon.Chat className="w-5 h-5" />
          Start Chatting
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
