import { RAWG_BASE_URL, RAWG_API_KEY, getRawgImageUrl, hasApiKey } from '../constants/api';

// Types for RAWG API responses
export interface RawgGame {
  id: number;
  name: string;
  description?: string;
  description_raw?: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  metacritic?: number;
  released?: string;
  background_image?: string;
  background_image_additional?: string;
  genres?: Array<{
    id: number;
    name: string;
  }>;
  platforms?: Array<{
    platform: {
      id: number;
      name: string;
    };
  }>;
  developers?: Array<{
    id: number;
    name: string;
  }>;
  publishers?: Array<{
    id: number;
    name: string;
  }>;
  screenshots?: Array<{
    id: number;
    image: string;
  }>;
  playtime?: number;
  esrb_rating?: {
    id: number;
    name: string;
  };
  website?: string;
  reddit_url?: string;
  stores?: Array<{
    id: number;
    store: {
      id: number;
      name: string;
      domain: string;
    };
    url: string;
  }>;
}

export interface RawgApiResponse {
  count: number;
  next?: string;
  previous?: string;
  results: RawgGame[];
}

export interface RawgScreenshotsResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Array<{ id: number; image: string; width?: number; height?: number }>;
}

class RawgService {
  private isDemoMode: boolean;

  constructor() {
    this.isDemoMode = !hasApiKey();
    console.log('🎮 RAWG Service initialized', { 
      isDemoMode: this.isDemoMode, 
      hasApiKey: hasApiKey(),
      apiKey: RAWG_API_KEY ? `${RAWG_API_KEY.substring(0, 8)}...` : 'None'
    });
    
    // If we have a valid API key, test it briefly
    if (!this.isDemoMode) {
      console.log('✅ RAWG API key detected, will attempt to fetch live data');
    } else {
      console.log('📺 No API key found, running in demo mode with mock data');
    }
  }

  // Utility: strip HTML tags to get plain text description
  private stripHtml(input?: string): string {
    if (!input) return '';
    return input.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  }

