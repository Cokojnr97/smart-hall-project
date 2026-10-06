import { Link } from 'react-router-dom'

const typeInfo = {
  book: { label: 'Book', icon: '📚', colors: 'from-amber-300 via-orange-700 to-rose-950' },
  text: { label: 'Text', icon: 'Aa', colors: 'from-fuchsia-400 via-purple-800 to-slate-950' },
  audio: { label: 'Audio', icon: '🎧', colors: 'from-emerald-400 via-teal-700 to-slate-950' },
  video: { label: 'Video', icon: '▶', colors: 'from-sky-400 via-blue-700 to-indigo-950' },
}

function ResourceCard({ resource, recommended = false, isFavorite, onToggleFavorite }) {
  const info = typeInfo[resource.type] ?? {
    label: resource.type,
    icon: '✦',
    colors: 'from-purple-500 to-slate-950',
  }
  const artwork = resource.artwork ?? `bg-gradient-to-br ${info.colors}`
  const artworkLabel = resource.artworkLabel ?? info.label.toUpperCase()

  return (
    <article className="group min-w-0">
      <a
        className={`relative flex aspect-video items-center justify-center overflow-hidden rounded-xl ${artwork} text-white no-underline transition duration-200 group-hover:-translate-y-1`}
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${resource.title}`}
      >
        <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
        <span className="relative flex flex-col items-center gap-2 text-center">
          <span className="text-4xl font-bold drop-shadow-lg">{resource.icon ?? info.icon}</span>
          <span className="max-w-[85%] text-sm font-black tracking-[0.18em] drop-shadow-lg">
            {artworkLabel}
          </span>
        </span>
        <span className="absolute bottom-2 right-2 rounded bg-black/75 px-2 py-1 text-xs font-bold">
          {resource.level}
        </span>
      </a>
      <div className="mt-3 flex gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-panel-soft)] text-lg" aria-hidden="true">
          {recommended ? '✦' : '＋'}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-bold leading-5">{resource.title}</h3>
          <p className="mt-1 truncate text-xs text-[var(--color-muted)]">
            {recommended ? resource.source : 'Created by you'}
          </p>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--color-muted)]">
            {resource.description}
          </p>
          <span className="mt-2 inline-flex rounded-full bg-[var(--color-panel-soft)] px-2.5 py-1 text-xs text-[var(--color-muted)]">
            {info.label}
          </span>
        </div>
        <button
          className="h-9 w-9 shrink-0 rounded-full bg-[var(--color-panel-soft)] text-lg transition hover:text-[var(--color-pink)]"
          type="button"
          aria-label={isFavorite ? `Remove ${resource.title} from favorites` : `Add ${resource.title} to favorites`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(resource)}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </article>
  )
}

export default function BrowseResourcesView({
  types,
  levelOptions,
  selectedType,
  selectedLevel,
  search,
  onTypeChange,
  onLevelChange,
  onSearchChange,
  resources,
  filteredResources,
  favoriteResources,
  filteredRecommendations,
  favoriteIds,
  onToggleFavorite,
  error,
}) {
  return (
    <main className="space-y-8" aria-labelledby="browse-resources-title">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Discover and learn</p>
            <h1 className="page-title" id="browse-resources-title">Explore resources</h1>
            <p className="page-subtitle">
              Find resources to practice English from A1 to C1.
            </p>
          </div>
          <Link className="button button-primary" to="/create-resource">
            + Create resource
          </Link>
        </div>

        <label className="mt-6 block max-w-2xl">
          <span className="sr-only">Search resources</span>
          <input
            className="form-input"
            type="search"
            placeholder="Search by title, topic, or source..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
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
              onClick={() => onTypeChange(value)}
            >
              {label}
            </button>
          ))}

          <label className="ml-auto flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <span>Level</span>
            <select
              className="form-input min-h-0 w-auto py-2"
              value={selectedLevel}
              onChange={(event) => onLevelChange(event.target.value)}
            >
              {levelOptions.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

      <section aria-labelledby="created-resources-title">
        <div className="section-heading !px-0">
          <div>
            <h2 id="created-resources-title">Your resources</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {resources.length
                ? `${filteredResources.length} of ${resources.length} resources`
                : 'Resources you add will appear here.'}
            </p>
          </div>
          {resources.length > 0 && (
            <Link className="text-sm font-semibold text-[var(--color-pink)] no-underline" to="/create-resource">
              Add a resource
            </Link>
          )}
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isFavorite={favoriteIds.includes(resource.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="panel-muted rounded-xl p-6">
            <p className="font-semibold">
              {resources.length ? 'No resources match these filters.' : 'You have not created any resources yet.'}
            </p>
            {!resources.length && (
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Create a book, text, audio, or video resource and it will appear here.
              </p>
            )}
          </div>
        )}
      </section>

      <section aria-labelledby="favorite-resources-title">
        <div className="section-heading !px-0">
          <div>
            <h2 id="favorite-resources-title">Your favorites</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Save resources here to find them easily later.
            </p>
          </div>
        </div>
        {favoriteResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {favoriteResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                recommended={Boolean(resource.source)}
                isFavorite
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <p className="panel-muted rounded-xl p-6 text-sm text-[var(--color-muted)]">
            You have no favorites yet. Select ☆ on a card to save it here.
          </p>
        )}
      </section>

      <section aria-labelledby="recommendations-title">
        <div className="section-heading !px-0">
          <div>
            <h2 id="recommendations-title">Recommended for you</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Hand-picked resources to help you keep practicing.
            </p>
          </div>
        </div>
        {filteredRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredRecommendations.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                recommended
                isFavorite={favoriteIds.includes(resource.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <p className="panel-muted rounded-xl p-6 text-sm text-[var(--color-muted)]">
            No recommendations match this search or filter combination.
          </p>
        )}
      </section>
    </main>
  )
}
