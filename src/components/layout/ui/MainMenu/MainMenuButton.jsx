/* Este va a ser el botón que va a desplegar el menú principal. Este botón va a tener un icono de hamburguesa y va a desplegar un menú con las opciones principales de la aplicación. */

const MainMenuButton = ({ isSidebarCollapsed, onClick }) => {
  return (
    <button
      className="icon-button"
      type="button"
      aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-expanded={!isSidebarCollapsed}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  )
}

export default MainMenuButton