  // Make request to RAWG API
  private async makeRequest(endpoint: string, params: Record<string, string | number> = {}): Promise<RawgApiResponse> {
    const urlParams = new URLSearchParams({
      key: RAWG_API_KEY,
      ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
    });

    const url = `${RAWG_BASE_URL}/${endpoint}?${urlParams}`;
    
    try {
      console.log(`🌐 Making RAWG API request to ${endpoint}...`);
      
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`❌ RAWG API error: ${response.status} ${response.statusText}`);
        throw new Error(`RAWG API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ Successfully fetched ${data.results?.length || 0} items from RAWG`);
      
      if (!data.results) {
        console.warn('⚠️ No results array in response:', data);
        return { count: 0, results: [] };
      }
      
      return data;
    } catch (error) {
      console.error('❌ Error making RAWG request:', error);
      throw error;
    }
  }

  // Search for games with enhanced details
  async searchGames(query: string, limit: number = 20, page: number = 1): Promise<RawgGame[]> {
    if (this.isDemoMode) {
      console.log('📺 Demo mode: Searching mock data for:', query);
      // Return filtered mock data for demo mode
      const mockGames = this.getMockGames();
      const filtered = mockGames.filter(game => 
        game.name.toLowerCase().includes(query.toLowerCase()) ||
        (game.description_raw && game.description_raw.toLowerCase().includes(query.toLowerCase()))
      );
      return filtered.slice(0, limit);
    }

    try {
      console.log(`🔍 Searching RAWG for: "${query}" (page ${page}, limit ${limit})`);
      
      const response = await this.makeRequest('games', {
        search: query,
        page_size: Math.min(limit, 20),
        page: page,
        ordering: '-rating'
      });
      
      console.log(`✅ Search found ${response.results.length} games`);
      
      // For search results, try to get descriptions for the first 5 games
      const detailedGames = await Promise.all(
        response.results.slice(0, 5).map(async (game, index) => {
          try {
            if (index > 0) await new Promise(resolve => setTimeout(resolve, 150));
            const details = await this.getGameDetails(game.id);
            return details || game;
          } catch (error) {
            console.warn(`Failed to fetch details for game ${game.id}:`, error);
            return game;
          }
        })
      );
      
      const remainingGames = response.results.slice(5);
      return [...detailedGames, ...remainingGames];
    } catch (error) {
      console.error('❌ Error searching games:', error);
      console.log('📺 Falling back to mock data search...');
      // Fallback to mock data search
      const mockGames = this.getMockGames();
      const filtered = mockGames.filter(game => 
        game.name.toLowerCase().includes(query.toLowerCase()) ||
        (game.description_raw && game.description_raw.toLowerCase().includes(query.toLowerCase()))
      );
      return filtered.slice(0, limit);
    }
  }

  // Get popular games with enhanced details
  async getPopularGames(limit: number = 20, page: number = 1): Promise<RawgGame[]> {
    if (this.isDemoMode) {
      console.log('📺 Demo mode: Using mock popular games');
      return this.getMockGames().slice(0, limit);
    }

    try {
      console.log(`🎮 Fetching popular games page ${page} with limit ${limit}`);
      
      // First get the basic game list
      const response = await this.makeRequest('games', {
        page_size: Math.min(limit, 20), // RAWG has a max of 40 per page, but we'll use 20 for better performance
        page: page,
        ordering: '-rating,-metacritic',
        metacritic: '70,100'
      });
      
      console.log(`✅ Successfully fetched ${response.results.length} games from RAWG API`);
      
      // For the first 10 games, fetch detailed descriptions
      const detailedGames = await Promise.all(
        response.results.slice(0, 10).map(async (game, index) => {
          try {
            // Add a small delay between requests to avoid rate limiting
            if (index > 0) await new Promise(resolve => setTimeout(resolve, 100));
            const details = await this.getGameDetails(game.id);
            return details || game;
          } catch (error) {
            console.warn(`Failed to fetch details for game ${game.id}:`, error);
            return game;
          }
        })
      );
      
      // For remaining games, use basic data
      const remainingGames = response.results.slice(10);
      
      return [...detailedGames, ...remainingGames];
    } catch (error) {
      console.error('❌ Error getting popular games, using fallback:', error);
      console.log('📺 Falling back to mock data...');
      return this.getMockGames().slice(0, limit);
    }
  }

  // Get recent games
  async getRecentGames(limit: number = 20, page: number = 1): Promise<RawgGame[]> {
    if (this.isDemoMode) {
      console.log('📺 Demo mode: Using mock recent games');
      return this.getMockGames().slice(0, limit);
    }

    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 3));
    
    try {
      const response = await this.makeRequest('games', {
        page_size: limit,
        page: page,
        ordering: '-released',
        dates: `${threeMonthsAgo.toISOString().split('T')[0]},${new Date().toISOString().split('T')[0]}`
      });
      return response.results;
    } catch (error) {
      console.error('❌ Error getting recent games:', error);
      return this.getMockGames().slice(0, limit);
    }
  }

  // Get game details
  async getGameDetails(gameId: number): Promise<RawgGame | null> {
    if (this.isDemoMode) {
      console.log('📺 Demo mode: Getting mock game details for ID:', gameId);
      return this.getMockGames().find(game => game.id === gameId) || null;
    }

    try {
      const response = await fetch(`${RAWG_BASE_URL}/games/${gameId}?key=${RAWG_API_KEY}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch game details: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('❌ Error getting game details:', error);
      return this.getMockGames().find(game => game.id === gameId) || null;
    }
  }

  // Get game screenshots
  async getGameScreenshots(gameId: number): Promise<string[]> {
    if (this.isDemoMode) {
      const game = this.getMockGames().find(g => g.id === gameId);
      return game?.background_image ? [game.background_image] : [];
    }

    try {
      const response = await fetch(`${RAWG_BASE_URL}/games/${gameId}/screenshots?key=${RAWG_API_KEY}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch screenshots: ${response.status}`);
      }
      const data: RawgScreenshotsResponse = await response.json();
      return (data.results || []).map(s => s.image).filter(Boolean);
    } catch (error) {
      console.error('❌ Error getting screenshots:', error);
      return [];
    }
  }

  // Convert RAWG game to our app's game format
  convertToAppGame(rawgGame: RawgGame) {
    const developer = rawgGame.developers?.[0]?.name || 'Unknown Developer';
    const publisher = rawgGame.publishers?.[0]?.name || 'Unknown Publisher';
    
    // Find Steam store URL
    const steamStore = rawgGame.stores?.find(store => 
      store.store.name.toLowerCase().includes('steam')
    );
    
    // Get website URL (prefer Steam, then official website)
    const websiteUrl = steamStore?.url || rawgGame.website || '';
    
    // Use plain text description: prefer RAWG raw, otherwise strip HTML
    let description = rawgGame.description_raw || this.stripHtml(rawgGame.description) || '';
    
    // If no description available, create a basic one from available data
    if (!description && rawgGame.genres && rawgGame.genres.length > 0) {
      const genreText = rawgGame.genres.map(g => g.name).join(', ');
      description = `An exciting ${genreText.toLowerCase()} game that offers an immersive gaming experience. Released ${rawgGame.released ? `in ${new Date(rawgGame.released).getFullYear()}` : ''}, this title has captured the attention of gamers worldwide.`;
    }
    
    // Debug: Log what description data we're getting
    if (rawgGame.id <= 5000) { // Only log for first few games to avoid spam
      console.log(`Game ${rawgGame.name}:`, {
        description: rawgGame.description,
        description_raw: rawgGame.description_raw,
        finalDescription: description
      });
    }
    
    // Gather all platforms as names (for chips) and keep first as primary for filters
    const platforms = (rawgGame.platforms || []).map(p => p.platform?.name).filter(Boolean) as string[];
    const primaryPlatform = platforms[0] || rawgGame.platforms?.[0]?.platform?.name || 'PC';
    
    return {
      id: rawgGame.id,
      title: rawgGame.name,
  genre: rawgGame.genres?.[0]?.name || 'Unknown',
  genres: (rawgGame.genres || []).map(g => g.name).filter(Boolean) as string[],
      platform: primaryPlatform,
      platforms,
      developer,
      publisher,
      releaseDate: rawgGame.released || '',
      rating: rawgGame.rating ? Math.round(rawgGame.rating * 10) / 10 : 0,
      description: description,
      imageUrl: getRawgImageUrl(rawgGame.background_image || ''),
      status: 'Not Started' as const,
      hoursPlayed: rawgGame.playtime || 0,
      personalRating: 0,
      notes: '',
      websiteUrl,
      metacritic: rawgGame.metacritic || 0,
      ratingsCount: rawgGame.ratings_count || 0
    };
  }

  // Mock games for demo mode (using real RAWG game data structure)
  private getMockGames(): RawgGame[] {
    return [
      {
        id: 3498,
        name: "Grand Theft Auto V",
        description_raw: "Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world to explore along with the new story.",
        rating: 4.47,
        rating_top: 5,
        ratings_count: 6585,
        metacritic: 92,
        released: "2013-09-17",
        background_image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
        genres: [{ id: 4, name: "Action" }],
        platforms: [{ platform: { id: 4, name: "PC" } }],
        developers: [{ id: 3524, name: "Rockstar North" }],
        publishers: [{ id: 2155, name: "Rockstar Games" }],
        playtime: 74,
        stores: [{ id: 1, store: { id: 1, name: "Steam", domain: "store.steampowered.com" }, url: "https://store.steampowered.com/app/271590/" }],
        website: "https://www.rockstargames.com/gta-v"
      },
      {
        id: 4200,
        name: "Portal 2",
        description_raw: "The sequel to the acclaimed Portal (2007), Portal 2 pits the protagonist of the original game, Chell, and her AI companion, GLaDOS, against more puzzles.",
        rating: 4.61,
        rating_top: 5,
        ratings_count: 4463,
        metacritic: 95,
        released: "2011-04-19",
        background_image: "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
        genres: [{ id: 2, name: "Shooter" }],
        platforms: [{ platform: { id: 4, name: "PC" } }],
        developers: [{ id: 1699, name: "Valve Corporation" }],
        publishers: [{ id: 1699, name: "Valve Corporation" }],
        playtime: 11,
        stores: [{ id: 1, store: { id: 1, name: "Steam", domain: "store.steampowered.com" }, url: "https://store.steampowered.com/app/620/" }],
        website: "https://www.valvesoftware.com/games/"
      },
      {
        id: 3328,
        name: "The Witcher 3: Wild Hunt",
        description_raw: "The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale.",
        rating: 4.66,
        rating_top: 5,
        ratings_count: 6126,
        metacritic: 93,
        released: "2015-05-18",
        background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
        genres: [{ id: 5, name: "RPG" }],
        platforms: [{ platform: { id: 4, name: "PC" } }],
        developers: [{ id: 9023, name: "CD PROJEKT RED" }],
        publishers: [{ id: 9023, name: "CD PROJEKT RED" }],
        playtime: 46,
        stores: [{ id: 1, store: { id: 1, name: "Steam", domain: "store.steampowered.com" }, url: "https://store.steampowered.com/app/292030/" }],
        website: "https://www.thewitcher.com/witcher3"
      },
      {
        id: 5286,
        name: "Tomb Raider",
        description_raw: "A reboot of the Tomb Raider franchise, featuring a young Lara Croft on her first adventure.",
        rating: 4.05,
        rating_top: 4,
        ratings_count: 4832,
        metacritic: 86,
        released: "2013-03-05",
        background_image: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
        genres: [{ id: 4, name: "Action" }],
        platforms: [{ platform: { id: 4, name: "PC" } }],
        developers: [{ id: 5775, name: "Crystal Dynamics" }],
        publishers: [{ id: 9685, name: "Square Enix" }],
        playtime: 10
      },
      {
        id: 4291,
        name: "Counter-Strike: Global Offensive",
        description_raw: "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago.",
        rating: 3.57,
        rating_top: 4,
        ratings_count: 6963,
        metacritic: 83,
        released: "2012-08-21",
        background_image: "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg",
        genres: [{ id: 2, name: "Shooter" }],
        platforms: [{ platform: { id: 4, name: "PC" } }],
        developers: [{ id: 1699, name: "Valve Corporation" }],
        publishers: [{ id: 1699, name: "Valve Corporation" }],
        playtime: 64
      },
      {
        id: 13536,
        name: "Portal",
        description_raw: "Portal is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon.",
        rating: 4.51,
        rating_top: 5,
        ratings_count: 3514,
        metacritic: 90,
        released: "2007-10-09",
        background_image: "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg",
        genres: [{ id: 2, name: "Shooter" }],
        platforms: [{ platform: { id: 4, name: "PC" } }],
        developers: [{ id: 1699, name: "Valve Corporation" }],
        publishers: [{ id: 1699, name: "Valve Corporation" }],
        playtime: 4
      }
    ];
  }
}

// Create and export a singleton instance
export const rawgService = new RawgService();
