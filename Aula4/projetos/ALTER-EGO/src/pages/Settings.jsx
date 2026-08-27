import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";
import { Icon } from "../components/Common/Icon";
import useAppStore from "../store/useAppStore";

/**
 * SETTINGSPAGE COMPONENT
 */
export const SettingsPage = () => {
  const user = useAppStore((state) => state.user);
  const updateUser = useAppStore((state) => state.updateUser);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

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
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="p-8 max-w-2xl space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="font-head font-black text-4xl">Settings</h1>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-xl bg-surface border border-border space-y-6"
      >
        <h2 className="font-head font-bold text-xl">Profile</h2>

        <InputField
          label="Display Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <InputField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: saved ? 1 : 0,
            height: saved ? "auto" : 0,
          }}
          className="flex items-center gap-2 text-green text-sm"
        >
          <Icon.Check className="w-5 h-5" />
          <span>Changes saved successfully!</span>
        </motion.div>

        <Button
          variant="primary"
          onClick={handleSave}
          className="flex items-center gap-2"
        >
          {saved ? (
            <>
              <Icon.Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </motion.div>

      {/* Subscription Section */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-xl bg-surface border border-border"
      >
        <h2 className="font-head font-bold text-xl mb-4">Subscription</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold mb-1">
              {user?.plan === "pro" ? "Pro Plan ⚡" : "Free Plan"}
            </p>
            <p className="text-text2 text-sm">
              {user?.plan === "pro"
                ? "Unlimited messages and personas"
                : `${user?.msgCount}/${user?.msgLimit} messages used today`}
            </p>
          </div>
          {user?.plan === "free" && (
            <Button variant="primary" size="md">
              Upgrade
            </Button>
          )}
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-xl bg-surface/50 border border-border/50 text-sm text-text2 space-y-3"
      >
        <h3 className="font-head font-semibold text-text">About AlterEgo</h3>
        <p>
          AlterEgo is an AI-powered platform that lets you create personality
          clones that think, talk, and respond like you.
        </p>
        <p>
          Built with <span className="text-accent font-semibold">React</span>,{" "}
          <span className="text-accent font-semibold">Framer Motion</span>, and{" "}
          <span className="text-accent font-semibold">OpenRouter AI</span>.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;
