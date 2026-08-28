import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Search, Plus, Filter, Grid, List, Clock, User, Calendar, X, Edit2, Trash2, Eye, ExternalLink } from 'lucide-react'
import './App.css'
import { convertMockGamesToAppFormat } from './data/mockData'
import { rawgService, type RawgGame } from './services/rawg'
// Platform icons
import pcIcon from './assets/platforms/free-desktop-pc.svg'
import windowsIcon from './assets/platforms/windows-logo-fill.svg'
import linuxIcon from './assets/platforms/Icons8_flat_linux.svg.png'
import macIcon from './assets/platforms/MacOS_logo.svg.png'
import xboxIcon from './assets/platforms/Xbox_one_logo.svg.png'
import psIcon from './assets/platforms/playstation.svg'
import switchIcon from './assets/platforms/nintendo-switch.svg'
import steamIcon from './assets/platforms/Steam_icon_logo.svg.png'
import androidIcon from './assets/platforms/Android_robot.svg.png'
import iosIcon from './assets/platforms/Apple_logo_black.svg'

// Types
interface Game {
  id: number
  title: string
  genre: string
  genres?: string[]
  platform: string
  platforms?: string[]
  developer: string
  publisher: string
  releaseDate: string
  rating: number
  description: string
  imageUrl: string
  status: 'Not Started' | 'Playing' | 'Completed' | 'On Hold' | 'Dropped'
  hoursPlayed: number
  personalRating: number
  notes: string
  websiteUrl?: string
  metacritic?: number
  ratingsCount?: number
}

type SortKey = 'title' | 'rating' | 'releaseDate' | 'hoursPlayed'

// Animation variants for smoother, coordinated listing transitions
const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Reduced from 0.05 for faster animation
      delayChildren: 0.02,   // Reduced from 0.05 for faster start
    },
  },
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, // Reduced from 16 for subtler effect
    scale: 0.98 
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 300, // Increased from 220 for snappier animation
      damping: 25,    // Increased from 24 for less bounce
      mass: 0.5      // Reduced from 0.6 for lighter feel
    },
  },
  exit: { 
    opacity: 0, 
    y: -8, // Reduced from -12 for subtler exit
    scale: 0.98, 
    transition: { duration: 0.15 } // Reduced from 0.18 for faster exit
  },
} satisfies Variants

// Platform icon component (uses local SVGs)
const PlatformIcon: React.FC<{ platform: string; size?: 'sm' | 'md' | 'lg' }> = ({ platform, size = 'md' }) => {
  const name = platform.toLowerCase()
  const className = `platform-icon ${size}`

  let src = pcIcon
  if (name.includes('windows')) src = windowsIcon
  else if (name.includes('linux')) src = linuxIcon
  else if (name.includes('mac') || name.includes('osx') || name.includes('macos')) src = macIcon
  else if (name.includes('steam')) src = steamIcon
  else if (name.includes('xbox')) src = xboxIcon
  else if (name.includes('playstation') || name.includes('ps')) src = psIcon
  else if (name.includes('nintendo') || name.includes('switch')) src = switchIcon
  else if (name.includes('android')) src = androidIcon
  else if (name.includes('ios') || name.includes('apple')) src = iosIcon
  else if (name.includes('pc')) src = pcIcon

  return <img className={className} src={src} alt={platform} title={platform} />
}

