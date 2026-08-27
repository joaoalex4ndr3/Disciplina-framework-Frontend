import { API_CONFIG } from "../utils/constants";
import { generatePersonaPrompt } from "../utils/helpers";

/**
 * CHATSERVICE
 * Handles all chat API calls
 */
export const chatService = {
  /**
   * Send message to OpenRouter API
   * @param {array} messages - Message history
   * @param {object} persona - Selected persona
   * @param {string} apiKey - OpenRouter API key
   * @returns {Promise<string>} - Response text
   */
  sendMessage: async (messages, persona, apiKey) => {
    console.log(
      "[chatService] sendMessage called. apiKey present:",
      Boolean(apiKey),
    );

    if (!persona) {
      throw new Error("No persona selected.");
    }

    if (!apiKey) {
      throw new Error(
        "API key required. Please set openrouter_api_key in localStorage.",
      );
    }

    try {
      const response = await fetch(API_CONFIG.OPENROUTER_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": API_CONFIG.APP_URL,
          "X-Title": API_CONFIG.APP_NAME,
        },
        body: JSON.stringify({
          model: API_CONFIG.OPENROUTER_MODEL,
          messages: [
            {
              role: "system",
              content: generatePersonaPrompt(persona),
            },
            ...messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          max_tokens: API_CONFIG.MAX_TOKENS,
          temperature: API_CONFIG.TEMPERATURE,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let message =
          data.error?.message ||
          data.message ||
          `API Error (${response.status}): Unknown error`;

        if (response.status === 401) {
          message =
            "OpenRouter auth failed (401). Check your API key (openrouter_api_key).";
        }

        if (
          typeof message === "string" &&
          message.toLowerCase().includes("user not found")
        ) {
          message =
            "OpenRouter account/key problem. 'User not found' indicates invalid key or expired access.";
        }

        console.error("[chatService] API not ok", {
          status: response.status,
          data,
          message,
        });
        throw new Error(message);
      }

      if (data.error) {
        let message = data.error.message || "API returned an error";

        if (message.toLowerCase().includes("user not found")) {
          message =
            "OpenRouter account/key problem. 'User not found' indicates invalid key or expired access.";
        }

        console.error("[chatService] API returned error object", data.error);
        throw new Error(message);
      }

      const reply = data.choices?.[0]?.message?.content;
      if (!reply) {
        console.error("[chatService] No reply received", data);
        throw new Error("No response from API");
      }

      console.log("[chatService] API response success", { reply });
      return reply;
    } catch (error) {
      console.error("[chatService] Chat API Error:", error);
      throw error;
    }
  },

  /**
   * Validate API key
   */
  validateApiKey: async (apiKey) => {
    if (!apiKey) {
      console.error(
        "[chatService] validateApiKey failed due to missing API key",
      );
      return false;
    }

    try {
      const response = await fetch(API_CONFIG.OPENROUTER_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": API_CONFIG.APP_URL,
          "X-Title": API_CONFIG.APP_NAME,
        },
        body: JSON.stringify({
          model: API_CONFIG.OPENROUTER_MODEL,
          messages: [{ role: "user", content: "test" }],
          max_tokens: 10,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("[chatService] validateApiKey response not ok", {
          status: response.status,
          data,
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error("[chatService] validateApiKey error", error);
      return false;
    }
  },
};

export default chatService;
