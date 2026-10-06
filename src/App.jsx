import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './index.css'
import Navbar from './components/layout/Navbar/Navbar.jsx'
import Sidebar from './components/layout/Sidebar/Sidebar.jsx'

function App() {
  const [theme, setTheme] = useState('dark')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div
      className="app-shell"
      data-sidebar-collapsed={isSidebarCollapsed}
      data-theme={theme}
    >
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isLightTheme={theme === 'light'}
        onThemeToggle={() => setTheme((currentTheme) => (
          currentTheme === 'light' ? 'dark' : 'light'
        ))}
      />
      <main className="app-main">
        <div className="app-content">
          <Navbar
            isSidebarCollapsed={isSidebarCollapsed}
            onMenuToggle={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
          />
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
