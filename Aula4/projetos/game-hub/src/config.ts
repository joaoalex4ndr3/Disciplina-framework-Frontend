// API Configuration
// NOTE: In a frontend-only application, this API key will be visible in the bundled JavaScript
// and network requests. This is acceptable for RAWG API's free tier, which is designed for
// client-side use and protected by rate limiting.

export const config = {
  rawgApiKey: import.meta.env.VITE_RAWG_API_KEY,
  rawgApiBaseUrl: 'https://api.rawg.io/api'
};
