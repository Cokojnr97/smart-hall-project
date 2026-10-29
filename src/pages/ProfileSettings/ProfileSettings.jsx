import { useState } from 'react'

const ACCOUNTS_KEY = 'smart-hall-accounts'
const ACTIVE_ACCOUNT_KEY = 'smart-hall-active-account'
const SIGNED_OUT_VALUE = 'none'

const defaultAccount = {
  id: 'default-account',
  name: 'Smart Hall User',
  email: 'user@smarthall.com',
}

function loadSession() {
  try {
    const stored = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? 'null')
    const accounts = Array.isArray(stored) && stored.length > 0 ? stored : [defaultAccount]
    const storedActiveId = localStorage.getItem(ACTIVE_ACCOUNT_KEY)

    let activeId = accounts[0].id
    if (storedActiveId === SIGNED_OUT_VALUE) {
      activeId = null
    } else if (accounts.some((account) => account.id === storedActiveId)) {
      activeId = storedActiveId
    }

    return { accounts, activeId, error: '' }
  } catch {
    return {
      accounts: [defaultAccount],
      activeId: defaultAccount.id,
      error: 'Your saved accounts could not be loaded from this browser.',
    }
  }
}

function getInitial(name) {
  return (name.trim()[0] ?? '?').toUpperCase()
}

function AccountForm({ submitLabel, defaults = {}, onSubmit, onCancel }) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        const form = event.currentTarget
        event.preventDefault()
        if (onSubmit(new FormData(form))) form.reset()
      }}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-semibold">Name</span>
          <input
            className="form-input"
            name="name"
            type="text"
            maxLength="80"
            defaultValue={defaults.name}
            placeholder="Your name"
            required
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-semibold">Email</span>
          <input
            className="form-input"
            name="email"
            type="email"
            maxLength="120"
            defaultValue={defaults.email}
            placeholder="you@example.com"
            required
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="button button-primary" type="submit">{submitLabel}</button>
        {onCancel && (
          <button className="button button-ghost" type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  )
}

