/* Panel donde el usuario va gestionar los recursos creados por él, modificarls y además podrá eliminarlos. También podrá revisar el estado de los mismos. (Si están aprobados o no) */

import { useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'smart-hall-resources'
const FAVORITES_STORAGE_KEY = 'smart-hall-favorites'

const resourceTypes = [
  { value: 'book', label: 'Book' },
  { value: 'text', label: 'Text' },
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
]

const englishLevels = ['A1', 'A2', 'B1', 'B2', 'C1']

const statusInfo = {
  approved: { label: 'Approved', className: 'text-[var(--color-lime)]' },
  pending: { label: 'Pending review', className: 'text-amber-400' },
  rejected: { label: 'Rejected', className: 'text-red-400' },
}

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
]

const getStatus = (resource) => (statusInfo[resource.status] ? resource.status : 'pending')

function loadResources() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { resources: [], error: '' }

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) throw new Error('Stored resources must be an array.')
    return { resources: parsed, error: '' }
  } catch {
    return {
      resources: [],
      error: 'Your saved resources could not be loaded from this browser.',
    }
  }
}

function removeFromFavorites(resourceId) {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? '[]')
    if (!Array.isArray(stored)) return
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(stored.filter((id) => id !== resourceId)),
    )
  } catch {
  }
}

function formatDate(isoDate) {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date)
}

function EditResourceForm({ resource, onSave, onCancel }) {
  return (
    <form
      className="mt-4 space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSave(resource.id, new FormData(event.currentTarget))
      }}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-semibold">Title</span>
          <input
            className="form-input"
            name="title"
            type="text"
            maxLength="120"
            defaultValue={resource.title}
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold">Resource type</span>
          <select className="form-input" name="type" defaultValue={resource.type} required>
            {resourceTypes.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold">English level</span>
          <select className="form-input" name="level" defaultValue={resource.level} required>
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
            defaultValue={resource.url}
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
          defaultValue={resource.description}
          required
          rows="4"
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button className="button button-primary" type="submit">Save changes</button>
        <button className="button button-ghost" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default function ResourceManagementPanel() {
  const [resourceState, setResourceState] = useState(loadResources)
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [message, setMessage] = useState('')
  const { resources, error } = resourceState

  const counts = {
    all: resources.length,
    approved: resources.filter((resource) => getStatus(resource) === 'approved').length,
    pending: resources.filter((resource) => getStatus(resource) === 'pending').length,
    rejected: resources.filter((resource) => getStatus(resource) === 'rejected').length,
  }
  const visibleResources = resources.filter(
    (resource) => statusFilter === 'all' || getStatus(resource) === statusFilter,
  )

  function persist(updatedResources, successMessage) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResources))
      setResourceState({ resources: updatedResources, error: '' })
      setMessage(successMessage)
      return true
    } catch {
      setMessage('')
      setResourceState((currentState) => ({
        ...currentState,
        error: 'Your changes could not be saved. Check your browser storage and try again.',
      }))
      return false
    }
  }

  function handleSave(resourceId, formData) {
    const updatedResources = resources.map((resource) => (
      resource.id === resourceId
        ? {
            ...resource,
            title: formData.get('title').trim(),
            type: formData.get('type'),
            level: formData.get('level'),
            description: formData.get('description').trim(),
            url: formData.get('url').trim(),
            updatedAt: new Date().toISOString(),
          }
        : resource
    ))

    if (persist(updatedResources, 'Resource updated successfully.')) {
      setEditingId(null)
    }
  }

  function handleDelete(resourceId) {
    const updatedResources = resources.filter((resource) => resource.id !== resourceId)

    if (persist(updatedResources, 'Resource deleted.')) {
      removeFromFavorites(resourceId)
      setDeletingId(null)
      setEditingId((currentId) => (currentId === resourceId ? null : currentId))
    }
  }

  return (
    <main className="space-y-8" aria-labelledby="resource-management-title">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Your library</p>
            <h1 className="page-title" id="resource-management-title">Resource management</h1>
            <p className="page-subtitle">
              Edit or delete the resources you created and check whether they have been approved.
            </p>
          </div>
          <Link className="button button-primary" to="/create-resource">
            + Create resource
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {statusFilters.map(({ value, label }) => (
            <button
              className={`panel-muted rounded-xl p-4 text-left transition ${
                statusFilter === value ? 'ring-2 ring-[var(--color-pink)]' : 'hover:-translate-y-0.5'
              }`}
              key={value}
              type="button"
              aria-pressed={statusFilter === value}
              onClick={() => setStatusFilter(value)}
            >
              <span className="block text-2xl font-bold">{counts[value]}</span>
              <span className="text-sm text-[var(--color-muted)]">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {message && <p className="text-sm text-[var(--color-lime)]" role="status">{message}</p>}
      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

      <section aria-labelledby="managed-resources-title">
        <div className="section-heading !px-0">
          <div>
            <h2 id="managed-resources-title">Your resources</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {resources.length
                ? `Showing ${visibleResources.length} of ${resources.length} resources`
                : 'Resources you add will appear here.'}
            </p>
          </div>
        </div>

        {visibleResources.length > 0 ? (
          <ul className="grid gap-4">
            {visibleResources.map((resource) => {
              const status = getStatus(resource)
              const isEditing = editingId === resource.id
              const isDeleting = deletingId === resource.id
              const typeLabel = resourceTypes.find(({ value }) => value === resource.type)?.label ?? resource.type

              return (
                <li className="panel-muted rounded-xl p-5" key={resource.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{resource.title}</h3>
                        <span className="badge">{typeLabel}</span>
                        <span className="badge">{resource.level}</span>
                        <span className={`badge font-semibold ${statusInfo[status].className}`}>
                          {statusInfo[status].label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">
                        Created {formatDate(resource.createdAt)}
                        {resource.updatedAt && ` · Edited ${formatDate(resource.updatedAt)}`}
                      </p>
                    </div>

                    {!isEditing && !isDeleting && (
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="button button-ghost"
                          type="button"
                          onClick={() => {
                            setMessage('')
                            setDeletingId(null)
                            setEditingId(resource.id)
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="button button-ghost !text-red-400"
                          type="button"
                          onClick={() => {
                            setMessage('')
                            setEditingId(null)
                            setDeletingId(resource.id)
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <EditResourceForm
                      resource={resource}
                      onSave={handleSave}
                      onCancel={() => setEditingId(null)}
                    />
                  ) : (
                    <>
                      <p className="mt-3 text-sm text-[var(--color-muted)]">{resource.description}</p>
                      <a
                        className="mt-2 inline-block text-sm text-[var(--color-pink)] underline"
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open resource
                      </a>
                    </>
                  )}

                  {isDeleting && (
                    <div className="mt-4 rounded-xl border border-red-400/40 p-4" role="alertdialog" aria-label={`Delete ${resource.title}`}>
                      <p className="text-sm font-semibold">Delete this resource?</p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        This action cannot be undone.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <button
                          className="button button-primary !bg-red-500 !text-white"
                          type="button"
                          onClick={() => handleDelete(resource.id)}
                        >
                          Yes, delete
                        </button>
                        <button className="button button-ghost" type="button" onClick={() => setDeletingId(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="panel-muted rounded-xl p-6">
            <p className="font-semibold">
              {resources.length ? 'No resources with this status.' : 'You have not created any resources yet.'}
            </p>
            {!resources.length && (
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Create a book, text, audio, or video resource and you will be able to manage it here.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
