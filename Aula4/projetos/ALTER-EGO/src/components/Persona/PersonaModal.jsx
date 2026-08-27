import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import InputField from "../UI/InputField";
import { Tag } from "../UI/Loader";
import { Icon } from "../Common/Icon";
import { TONE_OPTIONS, STYLE_OPTIONS, EMOJIS } from "../../utils/constants";

/**
 * PERSONAMODAL COMPONENT
 * Form for creating/editing personas
 */
export const PersonaModal = ({
  isOpen,
  onClose,
  persona,
  onSave,
  loading = false,
}) => {
  const [form, setForm] = useState(
    persona || {
      name: "",
      tone: "Casual",
      style: "Short replies",
      keywords: [],
      keywordInput: "",
      trainingData: [],
      trainingInput: "",
      emoji: "🤖",
    },
  );

  const [error, setError] = useState("");

  const addKeyword = () => {
    if (!form.keywordInput.trim()) return;
    setForm({
      ...form,
      keywords: [...form.keywords, form.keywordInput.trim()],
      keywordInput: "",
    });
  };

  const removeKeyword = (index) => {
    setForm({
      ...form,
      keywords: form.keywords.filter((_, i) => i !== index),
    });
  };

  const addTraining = () => {
    if (!form.trainingInput.trim()) return;
    setForm({
      ...form,
      trainingData: [...form.trainingData, form.trainingInput.trim()],
      trainingInput: "",
    });
  };

  const removeTraining = (index) => {
    setForm({
      ...form,
      trainingData: form.trainingData.filter((_, i) => i !== index),
    });
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      setError("Persona name is required");
      return;
    }
    onSave(form);
    setError("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={persona ? "Edit Persona" : "Create Persona"}
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        {/* Emoji Picker */}
        <div>
          <label className="text-sm text-text2 block mb-3 font-semibold">
            Avatar
          </label>
          <div className="grid grid-cols-6 gap-2">
            {EMOJIS.map((e) => (
              <motion.button
                key={e}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setForm({ ...form, emoji: e })}
                className={`
                  w-12 h-12 rounded-lg text-2xl flex items-center justify-center
                  transition-all
                  ${
                    form.emoji === e
                      ? "bg-accent/20 border-2 border-accent"
                      : "bg-surface hover:bg-surface2 border border-border"
                  }
                `}
              >
                {e}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Name */}
        <InputField
          label="Persona Name"
          placeholder="e.g. Dev Bro, Corporate Karen..."
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={error && !form.name ? error : ""}
        />

        {/* Tone */}
        <div>
          <label className="text-sm text-text2 block mb-3 font-semibold">
            Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {TONE_OPTIONS.map((t) => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setForm({ ...form, tone: t })}
                className={`
                  px-4 py-2 rounded-full text-sm transition-all
                  ${
                    form.tone === t
                      ? "bg-accent/20 border border-accent text-accent3"
                      : "bg-surface border border-border text-text2 hover:bg-surface2"
                  }
                `}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Style */}
        <div>
          <label className="text-sm text-text2 block mb-3 font-semibold">
            Reply Style
          </label>
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((s) => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setForm({ ...form, style: s })}
                className={`
                  px-4 py-2 rounded-full text-sm transition-all
                  ${
                    form.style === s
                      ? "bg-cyan/20 border border-cyan text-cyan"
                      : "bg-surface border border-border text-text2 hover:bg-surface2"
                  }
                `}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label className="text-sm text-text2 block mb-3 font-semibold">
            Keywords
            <span className="text-text3 font-normal">
              {" "}
              (catch-phrases, words they use often)
            </span>
          </label>
          <div className="flex gap-2 mb-3">
            <input
              className="flex-1 px-3 py-2 bg-surface border border-border text-text rounded-lg
                focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
              placeholder="e.g. bro, bruh, literally..."
              value={form.keywordInput}
              onChange={(e) =>
                setForm({ ...form, keywordInput: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && addKeyword()}
            />
            <Button
              variant="ghost"
              size="md"
              onClick={addKeyword}
              className="text-sm"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.keywords.map((k, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent3 text-sm"
              >
                {k}
                <button
                  onClick={() => removeKeyword(i)}
                  className="text-xs hover:opacity-70"
                >
                  ×
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Training Data */}
        <div>
          <label className="text-sm text-text2 block mb-3 font-semibold">
            Training Messages
            <span className="text-text3 font-normal">
              {" "}
              (sample things they say)
            </span>
          </label>
          <div className="flex gap-2 mb-3">
            <input
              className="flex-1 px-3 py-2 bg-surface border border-border text-text rounded-lg
                focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
              placeholder='e.g. "omg bro that code is fire ngl"'
              value={form.trainingInput}
              onChange={(e) =>
                setForm({ ...form, trainingInput: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && addTraining()}
            />
            <Button
              variant="ghost"
              size="md"
              onClick={addTraining}
              className="text-sm"
            >
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {form.trainingData.map((t, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className="flex items-center justify-between px-3 py-2 bg-surface2 border border-border rounded-lg"
              >
                <span className="text-sm text-text2 italic">"{t}"</span>
                <button
                  onClick={() => removeTraining(i)}
                  className="text-text3 hover:text-red transition-colors"
                >
                  <Icon.X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          loading={loading}
          className="w-full"
        >
          {persona ? "Save Changes" : "Create Persona"}
        </Button>
      </div>
    </Modal>
  );
};

export default PersonaModal;
