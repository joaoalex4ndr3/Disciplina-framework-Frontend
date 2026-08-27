/**
 * TYPETEXT UTILITY
 * Simulates typing effect for text display
 */

/**
 * Simulate character-by-character typing effect
 * @param {string} text - Full text to type
 * @param {function} setContent - State setter for message content
 * @param {object} options - Configuration options
 * @param {number} options.speed - Delay in ms between characters (default: 30)
 * @param {function} options.onComplete - Callback when typing finishes
 * @returns {function} - Cancel function to stop typing
 */
export const simulateTyping = (text, setContent, options = {}) => {
  const { speed = 30, onComplete = null } = options;

  let currentIndex = 0;
  let timerIds = [];

  const typeNextCharacter = () => {
    if (currentIndex < text.length) {
      currentIndex++;
      const partial = text.substring(0, currentIndex);
      setContent(partial);

      // Schedule next character
      const timerId = setTimeout(typeNextCharacter, speed);
      timerIds.push(timerId);
    } else {
      // Typing complete
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Start typing
  typeNextCharacter();

  // Return cancel function for cleanup
  return () => {
    timerIds.forEach((id) => clearTimeout(id));
    timerIds = [];
  };
};

/**
 * Simulate word-by-word typing effect
 * @param {string} text - Full text to type
 * @param {function} setContent - State setter for message content
 * @param {object} options - Configuration options
 * @param {number} options.speed - Delay in ms between words (default: 50)
 * @param {function} options.onComplete - Callback when typing finishes
 * @returns {function} - Cancel function to stop typing
 */
export const simulateTypingWords = (text, setContent, options = {}) => {
  const { speed = 50, onComplete = null } = options;

  const words = text.split(" ");
  let currentIndex = 0;
  let timerIds = [];

  const typeNextWord = () => {
    if (currentIndex < words.length) {
      currentIndex++;
      const partial = words.slice(0, currentIndex).join(" ");
      setContent(partial);

      // Schedule next word
      const timerId = setTimeout(typeNextWord, speed);
      timerIds.push(timerId);
    } else {
      // Typing complete
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Start typing
  typeNextWord();

  // Return cancel function for cleanup
  return () => {
    timerIds.forEach((id) => clearTimeout(id));
    timerIds = [];
  };
};

/**
 * Format streaming text and handle breaking mid-word
 * Useful for real streaming APIs that send partial chunks
 * @param {string} chunk - New text chunk from API
 * @param {string} buffer - Existing buffered content
 * @returns {object} - { displayText, newBuffer }
 */
export const processStreamChunk = (chunk, buffer = "") => {
  const combined = buffer + chunk;
  const lastSpaceIndex = combined.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    // No complete word yet, keep buffering
    return {
      displayText: "",
      newBuffer: combined,
    };
  }

  // Extract complete words
  const displayText = combined.substring(0, lastSpaceIndex + 1);
  const newBuffer = combined.substring(lastSpaceIndex + 1);

  return {
    displayText,
    newBuffer,
  };
};
