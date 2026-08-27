import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "../components/Common/Icon";
import Button from "../components/UI/Button";
import { FEATURES } from "../utils/constants";
import BackgroundBlobs from "../components/Common/BackgroundBlobs";

/**
 * LANDING PAGE
 * Marketing/landing page for unauthenticated users
 */
export const Landing = ({ onAuth }) => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundBlobs />

      {/* Navigation */}
      <motion.nav className="relative z-10 flex items-center justify-between px-12 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center">
            <Icon.Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-head font-bold text-xl tracking-tight">
            Alter<span className="text-accent">Ego</span>
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="md"
            onClick={() => onAuth("login")}
            className="text-sm"
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => onAuth("signup")}
            className="text-sm"
          >
            Get Started
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-1 max-w-4xl mx-auto px-6 py-20 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent3 mb-8"
        >
          <Icon.Lightning className="w-4 h-4" />
          Powered by OpenRouter AI
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-head font-black text-5xl md:text-7xl leading-tight mb-6 tracking-tight"
        >
          Clone Your{" "}
          <span className="bg-gradient-to-r from-accent to-cyan bg-clip-text text-transparent">
            Personality
          </span>
          <br />
          into an AI
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-text2 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Create AI personas that think, talk, and respond exactly like you — or
          whoever you want to be.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center flex-wrap mb-16"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => onAuth("signup")}
            className="flex items-center gap-2"
          >
            <Icon.Plus className="w-5 h-5" />
            Create Your Clone
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => onAuth("login")}
            className="flex items-center gap-2"
          >
            <Icon.Chat className="w-5 h-5" />
            View Demo
          </Button>
        </motion.div>

        {/* Floating Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { name: "Dev Bro", tone: "Casual", emoji: "🧑‍💻", color: "accent" },
            {
              name: "Corporate Karen",
              tone: "Formal",
              emoji: "👩‍💼",
              color: "cyan",
            },
            { name: "Funny Sharma", tone: "Funny", emoji: "😂", color: "pink" },
            {
              name: "Deep Thinker",
              tone: "Philosophical",
              emoji: "🧠",
              color: "green",
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity }}
              className="p-4 rounded-xl bg-surface border border-border text-center"
            >
              <div className="text-3xl mb-2">{p.emoji}</div>
              <div className="font-head font-semibold text-sm mb-1">
                {p.name}
              </div>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-accent/10 border border-accent/30 text-accent3">
                {p.tone}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-1 max-w-5xl mx-auto px-6 py-20"
      >
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURES.map((f, i) => {
            const IconComponent = Icon[f.icon];
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl bg-surface border border-border hover:border-accent/40 transition-colors"
              >
                <motion.div
                  className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                  animate={{
                    background:
                      hoveredFeature === i
                        ? "linear-gradient(135deg, #7c5cfc, #22d3ee)"
                        : "rgba(255,255,255,0.07)",
                  }}
                >
                  <IconComponent
                    className="w-6 h-6"
                    style={{
                      color: hoveredFeature === i ? "white" : "#a78bfa",
                    }}
                  />
                </motion.div>
                <h3 className="font-head font-semibold text-lg mb-2">
                  {f.label}
                </h3>
                <p className="text-text2 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
