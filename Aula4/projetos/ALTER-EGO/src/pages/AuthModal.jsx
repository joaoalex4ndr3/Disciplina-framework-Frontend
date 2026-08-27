import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "../components/UI/Modal";
import Button from "../components/UI/Button";
import InputField from "../components/UI/InputField";
import { Icon } from "../components/Common/Icon";

/**
 * AUTHMODAL COMPONENT
 * Login/Signup modal
 */
export const AuthModal = ({ mode, onClose, onSuccess }) => {
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = async () => {
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 1200));

    if (!form.email || !form.password) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    if (tab === "signup" && !form.name) {
      setError("Name is required.");
      setLoading(false);
      return;
    }

    onSuccess({
      name: form.name || form.email.split("@")[0],
      email: form.email,
      plan: "free",
      msgCount: 0,
      msgLimit: 20,
    });

    setLoading(false);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      maxWidth="max-w-sm"
      showCloseButton={false}
    >
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center mx-auto mb-4">
          <Icon.Bot className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-head font-bold text-2xl mb-2">
          {tab === "login" ? "Welcome back" : "Create account"}
        </h2>
        <p className="text-text2 text-sm">
          {tab === "login"
            ? "Sign in to your AlterEgo"
            : "Start building your personality clones"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-surface rounded-lg p-1">
        {["login", "signup"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setError("");
            }}
            className={`
              flex-1 py-2 rounded-md text-sm font-medium transition-all
              ${
                tab === t
                  ? "bg-surface2 border border-border2 text-text"
                  : "text-text2 hover:text-text"
              }
            `}
          >
            {t === "login" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handle();
        }}
        className="space-y-4 mb-6"
      >
        {tab === "signup" && (
          <InputField
            label="Full name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}
        <InputField
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-red text-sm">{error}</p>}

        <Button
          variant="primary"
          size="lg"
          type="submit"
          loading={loading}
          className="w-full"
        >
          {tab === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-text3 text-xs">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </Modal>
  );
};

export default AuthModal;
