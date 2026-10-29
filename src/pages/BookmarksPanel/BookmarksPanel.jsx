import { useState } from 'react'
import { Link } from 'react-router-dom'
import ResourceCard from '../../components/pages/BrowseResources/ResourceCard.jsx'

const STORAGE_KEY = 'smart-hall-resources'
const FAVORITES_STORAGE_KEY = 'smart-hall-favorites'

const types = [
  { value: 'all', label: 'All' },
  { value: 'video', label: 'Videos' },
  { value: 'audio', label: 'Audio' },
  { value: 'book', label: 'Books' },
  { value: 'text', label: 'Texts' },
]

const levelOptions = ['All levels', 'A1', 'A2', 'B1', 'B2', 'C1']

// Mismos recursos recomendados que se muestran en Browse, para poder resolver los favoritos guardados.
const recommendations = [
  {
    id: 'rec-british-council-a1',
    title: 'LearnEnglish: Listening A1',
    type: 'audio',
    level: 'A1',
    description: 'Short audio clips and activities for practicing everyday conversations.',
    url: 'https://learnenglish.britishcouncil.org/skills/listening/a1-listening',
    artwork: 'bg-gradient-to-br from-emerald-500 via-teal-700 to-slate-950',
    artworkLabel: 'LISTEN',
    icon: '🎧',
    source: 'British Council',
  },
  {
    id: 'rec-gutenberg-a2',
    title: 'Short Stories in English',
    type: 'book',
    level: 'A2',
    description: 'Read stories in English and expand your vocabulary at your own pace.',
    url: 'https://www.gutenberg.org/ebooks/bookshelf/11',
    artwork: 'bg-gradient-to-br from-amber-300 via-orange-700 to-rose-950',
    artworkLabel: 'STORIES',
    icon: '📚',
    source: 'Project Gutenberg',
  },
  {
    id: 'rec-british-council-b1',
    title: 'Video zone: English in action',
    type: 'video',
    level: 'B1',
    description: 'Short videos with vocabulary and activities for practicing real-world English.',
    url: 'https://learnenglish.britishcouncil.org/general-english/video-zone',
    artwork: 'bg-gradient-to-br from-sky-400 via-blue-700 to-indigo-950',
    artworkLabel: 'ENGLISH IN ACTION',
    icon: '▶',
    source: 'British Council',
  },
  {
    id: 'rec-voa-b1',
    title: 'Learning English Broadcast',
    type: 'audio',
    level: 'B1',
    description: 'News and programs in English, presented at a learner-friendly pace.',
    url: 'https://learningenglish.voanews.com/z/1689',
    artwork: 'bg-gradient-to-br from-violet-400 via-purple-800 to-slate-950',
    artworkLabel: 'NEWS & STORIES',
    icon: '◖))',
    source: 'VOA Learning English',
  },
  {
    id: 'rec-ted-b2',
    title: 'TED Talks: ideas worth spreading',
    type: 'video',
    level: 'B2',
    description: 'Inspiring talks to practice listening comprehension and discover new ideas.',
    url: 'https://www.ted.com/talks',
    artwork: 'bg-gradient-to-br from-red-400 via-red-700 to-zinc-950',
    artworkLabel: 'IDEAS IN ENGLISH',
    icon: '▶',
    source: 'TED',
  },
  {
    id: 'rec-british-council-c1',
    title: 'Reading: advanced C1',
    type: 'text',
    level: 'C1',
    description: 'Advanced texts and exercises to strengthen reading and vocabulary.',
    url: 'https://learnenglish.britishcouncil.org/skills/reading/c1-reading',
    artwork: 'bg-gradient-to-br from-fuchsia-400 via-purple-800 to-slate-950',
    artworkLabel: 'READ & THINK',
    icon: 'Aa',
    source: 'British Council',
  },
]

function loadBookmarks() {
  const errors = []
  let resources = []
  let favoriteIds = []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (!Array.isArray(parsed)) throw new Error('Saved resources are not an array.')
      resources = parsed
    }
  } catch {
    errors.push('Your saved resources could not be loaded from this browser.')
  }

  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (!Array.isArray(parsed) || parsed.some((id) => typeof id !== 'string')) {
        throw new Error('Saved favorites are invalid.')
      }
      favoriteIds = parsed
    }
  } catch {
    errors.push('Your saved bookmarks could not be loaded from this browser.')
  }

  return { resources, favoriteIds, error: errors.join(' ') }
}

