import Footer from '../Footer/Footer.jsx'

const navItems = [
  ['⌂', 'Home', '#home'],
  ['⌕', 'Browse resources', '#resources'],
  ['＋', 'Create resource', '#create-resource'],
  ['▣', 'Resource management', '#resource-management'],
  ['☆', 'Bookmarks', '#bookmarks'],
]

const Sidebar = ({ isLightTheme, onThemeToggle }) => {
  return (
    <aside className="app-sidebar" aria-label="Main navigation">
      <a className="brand" href="/">
        <span className="brand-mark">S</span>
        <span>Smart Hall</span>
      </a>

      <nav>
        <ul className="nav-list">
          {navItems.map(([icon, label, href], index) => (
            <li key={label}>
              <a
                className="nav-link"
                data-active={index === 0}
                href={href}
              >
                <span aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </a>
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
