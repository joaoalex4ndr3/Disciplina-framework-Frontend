import type { RawgGame } from '../services/rawg';

// Mock data representing real RAWG API responses for demonstration
export const mockRawgGames: RawgGame[] = [
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
  }
];

// Convert RAWG games to app format for compatibility
export const convertMockGamesToAppFormat = () => {
  return mockRawgGames.map(game => ({
    id: game.id,
    title: game.name,
    genre: game.genres?.[0]?.name || 'Unknown',
  genres: (game.genres || []).map(g => g.name),
    platform: game.platforms?.[0]?.platform?.name || 'PC',
    developer: game.developers?.[0]?.name || 'Unknown Developer',
    publisher: game.publishers?.[0]?.name || 'Unknown Publisher',
    releaseDate: game.released || '',
    rating: game.rating ? Math.round(game.rating * 10) / 10 : 0,
    description: game.description_raw || 'No description available',
    imageUrl: game.background_image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop',
    status: 'Not Started' as const,
    hoursPlayed: game.playtime || 0,
    personalRating: 0,
    notes: '',
    websiteUrl: game.stores?.[0]?.url || game.website || '',
    metacritic: game.metacritic || 0,
    ratingsCount: game.ratings_count || 0
  }));
};
