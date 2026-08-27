import { useState, useCallback } from "react";
import personaService from "../services/personaService";
import useAppStore from "../store/useAppStore";

/**
 * USEPERSONA HOOK
 * Handles persona CRUD operations and validation
 */
export const usePersona = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPersona, setEditingPersona] = useState(null);

  // Store operations
  const personas = useAppStore((state) => state.personas);
  const addPersona = useAppStore((state) => state.addPersona);
  const updatePersona = useAppStore((state) => state.updatePersona);
  const deletePersona = useAppStore((state) => state.deletePersona);
  const getPersona = useAppStore((state) => state.getPersona);

  // Create or update persona
  const savePersona = useCallback(
    async (personaData) => {
      setLoading(true);
      setError(null);

      try {
        if (editingPersona) {
          // Update existing
          const updated = personaService.update(editingPersona, personaData);
          updatePersona(editingPersona.id, updated);
        } else {
          // Create new
          const newPersona = personaService.create(personaData);
          addPersona(newPersona);
        }

        setShowModal(false);
        setEditingPersona(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [editingPersona, addPersona, updatePersona],
  );

  // Delete persona
  const removePersona = useCallback(
    (id) => {
      deletePersona(id);
    },
    [deletePersona],
  );

  // Open edit modal
  const openEdit = useCallback((persona) => {
    setEditingPersona(persona);
    setShowModal(true);
  }, []);

  // Open create modal
  const openCreate = useCallback(() => {
    setEditingPersona(null);
    setShowModal(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setShowModal(false);
    setEditingPersona(null);
    setError(null);
  }, []);

  // Export persona
  const exportPersona = useCallback(
    (personaId) => {
      const persona = getPersona(personaId);
      if (persona) {
        personaService.exportToJSON(persona);
      }
    },
    [getPersona],
  );

  return {
    personas,
    loading,
    error,
    showModal,
    editingPersona,
    savePersona,
    removePersona,
    openEdit,
    openCreate,
    closeModal,
    exportPersona,
  };
};

export default usePersona;
