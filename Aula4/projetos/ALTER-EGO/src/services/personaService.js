/**
 * PERSONASERVICE
 * Handles persona CRUD operations
 */
export const personaService = {
  /**
   * Validate persona data
   */
  validate: (persona) => {
    const errors = [];

    if (!persona.name?.trim()) {
      errors.push("Persona name is required");
    }

    if (!persona.tone) {
      errors.push("Tone is required");
    }

    if (!persona.style) {
      errors.push("Style is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  /**
   * Create new persona
   */
  create: (data) => {
    const validation = personaService.validate(data);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    return {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };
  },

  /**
   * Update existing persona
   */
  update: (persona, updates) => {
    const validation = personaService.validate({ ...persona, ...updates });
    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "));
    }

    return {
      ...persona,
      ...updates,
    };
  },

  /**
   * Export persona to JSON
   */
  exportToJSON: (persona) => {
    const json = JSON.stringify(persona, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `persona-${persona.name}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  /**
   * Export chat to text file
   */
  exportChatToText: (messages, personaName) => {
    const text = messages
      .map((m) => `[${m.role === "user" ? "You" : personaName}] ${m.content}`)
      .join("\n\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-${personaName}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  },
};

export default personaService;