// Game Card Component
const GameCard: React.FC<{ 
  game: Game; 
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ game, onClick, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      variants={cardVariants}
      whileHover={{ 
        y: -4, // Reduced from -6 for subtler hover
        scale: 1.008, // Reduced from 1.01 for subtler scale
        transition: { duration: 0.15, ease: "easeOut" } // Faster, smoother transition
      }}
      whileTap={{ scale: 0.98 }} // Added tap feedback
      className="game-card"
      onClick={onClick}
    >
      <div className="game-card-image">
        <img src={game.imageUrl} alt={game.title} loading="lazy" decoding="async" />
        <div className="game-card-overlay">
          <button 
            className="icon-button edit"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            title="Edit game"
            aria-label="Edit game"
          >
            <Edit2 size={16} />
          </button>
          <button 
            className="icon-button delete"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            title="Delete game"
            aria-label="Delete game"
          >
            <Trash2 size={16} />
          </button>
          <button 
            className="icon-button view"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            title="View details"
            aria-label="View game details"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
      
      <div className="game-card-content">
        <h3 className="game-title">{game.title}</h3>
        <p className="game-description">
          {game.description && game.description.trim() ? 
            (game.description.length > 150 ? 
              game.description.substring(0, 150).trim() + '...' : 
              game.description
            ) : 
            'Experience this amazing ' + game.genre.toLowerCase() + ' game. Join millions of players in an unforgettable gaming adventure that will keep you engaged for hours.'
          }
        </p>
        
        <div className="game-meta">
          <div className="rating">
            <span className="rating-badge" title="Community rating">{game.rating.toFixed(1)}</span>
            {game.metacritic && game.metacritic > 0 && (
              <span className="metacritic">MC: {game.metacritic}</span>
            )}
          </div>
          <div className="genre">{(game.genres && game.genres.length > 0 ? game.genres : [game.genre]).join(', ')}</div>
        </div>
        
        <div className="developer-info">
          <div className="developer-name">
            <User size={14} />
            <strong>{game.developer}</strong>
          </div>
          {game.ratingsCount && game.ratingsCount > 0 && (
            <div className="ratings-count">
              {game.ratingsCount.toLocaleString()} ratings
            </div>
          )}
        </div>
        
        <div className="game-tags">
          <div className="genres">
            {(game.genres && game.genres.length > 0 ? game.genres : [game.genre]).map((g, i) => (
              <span key={i} className="genre-tag">{g}</span>
            ))}
          </div>
          {game.platforms && game.platforms.length > 0 && (
            <div className="platforms">
              {game.platforms.map((p, idx) => (
                <span key={idx} className="tag platform">
                  <PlatformIcon platform={p} size="sm" /> {p}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="game-footer">
          <div className="release-date">
            <Calendar size={14} />
            <span>{new Date(game.releaseDate).toLocaleDateString()}</span>
          </div>
          {game.websiteUrl && (
            <a 
              href={game.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="game-link"
              onClick={(e) => e.stopPropagation()}
              title="Visit game page"
            >
              {game.websiteUrl.includes('steam') ? (
                <>
                  <img src={steamIcon} alt="Steam" className="platform-icon md" />
                  Steam
                </>
              ) : (
                <>
                  <ExternalLink size={14} />
                  Website
                </>
              )}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Game Details Modal
const GameDetailsModal: React.FC<{ 
  game: Game | null; 
  isOpen: boolean; 
  onClose: () => void;
}> = ({ game, isOpen, onClose }) => {
  const [screens, setScreens] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      if (!game || !isOpen) return
      setLoading(true)
      try {
        const shots = await rawgService.getGameScreenshots(game.id)
        if (active) setScreens(shots)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [game, isOpen])

  if (!game) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close details" title="Close">
              <X size={24} />
            </button>
            <div className="modal-body">
              {/* Header */}
              <div className="modal-header">
                <img src={game.imageUrl} alt={game.title} />
                <div className="modal-header-info">
                  <h2>{game.title}</h2>
                  <div className="modal-rating"><span className="rating-badge large">{game.rating.toFixed(1)}</span></div>
                  <div className="game-tags">
                    {(game.genres && game.genres.length > 0 ? game.genres : [game.genre]).map((g, i) => (
                      <span key={i} className="tag large">{g}</span>
                    ))}
                    <span className="tag platform">{game.platform}</span>
                  </div>
                </div>
              </div>
              {/* Plain text already ensured; no <p> tags */}
              <div className="game-description-full">{game.description}</div>
              
              <div className="game-details-grid">
                <div className="detail-item">
                  <strong>Developer:</strong> {game.developer}
                </div>
                <div className="detail-item">
                  <strong>Publisher:</strong> {game.publisher}
                </div>
                <div className="detail-item">
                  <strong>Release Date:</strong> {new Date(game.releaseDate).toLocaleDateString()}
                </div>
                {game.metacritic && game.metacritic > 0 && (
                  <div className="detail-item">
                    <strong>Metacritic Score:</strong> 
                    <span className="metacritic-badge modal">
                      <span className="metacritic-score">{game.metacritic}</span>
                    </span>
                  </div>
                )}
                {game.ratingsCount && game.ratingsCount > 0 && (
                  <div className="detail-item">
                    <strong>Ratings Count:</strong> {game.ratingsCount.toLocaleString()}
                  </div>
                )}
                {game.websiteUrl && (
                  <div className="detail-item">
                    <strong>Visit Game:</strong>
                    <a 
                      href={game.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="game-link-modal"
                      title={`Visit ${game.title} on ${game.websiteUrl.includes('steam') ? 'Steam' : 'official website'}`}
                    >
                      <ExternalLink className="icon" size={16} />
                      {game.websiteUrl.includes('steam') ? 'Open on Steam' : 'Visit Official Website'}
                    </a>
                  </div>
                )}
              </div>
              
              {/* Screenshots */}
              <div className="screens-section">
                <strong>Screenshots</strong>
                {loading && <div className="loading">Loading screenshots…</div>}
                {!loading && screens.length === 0 && <div className="empty-state">No screenshots available</div>}
                {!loading && screens.length > 0 && (
                  <div className="screens-grid">
                    {screens.slice(0, 6).map((src, i) => (
                      <img key={i} src={src} alt={`${game.title} screenshot ${i+1}`} />
                    ))}
                  </div>
                )}
              </div>

              <div className="genres-section">
                <strong>Genres:</strong>
                <div className="tags-list">
                  {(game.genres && game.genres.length > 0 ? game.genres : [game.genre]).map((g, i) => (
                    <span key={i} className="tag large">{g}</span>
                  ))}
                </div>
              </div>
              
              <div className="platforms-section">
                <strong>Platforms:</strong>
                <div className="tags-list">
                  {(game.platforms && game.platforms.length > 0 ? game.platforms : [game.platform]).map((p, idx) => (
                    <span key={idx} className="tag platform">
                      <PlatformIcon platform={p} size="sm" /> {p}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="tags-section">
                <strong>Developer:</strong>
                <div className="tags-list">
                  <span className="tag small">{game.developer}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Game Form Modal
const GameFormModal: React.FC<{ 
  game: Game | null; 
  isOpen: boolean; 
  onClose: () => void;
  onSave: (game: Game) => void;
}> = ({ game, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Game>>({
    title: '',
    description: '',
    genre: '',
    platform: '',
    releaseDate: '',
    developer: '',
    publisher: '',
    rating: 0,
    imageUrl: '',
    status: 'Not Started',
    hoursPlayed: 0,
    personalRating: 0,
    notes: ''
  })

  useEffect(() => {
    if (game) {
      setFormData({
        ...game,
        // Show all genres as comma-separated in input
        genre: game.genres && game.genres.length > 0 ? game.genres.join(', ') : game.genre
      })
    } else {
      setFormData({
        title: '',
        description: '',
        genre: '',
        platform: '',
        releaseDate: '',
        developer: '',
        publisher: '',
        rating: 0,
        imageUrl: '',
        status: 'Not Started',
        hoursPlayed: 0,
        personalRating: 0,
        notes: '',
        websiteUrl: '',
        metacritic: 0,
        ratingsCount: 0
      })
    }
  }, [game, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Parse genres: allow comma-separated input
    const parsedGenres = (formData.genre || '')
      .split(',')
      .map(g => g.trim())
      .filter(g => g.length > 0)
    const primaryGenre = parsedGenres[0] || formData.genre || ''
    const gameData: Game = {
      id: game?.id || Date.now(),
      title: formData.title || '',
      description: formData.description || '',
      genre: primaryGenre,
      genres: parsedGenres,
      platform: formData.platform || '',
      releaseDate: formData.releaseDate || '',
      developer: formData.developer || '',
      publisher: formData.publisher || '',
      rating: formData.rating || 0,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop',
      status: formData.status || 'Not Started',
      hoursPlayed: formData.hoursPlayed || 0,
      personalRating: formData.personalRating || 0,
      notes: formData.notes || '',
      websiteUrl: formData.websiteUrl || '',
      metacritic: formData.metacritic || 0,
      ratingsCount: formData.ratingsCount || 0
    }
    onSave(gameData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="modal-content form-modal"
        onClick={(e) => e.stopPropagation()}
      >
  <button className="modal-close" onClick={onClose} aria-label="Close form" title="Close">
          <X size={24} />
        </button>
        
        <h2>{game ? 'Edit Game' : 'Add New Game'}</h2>
        
        <form onSubmit={handleSubmit} className="game-form">
          <div className="form-group">
            <label htmlFor="game-title">Title</label>
            <input
              id="game-title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter game title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="game-description">Description</label>
            <textarea
              id="game-description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter game description"
              rows={3}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="game-developer">Developer</label>
              <input
                id="game-developer"
                type="text"
                value={formData.developer}
                onChange={(e) => setFormData({...formData, developer: e.target.value})}
                placeholder="Developer name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="game-publisher">Publisher</label>
              <input
                id="game-publisher"
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData({...formData, publisher: e.target.value})}
                placeholder="Publisher name"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="game-genre">Genre</label>
              <input
                id="game-genre"
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({...formData, genre: e.target.value})}
                placeholder="e.g., RPG, Action, Adventure"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="game-platform">Platform</label>
              <input
                id="game-platform"
                type="text"
                value={formData.platform}
                onChange={(e) => setFormData({...formData, platform: e.target.value})}
                placeholder="e.g., PC, PlayStation 5"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="game-rating">Rating (0-10)</label>
              <input
                id="game-rating"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                placeholder="0-10"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="game-release-date">Release Date</label>
              <input
                id="game-release-date"
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="game-hours">Hours Played</label>
              <input
                id="game-hours"
                type="number"
                min="0"
                value={formData.hoursPlayed}
                onChange={(e) => setFormData({...formData, hoursPlayed: parseInt(e.target.value)})}
                placeholder="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="game-status">Status</label>
              <select
                id="game-status"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as Game['status']})}
                title="Select game status"
              >
                <option value="Not Started">Not Started</option>
                <option value="Playing">Playing</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
                <option value="Dropped">Dropped</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="game-image">Image URL</label>
            <input
              id="game-image"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="game-website">Website / Steam URL</label>
            <input
              id="game-website"
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
              placeholder="https://store.steampowered.com/app/12345 or official website"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="game-notes">Notes</label>
            <textarea
              id="game-notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Personal notes about the game"
              rows={3}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              {game ? 'Update Game' : 'Add Game'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Main App Component
function App() {
  const [games, setGames] = useState<Game[]>([])
  const [filteredGames, setFilteredGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<SortKey>('rating')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isSearchMode, setIsSearchMode] = useState(false)
  // Reduced to 20 since we're fetching detailed descriptions for some games
  const gamesPerPage = 20

  // Load games from RAWG service
  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log('🎮 Loading games from RAWG service...')
        
        const rawgGames = await rawgService.getPopularGames(gamesPerPage, currentPage)
        console.log('📦 Raw RAWG games received:', rawgGames.length, rawgGames)
        
        const appGames = rawgGames.map(rawgGame => rawgService.convertToAppGame(rawgGame))
        console.log('🎯 Converted app games:', appGames.length, appGames)
        
        if (appGames.length === 0) {
          console.warn('⚠️ No games were loaded, falling back to mock data')
          const fallbackGames = convertMockGamesToAppFormat()
          setGames(fallbackGames)
          setFilteredGames(fallbackGames)
          setTotalPages(1)
        } else {
          console.log('✅ Successfully loaded', appGames.length, 'games')
          setGames(appGames)
          setFilteredGames(appGames)
          // Set total pages more accurately when RAWG provides counts via service helper
          // Fallback remains a reasonable cap
          setTotalPages(Math.min(50, Math.ceil(1000 / gamesPerPage)))
        }
      } catch (err) {
        console.error('❌ Error loading games:', err)
        setError('Failed to load games. Using fallback data.')
        
        // Fallback to mock data
        const fallbackGames = convertMockGamesToAppFormat()
        console.log('📺 Using fallback mock games:', fallbackGames.length)
        setGames(fallbackGames)
        setFilteredGames(fallbackGames)
        setTotalPages(1)
      } finally {
        setLoading(false)
      }
    }

    loadGames()
  }, [currentPage, gamesPerPage])

  // Get unique values for filters
  // Multi-genre support: include all genres across games
  const allGenres = Array.from(new Set(games.flatMap(g => (g.genres && g.genres.length > 0 ? g.genres : [g.genre]))))
  const allStatuses = Array.from(new Set(games.map(game => game.status)))

  // Filter and sort games
  useEffect(() => {
    let filtered = games

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (game.genres && game.genres.length > 0
          ? game.genres.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
          : game.genre.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply genre filter
    if (selectedGenre) {
      filtered = filtered.filter(game =>
        (game.genres && game.genres.length > 0
          ? game.genres.includes(selectedGenre)
          : game.genre === selectedGenre)
      )
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(game => game.status === selectedStatus)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date

      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        case 'releaseDate':
          aValue = new Date(a.releaseDate)
          bValue = new Date(b.releaseDate)
          break
        case 'hoursPlayed':
          aValue = a.hoursPlayed
          bValue = b.hoursPlayed
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    setFilteredGames(filtered)
  }, [games, searchTerm, selectedGenre, selectedStatus, sortBy, sortOrder])

  const handleGameClick = (game: Game) => {
    setSelectedGame(game)
    setIsDetailsModalOpen(true)
  }

  const handleEditGame = (game: Game) => {
    setEditingGame(game)
    setIsFormModalOpen(true)
  }

  const handleDeleteGame = (gameId: number) => {
    if (confirm('Are you sure you want to delete this game?')) {
      setGames(games.filter(game => game.id !== gameId))
    }
  }

  const handleSaveGame = (gameData: Game) => {
    if (editingGame) {
      setGames(games.map(game => game.id === gameData.id ? gameData : game))
    } else {
      setGames([...games, gameData])
    }
    setEditingGame(null)
  }

  // Search RAWG for new games
  const handleSearchRAWG = async (query: string) => {
    if (!query.trim()) return

    try {
      setLoading(true)
      setIsSearchMode(true)
      setCurrentPage(1)
      console.log('🔍 Searching RAWG for:', query)
      
      const rawgGames = await rawgService.searchGames(query, gamesPerPage, 1)
      const searchResults = rawgGames.map(rawgGame => rawgService.convertToAppGame(rawgGame))
      
      setGames(searchResults)
      setFilteredGames(searchResults)
  // Keep a reasonable cap for search; RAWG supports next links if needed
  setTotalPages(Math.min(10, Math.ceil(100 / gamesPerPage)))
      
      console.log(`✅ Found ${searchResults.length} games from search`)
    } catch (err) {
      console.error('❌ Error searching RAWG:', err)
      setError('Failed to search for games')
    } finally {
      setLoading(false)
    }
  }

  // Load more search results or popular games for pagination
  const loadPage = async (page: number) => {
    try {
      setLoading(true)
      setCurrentPage(page)
      
      let rawgGames: RawgGame[]
      if (isSearchMode && searchTerm) {
        rawgGames = await rawgService.searchGames(searchTerm, gamesPerPage, page)
      } else {
        rawgGames = await rawgService.getPopularGames(gamesPerPage, page)
      }
      
      const appGames = rawgGames.map(rawgGame => rawgService.convertToAppGame(rawgGame))
      setGames(appGames)
      setFilteredGames(appGames)
    } catch (err) {
      console.error('❌ Error loading page:', err)
      setError('Failed to load page')
    } finally {
      setLoading(false)
    }
  }

  // Reset to popular games (exit search mode)
  const resetToPopular = () => {
    setIsSearchMode(false)
    setSearchTerm('')
    setCurrentPage(1)
    setError(null)
  }

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.length >= 3) {
      handleSearchRAWG(searchTerm)
    }
  }

  const handleAddNewGame = () => {
    setEditingGame(null)
    setIsFormModalOpen(true)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <h1>Chimix Game List</h1>
          </div>
          
          <div className="header-actions">
            <button className="btn primary" onClick={handleAddNewGame}>
              <Plus size={20} />
              Add Game
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="controls">
          <div className="search-section">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search games, developers, genres... (min 3 chars to search RAWG)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="search-button"
                  disabled={searchTerm.length < 3 || loading}
                  title="Search RAWG database"
                >
                  {loading ? '⏳' : '🔍'}
                </button>
              </div>
              {isSearchMode && (
                <button 
                  type="button" 
                  className="btn secondary reset-btn"
                  onClick={resetToPopular}
                >
                  Show Popular Games
                </button>
              )}
            </form>
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <Filter size={16} />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                aria-label="Filter by genre"
              >
                <option value="">All Genres</option>
                {allGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <Clock size={16} />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                aria-label="Filter by status"
              >
                <option value="">All Status</option>
                {allStatuses.map(status => (
                  <option key={status} value={status}>
                    {status.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className="sort-group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                aria-label="Sort by"
              >
                <option value="title">Sort by Title</option>
                <option value="rating">Sort by Rating</option>
                <option value="releaseDate">Sort by Release Date</option>
                <option value="hoursPlayed">Sort by Hours Played</option>
              </select>
              
              <button
                className={`sort-order ${sortOrder}`}
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                aria-label="Toggle sort order"
                title="Toggle sort order"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                title="Grid view"
              >
                <Grid size={16} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
                title="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="games-container">
          {loading && games.length === 0 ? (
            <div className="loading-state">
              <div className="loading-spinner">🎮</div>
              <h3>Loading games...</h3>
              <p>Fetching data from RAWG</p>
            </div>
          ) : (
            <>
              <motion.div
                className={`games-grid ${viewMode}`}
                variants={gridVariants}
                initial="hidden"
                animate="show"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredGames.map(game => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onClick={() => handleGameClick(game)}
                      onEdit={() => handleEditGame(game)}
                      onDelete={() => handleDeleteGame(game.id)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredGames.length === 0 && !loading && (
                <div className="empty-state">
                  <h3>No games found</h3>
                  <p>Try adjusting your search or filters, or search RAWG for new games</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              onClick={() => loadPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ← Previous
            </button>
            
            <div className="pagination-numbers">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, currentPage - 2) + i
                if (pageNum > totalPages) return null
                
                return (
                  <button
                    key={pageNum}
                    className={`pagination-number ${pageNum === currentPage ? 'active' : ''}`}
                    onClick={() => loadPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="pagination-ellipsis">...</span>
                  <button
                    className="pagination-number"
                    onClick={() => loadPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button 
              className="pagination-btn"
              onClick={() => loadPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        )}
      </main>

      <GameDetailsModal
        game={selectedGame}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <GameFormModal
        game={editingGame}
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveGame}
      />

      <footer className="app-footer">
        <div className="footer-content">
          <span>Data powered by RAWG.io</span>
          <span>© {new Date().getFullYear()} Chimix Game List</span>
        </div>
      </footer>
    </div>
  )
}

export default App