export default function BookmarksPanel() {
  const [state, setState] = useState(loadBookmarks)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('All levels')
  const [search, setSearch] = useState('')
  const [isConfirmingClear, setIsConfirmingClear] = useState(false)
  const { resources, favoriteIds, error } = state

  // Se respeta el orden en que el usuario fue guardando los favoritos.
  const catalog = [...resources, ...recommendations]
  const bookmarks = favoriteIds
    .map((id) => catalog.find((resource) => resource.id === id))
    .filter(Boolean)

  const filteredBookmarks = bookmarks.filter((resource) => {
    const matchesType = selectedType === 'all' || resource.type === selectedType
    const matchesLevel = selectedLevel === 'All levels' || resource.level === selectedLevel
    const searchText = `${resource.title} ${resource.description} ${resource.source ?? ''}`.toLowerCase()
    return matchesType && matchesLevel && searchText.includes(search.trim().toLowerCase())
  })

  function saveFavorites(updatedIds) {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedIds))
      setState((currentState) => ({ ...currentState, favoriteIds: updatedIds, error: '' }))
    } catch {
      setState((currentState) => ({
        ...currentState,
        error: 'Your bookmarks could not be updated. Check your browser storage and try again.',
      }))
    }
  }

  function handleToggleFavorite(resource) {
    saveFavorites(favoriteIds.filter((id) => id !== resource.id))
  }

  function handleClearAll() {
    saveFavorites([])
    setIsConfirmingClear(false)
  }

  const hasFilters = selectedType !== 'all' || selectedLevel !== 'All levels' || search.trim() !== ''

  return (
    <main className="space-y-8" aria-labelledby="bookmarks-title">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Saved for later</p>
            <h1 className="page-title" id="bookmarks-title">Bookmarks</h1>
            <p className="page-subtitle">
              Your favorite resources, all in one place.
            </p>
          </div>
          <Link className="button button-primary" to="/browse">
            Explore resources
          </Link>
        </div>

        {bookmarks.length > 0 && (
          <>
            <label className="mt-6 block max-w-2xl">
              <span className="sr-only">Search bookmarks</span>
              <input
                className="form-input"
                type="search"
                placeholder="Search your bookmarks..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <div className="mt-5 flex flex-wrap gap-2" aria-label="Filter by resource type">
              {types.map(({ value, label }) => (
                <button
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedType === value
                      ? 'bg-[var(--color-ink)] text-[var(--color-app)]'
                      : 'bg-[var(--color-panel-soft)] text-[var(--color-ink)] hover:bg-[var(--color-plum)]'
                  }`}
                  key={value}
                  type="button"
                  aria-pressed={selectedType === value}
                  onClick={() => setSelectedType(value)}
                >
                  {label}
                </button>
              ))}

              <label className="ml-auto flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <span>Level</span>
                <select
                  className="form-input min-h-0 w-auto py-2"
                  value={selectedLevel}
                  onChange={(event) => setSelectedLevel(event.target.value)}
                >
                  {levelOptions.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </label>
            </div>
          </>
        )}
      </section>

      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

      <section aria-labelledby="saved-bookmarks-title">
        <div className="section-heading !px-0">
          <div>
            <h2 id="saved-bookmarks-title">Your bookmarks</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {bookmarks.length
                ? `Showing ${filteredBookmarks.length} of ${bookmarks.length} bookmarks`
                : 'Resources you save will appear here.'}
            </p>
          </div>

          {bookmarks.length > 0 && !isConfirmingClear && (
            <button
              className="text-sm font-semibold text-red-400"
              type="button"
              onClick={() => setIsConfirmingClear(true)}
            >
              Remove all
            </button>
          )}
        </div>

        {isConfirmingClear && (
          <div
            className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-red-400/40 p-4"
            role="alertdialog"
            aria-label="Confirm removing all bookmarks"
          >
            <p className="text-sm font-semibold">Remove all your bookmarks?</p>
            <button className="button button-primary !bg-red-500 !text-white" type="button" onClick={handleClearAll}>
              Yes, remove all
            </button>
            <button className="button button-ghost" type="button" onClick={() => setIsConfirmingClear(false)}>
              Cancel
            </button>
          </div>
        )}

        {filteredBookmarks.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredBookmarks.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                recommended={Boolean(resource.source)}
                isFavorite
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="panel-muted rounded-xl p-6">
            <p className="font-semibold">
              {bookmarks.length && hasFilters
                ? 'No bookmarks match these filters.'
                : 'You have no bookmarks yet.'}
            </p>
            {!bookmarks.length && (
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Select ☆ on any resource in{' '}
                <Link className="text-[var(--color-pink)] underline" to="/browse">Explore resources</Link>
                {' '}to save it here.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
