import { useState } from 'react'
import NavBar from './layout/Navbar/Navbar.jsx'
import Sidebar from './layout/Sidebar/Sidebar.jsx'

const scheduleItems = [
  ['09:30', 'Creative direction', 'Room 204', 'Live'],
  ['11:00', 'Project check-in', 'Room 108', 'Upcoming'],
  ['14:30', 'Design workshop', 'Room 302', 'Upcoming'],
]

export default function Test() {
  const [theme, setTheme] = useState('dark')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const isLightTheme = theme === 'light'

  return (
     // Voy a integrar la navbar
     
    <div
      className="app-shell"
      data-sidebar-collapsed={isSidebarCollapsed}
      data-theme={theme}
    >
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isLightTheme={isLightTheme}
        onThemeToggle={() => setTheme(isLightTheme ? 'dark' : 'light')}
      />

      <main className="app-main">
        <div className="app-content">
          <NavBar
            isSidebarCollapsed={isSidebarCollapsed}
            onMenuToggle={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
          />
          <header className="topbar">
            <div>
              <p className="eyebrow">Monday, January 15</p>
              <h1 className="page-title">Good morning, Alex</h1>
              <p className="page-subtitle">Here is what is happening across your halls today.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="icon-button" type="button" aria-label="Notifications">♧</button>
              <span className="avatar" aria-label="Alex Morgan">AM</span>
              <button className="button button-primary" type="button">+ Book a room</button>
            </div>
          </header>

          <section className="hero-grid" aria-label="Overview">
            <article className="panel hero-card">
              <p className="eyebrow">Today&apos;s focus</p>
              <h2 className="mt-3 max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
                Make space for better ideas.
              </h2>
              <p className="hero-copy mt-4 max-w-md text-sm leading-6">
                Keep your teams moving with a clear view of rooms, sessions, and shared resources.
              </p>
              <button className="button button-ghost mt-7" type="button">View schedule <span aria-hidden="true">→</span></button>
            </article>

            <article className="panel flex flex-col justify-between p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="stat-label">Room occupancy</p>
                  <strong className="stat-value">76%</strong>
                </div>
                <span className="badge">+12%</span>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-xs text-[var(--color-muted)]">
                  <span>18 of 24 rooms active</span>
                  <span>Today</span>
                </div>
                <div className="progress" aria-label="Room occupancy 76 percent">
                  <span style={{ '--progress': '76%' }} />
                </div>
              </div>
            </article>
          </section>

          <section className="stat-grid" aria-label="Key statistics">
            <article className="panel panel-interactive stat-card">
              <span className="stat-label">Active bookings</span>
              <strong className="stat-value">24</strong>
              <span className="stat-change">+8.4% this week</span>
            </article>
            <article className="panel panel-interactive stat-card">
              <span className="stat-label">Available rooms</span>
              <strong className="stat-value">06</strong>
              <span className="stat-change">Ready to reserve</span>
            </article>
            <article className="panel panel-interactive stat-card">
              <span className="stat-label">Team attendance</span>
              <strong className="stat-value">91%</strong>
              <span className="stat-change">+4.2% this month</span>
            </article>
          </section>

          <section className="section-grid">
            <article className="panel">
              <div className="section-heading">
                <h2>Today&apos;s schedule</h2>
                <a href="#schedule">View all</a>
              </div>
              <ul className="list">
                {scheduleItems.map(([time, title, room, status]) => (
                  <li className="list-item" key={title}>
                    <span className="w-14 text-xs text-[var(--color-muted)]">{time}</span>
                    <span className="avatar !h-9 !w-9">♢</span>
                    <span className="list-item-content">
                      <span className="list-item-title">{title}</span>
                      <span className="list-item-meta">{room}</span>
                    </span>
                    <span className="badge">{status}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="panel">
              <div className="section-heading">
                <h2>Quick search</h2>
              </div>
              <div className="p-5 pt-2">
                <label className="sr-only" htmlFor="room-search">Search rooms</label>
                <input className="form-input" id="room-search" placeholder="Search rooms or resources..." />
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="badge">Projectors 12</span>
                  <span className="badge">Whiteboards 18</span>
                  <span className="badge">Quiet rooms 4</span>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  )
}
