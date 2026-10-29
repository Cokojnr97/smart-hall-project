import { useState } from 'react'
import CreateResourceView from '../../components/pages/CreateResourcePanel/CreateResourceView.jsx'

const STORAGE_KEY = 'smart-hall-resources'

const englishLevels = ['A1', 'A2', 'B1', 'B2', 'C1']

function loadResources() {
  try {
    const storedResources = localStorage.getItem(STORAGE_KEY)
    if (!storedResources) {
      return { resources: [], error: '' }
    }

    const parsedResources = JSON.parse(storedResources)
    if (!Array.isArray(parsedResources)) {
      throw new Error('Stored resources must be an array.')
    }

    return { resources: parsedResources, error: '' }
  } catch {
    return {
      resources: [],
      error: 'Saved resources could not be loaded from this browser.',
    }
  }
}

export default function CreateResourcePanel() {
  const [resourceState, setResourceState] = useState(loadResources)
  const [message, setMessage] = useState('')
  const { resources, error } = resourceState

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    const formData = new FormData(event.currentTarget)
    const newResource = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title: formData.get('title').trim(),
      type: formData.get('type'),
      level: formData.get('level'),
      description: formData.get('description').trim(),
      url: formData.get('url').trim(),
      createdAt: new Date().toISOString(),
    }
    const updatedResources = [newResource, ...resources]

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResources))
      setResourceState({ resources: updatedResources, error: '' })
      event.currentTarget.reset()
      setMessage('Resource added successfully.')
    } catch {
      setResourceState((currentState) => ({
        ...currentState,
        error: 'The resource could not be saved. Check your browser storage and try again.',
      }))
    }
  }

  return (
    <CreateResourceView
      englishLevels={englishLevels}
      resources={resources}
      message={message}
      error={error}
      onSubmit={handleSubmit}
    />
  )
}
