// RAWG API Configuration
export const RAWG_BASE_URL = 'https://api.rawg.io/api';

// RAWG API key from environment variables with fallback
export const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY || '';

// Check if API key is available
export const hasApiKey = () => {
  return RAWG_API_KEY && RAWG_API_KEY !== '' && RAWG_API_KEY !== 'demo_key';
};

// Image URL helper for RAWG (images come directly from API responses)
export const getRawgImageUrl = (imageUrl: string) => {
  return imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop';
};

// RAWG image size variants
export const RAWG_IMAGE_SIZES = {
  thumb: '150x150',
  small: '420x237',
  medium: '640x360',
  large: '1280x720'
} as const;

export type RawgImageSize = keyof typeof RAWG_IMAGE_SIZES;
