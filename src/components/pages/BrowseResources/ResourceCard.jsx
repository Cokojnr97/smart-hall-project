const typeInfo = {
  book: { label: 'Book', icon: '📚', colors: 'from-amber-300 via-orange-700 to-rose-950' },
  text: { label: 'Text', icon: 'Aa', colors: 'from-fuchsia-400 via-purple-800 to-slate-950' },
  audio: { label: 'Audio', icon: '🎧', colors: 'from-emerald-400 via-teal-700 to-slate-950' },
  video: { label: 'Video', icon: '▶', colors: 'from-sky-400 via-blue-700 to-indigo-950' },
}

export default function ResourceCard({ resource, recommended = false, isFavorite, onToggleFavorite }) {
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
