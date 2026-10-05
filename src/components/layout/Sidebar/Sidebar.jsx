/* En la barra lateral de la aplicación queremos incluir :
1. Los íconos de navegación.
    1.1. Ícono de inicio
    1.2. Ícono de explorar recursos
    1.3. Ícono de crear recurso
    1.4. Ícono de gestión de recursos
    1.5. Ícono de marcadores
2. Opciones de configuración
3. El footer de la aplicación
*/

import Footer from '../Footer/Footer.jsx'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  ['⌂', 'Home', '/'],
  ['⌕', 'Browse resources', '/browse'],
  ['＋', 'Create resource', '/create-resource'],
  ['▣', 'Resource management', '/resources'],
  ['☆', 'Bookmarks', '/bookmarks'],
]

const Sidebar = ({ isCollapsed, isLightTheme, onThemeToggle }) => {
  return (
    <aside
      className="app-sidebar"
      data-collapsed={isCollapsed}
      aria-label="Main navigation"
    >
      <Link className="brand" to="/">
        <span className="brand-mark">S</span>
        <span>Smart Hall</span>
      </Link>

      <nav>
        <ul className="nav-list">
          {navItems.map(([icon, label, href]) => (
            <li key={label}>
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                end={href === '/'}
                to={href}
              >
                <span aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-link" type="button">
          <span aria-hidden="true">⚙</span>
          <span>Settings</span>
        </button>
        <button
          className="nav-link"
          type="button"
          aria-label={`Switch to ${isLightTheme ? 'dark' : 'light'} theme`}
          onClick={onThemeToggle}
        >
          <span aria-hidden="true">{isLightTheme ? '☾' : '☀'}</span>
          <span>{isLightTheme ? 'Dark theme' : 'Light theme'}</span>
        </button>
      </div>

      <Footer />
    </aside>
  )
}

export default Sidebar