export default function ProfileSettings() {
  const [session, setSession] = useState(loadSession)
  const [message, setMessage] = useState('')
  const [formError, setFormError] = useState('')
  const [isAddingAccount, setIsAddingAccount] = useState(false)
  const [isConfirmingSignOut, setIsConfirmingSignOut] = useState(false)
  const { accounts, activeId, error: sessionError } = session
  const activeAccount = accounts.find((account) => account.id === activeId) ?? null
  const otherAccounts = accounts.filter((account) => account.id !== activeId)

  function saveSession(nextAccounts, nextActiveId, successMessage) {
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(nextAccounts))
      localStorage.setItem(ACTIVE_ACCOUNT_KEY, nextActiveId ?? SIGNED_OUT_VALUE)
      setSession({ accounts: nextAccounts, activeId: nextActiveId, error: '' })
      setFormError('')
      setMessage(successMessage)
      return true
    } catch {
      setMessage('')
      setFormError('Your changes could not be saved. Check your browser storage and try again.')
      return false
    }
  }

  function readAccountData(formData, ignoreId) {
    const name = formData.get('name').trim()
    const email = formData.get('email').trim().toLowerCase()
    const emailTaken = accounts.some((account) => account.id !== ignoreId && account.email === email)

    if (emailTaken) {
      setMessage('')
      setFormError('An account with this email already exists.')
      return null
    }
    return { name, email }
  }

  function handleUpdateProfile(formData) {
    const data = readAccountData(formData, activeId)
    if (!data) return false

    const updatedAccounts = accounts.map((account) => (
      account.id === activeId ? { ...account, ...data } : account
    ))
    return saveSession(updatedAccounts, activeId, 'Profile updated successfully.')
  }

  function handleAddAccount(formData) {
    const data = readAccountData(formData, null)
    if (!data) return false

    const newAccount = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      ...data,
    }
    const saved = saveSession(
      [...accounts, newAccount],
      newAccount.id,
      `Account added. You are now using ${newAccount.name}.`,
    )
    if (saved) setIsAddingAccount(false)
    return saved
  }

  function handleSwitchAccount(account) {
    setIsConfirmingSignOut(false)
    setIsAddingAccount(false)
    saveSession(accounts, account.id, `Switched to ${account.name}.`)
  }

  function handleRemoveAccount(account) {
    saveSession(
      accounts.filter(({ id }) => id !== account.id),
      activeId,
      `${account.name} was removed from this browser.`,
    )
  }

  function handleSignOut() {
    setIsConfirmingSignOut(false)
    setIsAddingAccount(false)
    saveSession(accounts, null, 'You have signed out.')
  }

  const feedback = (
    <>
      {message && <p className="text-sm text-[var(--color-lime)]" role="status">{message}</p>}
      {(formError || sessionError) && (
        <p className="text-sm text-red-400" role="alert">{formError || sessionError}</p>
      )}
    </>
  )

  // Sin sesión activa: se puede volver a entrar con una cuenta guardada o crear una nueva.
  if (!activeAccount) {
    return (
      <main className="space-y-8" aria-labelledby="profile-title">
        <section className="panel under-development">
          <p className="eyebrow">Account</p>
          <h1 className="page-title" id="profile-title">You are signed out</h1>
          <p className="page-subtitle">
            Choose a saved account to sign in again, or add a different one.
          </p>
          <div className="mt-6 space-y-3">{feedback}</div>
        </section>

        {accounts.length > 0 && (
          <section aria-labelledby="saved-accounts-title">
            <div className="section-heading !px-0">
              <h2 id="saved-accounts-title">Saved accounts</h2>
            </div>
            <ul className="grid max-w-3xl gap-3">
              {accounts.map((account) => (
                <li className="panel-muted flex flex-wrap items-center gap-4 rounded-xl p-4" key={account.id}>
                  <span className="avatar" aria-hidden="true">{getInitial(account.name)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{account.name}</p>
                    <p className="truncate text-sm text-[var(--color-muted)]">{account.email}</p>
                  </div>
                  <button
                    className="button button-primary"
                    type="button"
                    onClick={() => handleSwitchAccount(account)}
                  >
                    Sign in
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="panel max-w-3xl" aria-labelledby="new-account-title">
          <h2 className="text-lg font-semibold" id="new-account-title">Use another account</h2>
          <div className="mt-4">
            <AccountForm submitLabel="Add and sign in" onSubmit={handleAddAccount} />
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="space-y-8" aria-labelledby="profile-title">
      <section>
        <p className="eyebrow">Account</p>
        <h1 className="page-title" id="profile-title">Profile settings</h1>
        <p className="page-subtitle">
          Manage your profile, switch accounts, or sign out of Smart Hall.
        </p>
      </section>

      <div className="space-y-3">{feedback}</div>

      <section className="panel max-w-3xl" aria-labelledby="profile-details-title">
        <div className="flex items-center gap-4">
          <span className="avatar" aria-hidden="true">{getInitial(activeAccount.name)}</span>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold" id="profile-details-title">{activeAccount.name}</h2>
            <p className="truncate text-sm text-[var(--color-muted)]">{activeAccount.email}</p>
          </div>
        </div>
        <div className="mt-6">
          {/* La key reinicia el formulario cuando cambia la cuenta activa. */}
          <AccountForm
            key={activeAccount.id}
            submitLabel="Save profile"
            defaults={activeAccount}
            onSubmit={handleUpdateProfile}
          />
        </div>
      </section>

      <section className="panel max-w-3xl" aria-labelledby="switch-account-title">
        <h2 className="text-lg font-semibold" id="switch-account-title">Switch account</h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Move to another account saved in this browser, or add a new one.
        </p>

        {otherAccounts.length > 0 ? (
          <ul className="mt-4 grid gap-3">
            {otherAccounts.map((account) => (
              <li className="panel-muted flex flex-wrap items-center gap-4 rounded-xl p-4" key={account.id}>
                <span className="avatar" aria-hidden="true">{getInitial(account.name)}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{account.name}</p>
                  <p className="truncate text-sm text-[var(--color-muted)]">{account.email}</p>
                </div>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => handleSwitchAccount(account)}
                >
                  Switch
                </button>
                <button
                  className="button button-ghost !text-red-400"
                  type="button"
                  aria-label={`Remove ${account.name} from this browser`}
                  onClick={() => handleRemoveAccount(account)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="panel-muted mt-4 rounded-xl p-4 text-sm text-[var(--color-muted)]">
            You have no other accounts saved yet.
          </p>
        )}

        <div className="mt-5">
          {isAddingAccount ? (
            <AccountForm
              submitLabel="Add and switch"
              onSubmit={handleAddAccount}
              onCancel={() => setIsAddingAccount(false)}
            />
          ) : (
            <button
              className="button button-ghost"
              type="button"
              onClick={() => {
                setMessage('')
                setFormError('')
                setIsAddingAccount(true)
              }}
            >
              + Add another account
            </button>
          )}
        </div>
      </section>

      <section className="panel max-w-3xl" aria-labelledby="sign-out-title">
        <h2 className="text-lg font-semibold" id="sign-out-title">Sign out</h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          You will be signed out of {activeAccount.email} on this browser.
        </p>

        {isConfirmingSignOut ? (
          <div className="mt-4 flex flex-wrap items-center gap-3" role="alertdialog" aria-label="Confirm sign out">
            <p className="text-sm font-semibold">Do you want to sign out?</p>
            <button className="button button-primary" type="button" onClick={handleSignOut}>
              Yes, sign out
            </button>
            <button className="button button-ghost" type="button" onClick={() => setIsConfirmingSignOut(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="button button-ghost mt-4"
            type="button"
            onClick={() => {
              setMessage('')
              setFormError('')
              setIsConfirmingSignOut(true)
            }}
          >
            Sign out
          </button>
        )}
      </section>
    </main>
  )
}
