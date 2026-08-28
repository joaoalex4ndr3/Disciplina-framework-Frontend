# Game Hub

A modern video game discovery web application built with React and TypeScript. Browse, filter, and explore games from the RAWG Video Games Database with a sleek, responsive interface.

**Live Demo:** [https://glenjarvis-game-hub.vercel.app/](https://glenjarvis-game-hub.vercel.app/)

## Features

- **Game Discovery**: Browse thousands of games with rich metadata including ratings, platforms, and critic scores
- **Advanced Filtering**: Filter games by genre and platform
- **Smart Sorting**: Sort by relevance, date added, name, release date, popularity, and average rating
- **Search Functionality**: Real-time search to quickly find specific games
- **Responsive Design**: Fully responsive layout that adapts to mobile, tablet, and desktop screens
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Performance Optimized**: Image optimization and skeleton loading states for smooth user experience

## Tech Stack

- **React 18** - UI library with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Chakra UI** - Component library for consistent, accessible design
- **Axios** - HTTP client for API requests
- **RAWG API** - Game data source

## Project Structure

```
src/
├── components/       # Reusable React components
├── hooks/           # Custom React hooks for data fetching
├── services/        # API client and utilities
├── data/            # Static data and configurations
└── theme.ts         # Chakra UI theme customization
```

## Key Implementation Details

- **Custom Hooks**: Implemented reusable hooks (`useGames`, `useGenres`, `usePlatforms`) for data fetching with loading and error states
- **State Management**: Centralized query state using compound state object pattern
- **Responsive Grid Layout**: CSS Grid with Chakra UI for adaptive layouts
- **Image Optimization**: Custom service for serving optimized image sizes
- **Type Safety**: Full TypeScript coverage for components, hooks, and API responses

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/glenjarvis/game-hub.git
cd game-hub
```

2. Install dependencies
```bash
npm install
```

3. Set up your API key

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your RAWG API key:
   ```
   VITE_RAWG_API_KEY=your_api_key_here
   ```

   Get your free API key from [RAWG API](https://rawg.io/apidocs)

   **Important Note**: This is a frontend-only application. The API key will be embedded in the bundled JavaScript during build and visible in browser network requests. This is acceptable for RAWG's free tier API, which is designed for client-side use and protected by rate limiting. There is no way to hide API keys in pure frontend applications without a backend proxy.

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Deployment

This project is deployed on Vercel. Any push to the main branch automatically triggers a new deployment.

## Future Enhancements

This is an active project with ongoing development. Planned features include:

- Game detail pages with additional information
- User authentication and favorites
- Advanced filters (release date, ESRB rating)
- Infinite scroll pagination
- Game comparison feature

## Learning & Development

This project was built by following the React course from [Code with Mosh](https://codewithmosh.com/) to strengthen my React and TypeScript skills. The implementation demonstrates modern best practices for component architecture, state management, and TypeScript integration. It serves as a foundation that I continue to build upon and extend with additional features.

## Acknowledgments

- Course material from [Code with Mosh](https://codewithmosh.com/)
- Game data provided by [RAWG](https://rawg.io/)
- Deployed on [Vercel](https://vercel.com/)

## License

See the [LICENSE](LICENSE) file for details. This project includes attribution to the original course material from Code with Mosh.
