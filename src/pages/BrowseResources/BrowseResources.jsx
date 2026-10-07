import { useState } from 'react'
import BrowseResourcesView from '../../components/pages/BrowseResources/BrowseResourcesView.jsx'

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

function loadResources() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { resources: [], error: '' }

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) throw new Error('Saved resources are not an array.')
    return { resources: parsed, error: '' }
  } catch {
    return {
      resources: [],
      error: 'Your saved resources could not be loaded from this browser.',
    }
  }
}

function loadFavoriteIds() {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!stored) return { favoriteIds: [], error: '' }

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed) || parsed.some((id) => typeof id !== 'string')) {
      throw new Error('Saved favorites are invalid.')
    }
    return { favoriteIds: parsed, error: '' }
  } catch {
    return {
      favoriteIds: [],
      error: 'Your saved favorites could not be loaded from this browser.',
    }
  }
}

export default function BrowseResources() {
  const [resourceState] = useState(loadResources)
  const [favoriteState, setFavoriteState] = useState(loadFavoriteIds)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('All levels')
  const [search, setSearch] = useState('')
  const { resources, error } = resourceState
  const { favoriteIds, error: favoriteError } = favoriteState
  const allResources = [...resources, ...recommendations]
  const favoriteResources = allResources.filter((resource) => favoriteIds.includes(resource.id))

  function toggleFavorite(resource) {
    const updatedFavoriteIds = favoriteIds.includes(resource.id)
      ? favoriteIds.filter((id) => id !== resource.id)
      : [...favoriteIds, resource.id]

    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavoriteIds))
      setFavoriteState({ favoriteIds: updatedFavoriteIds, error: '' })
    } catch {
      setFavoriteState((currentState) => ({
        ...currentState,
        error: 'Your favorites could not be updated. Check your browser storage and try again.',
      }))
    }
  }

  const filterResources = (items) => items.filter((resource) => {
    const matchesType = selectedType === 'all' || resource.type === selectedType
    const matchesLevel = selectedLevel === 'All levels' || resource.level === selectedLevel
    const searchText = `${resource.title} ${resource.description} ${resource.source ?? ''}`.toLowerCase()
    return matchesType && matchesLevel && searchText.includes(search.trim().toLowerCase())
  })
  const filteredResources = filterResources(resources)
  const filteredRecommendations = filterResources(recommendations)

  return (
    <BrowseResourcesView
      types={types}
      levelOptions={levelOptions}
      selectedType={selectedType}
      selectedLevel={selectedLevel}
      search={search}
      onTypeChange={setSelectedType}
      onLevelChange={setSelectedLevel}
      onSearchChange={setSearch}
      resources={resources}
      filteredResources={filteredResources}
      favoriteResources={favoriteResources}
      filteredRecommendations={filteredRecommendations}
      favoriteIds={favoriteIds}
      onToggleFavorite={toggleFavorite}
      error={[error, favoriteError].filter(Boolean).join(' ')}
    />
  )
}
