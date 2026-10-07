const resourceTypes = [
  { value: 'book', label: 'Book' },
  { value: 'text', label: 'Text' },
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
]

export default function CreateResourceView({
  englishLevels,
  resources,
  message,
  error,
  onSubmit,
}) {
  return (
    <section className="panel under-development" aria-labelledby="create-resource-title">
      <p className="eyebrow">Learning library</p>
      <h1 className="page-title" id="create-resource-title">Add a resource</h1>
      <p className="page-subtitle">
        Share books, texts, audio, or videos to help learners study English from A1 to C1.
      </p>

      <form className="mt-8 max-w-3xl space-y-5" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-semibold">Title</span>
            <input
              className="form-input"
              name="title"
              type="text"
              maxLength="120"
              placeholder="Ej. Everyday English: short stories"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold">Resource type</span>
            <select className="form-input" name="type" defaultValue="" required>
              <option value="" disabled>Select a type</option>
              {resourceTypes.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold">English level</span>
            <select className="form-input" name="level" defaultValue="" required>
              <option value="" disabled>Select a level</option>
              {englishLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold">Resource link</span>
            <input
              className="form-input"
              name="url"
              type="url"
              maxLength="2048"
              placeholder="https://..."
              required
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold">Description</span>
          <textarea
            className="form-input min-h-28 resize-y"
            name="description"
            maxLength="1000"
            placeholder="Describe what learners can learn and how they can use this resource."
            required
            rows="4"
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button className="button button-primary" type="submit">
            Add resource
          </button>
          <p className="text-sm text-[var(--color-muted)]">
            Saved in this browser.
          </p>
        </div>

        {message && (
          <p className="text-sm text-[var(--color-lime)]" role="status">{message}</p>
        )}
        {error && (
          <p className="text-sm text-red-400" role="alert">{error}</p>
        )}
      </form>

      {resources.length > 0 && (
        <section className="mt-10 max-w-3xl" aria-labelledby="saved-resources-title">
          <h2 className="text-lg font-semibold" id="saved-resources-title">
            Added resources ({resources.length})
          </h2>
          <ul className="mt-3 grid gap-3">
            {resources.map((resource) => (
              <li className="panel-muted p-4" key={resource.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{resource.title}</h3>
                  <span className="badge">
                    {resourceTypes.find(({ value }) => value === resource.type)?.label ?? resource.type}
                  </span>
                  <span className="badge">{resource.level}</span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  {resource.description}
                </p>
                <a
                  className="mt-2 inline-block text-sm text-[var(--color-pink)] underline"
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open resource
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}
