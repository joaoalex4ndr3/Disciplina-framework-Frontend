import React from "react";
import { motion } from "framer-motion";
import Button from "../components/UI/Button";
import { Icon } from "../components/Common/Icon";
import PersonaCard from "../components/Persona/PersonaCard";
import PersonaModal from "../components/Persona/PersonaModal";
import usePersona from "../hooks/usePersona";

/**
 * PERSONAS PAGE
 */
export const PersonasPage = ({ onChat }) => {
  const {
    personas,
    showModal,
    editingPersona,
    openEdit,
    openCreate,
    closeModal,
    removePersona,
    savePersona,
    loading,
  } = usePersona();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
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
      className="p-8 space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-head font-black text-4xl mb-2">My Personas</h1>
          <p className="text-text2">
            Train and manage your AI personality clones
          </p>
        </div>
        <Button
          variant="primary"
          onClick={openCreate}
          className="flex items-center gap-2"
        >
          <Icon.Plus className="w-5 h-5" />
          New Persona
        </Button>
      </motion.div>

      {/* Personas Grid */}
      {personas.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="p-20 rounded-xl bg-surface border border-border text-center"
        >
          <div className="text-8xl mb-6">🧬</div>
          <h2 className="font-head font-bold text-3xl mb-4">No Personas Yet</h2>
          <p className="text-text2 text-lg mb-8 max-w-md mx-auto">
            Create your first AI personality clone. Train it with your tone,
            style, keywords and sample messages.
          </p>
          <Button variant="primary" onClick={openCreate} size="lg">
            Create Your First Persona
          </Button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {personas.map((p, i) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              transition={{ delay: i * 0.05 }}
            >
              <PersonaCard
                persona={p}
                onEdit={() => openEdit(p)}
                onDelete={() => removePersona(p.id)}
                onChat={() => onChat(p)}
                showActions={true}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal */}
      <PersonaModal
        isOpen={showModal}
        onClose={closeModal}
        persona={editingPersona}
        onSave={savePersona}
        loading={loading}
      />
    </motion.div>
  );
};

export default PersonasPage;
