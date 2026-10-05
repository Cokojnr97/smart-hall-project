/* La barra de navegación va a contener

1. Un banner dinámico tipo "Hero". El banner va a mostrar una imagen de fondo y un mensaje de bienvenida al usuario. El mensaje va a ser dinámico y va a cambiar dependiendo del día de la semana y la hora del día. Por ejemplo, si es lunes por la mañana, el mensaje va a ser "¡Feliz lunes!" Al hacer scroll hacia abajo, el banner va a desaparecer y va a aparecer un menú fijo en la parte superior de la pantalla. Este menú fijo va a contener los siguientes elementos:
2. Un menú tipo "hamburguesa" que va a desplegar un menú oculto en la parte superior izquierda.
3. El logo de la aplicación que va a llevar a la página principal al lado del menú hamburguesa.
4. Barra de búsqueda en el centro de la barra de navegación.
5. Botón de "Crear nuevo recurso" a la derecha de la barra de búsqueda. Al hacer click en este botón, se va a abrir un modal con un formulario para crear un nuevo recurso.
6. Campana de notificaciones, a la derecha del botón de "Crear nuevo recurso". Al hacer click en la campana, se va a abrir un modal con las notificaciones del usuario. Si el usuario no tiene notificaciones, se va a mostrar un mensaje indicando que no hay notificaciones.
7. Perfil del usuario totalmente a la derecha de la barra de navegación. Al hacer click en el perfil del usuario, se va a abrir un modal con las opciones de configuración y perfil del usuario. Este modal va a contener un botón para cerrar sesión y un botón para ir a la página de perfil del usuario. El icono del perfil del usuario va a ser una imagen de la foto de perfil del usuario en un pequeño círculo. Si el usuario no tiene foto de perfil, se va a mostrar un icono genérico de usuario.
 */

import './Navbar.css'
import HomeLogo from '../ui/HomeLogo/HomeLogo.jsx'
import UserInterfaceButton from '../ui/UserInterfaceButton/UserInterfaceButton.jsx'
import SearchBar from '../ui/SearchBar/SearchBar.jsx'
import MainMenuButton from '../ui/MainMenu/MainMenuButton.jsx'
import NotificationsButton from '../ui/NotificationsButton/NotificationsButton.jsx'
import CreateResourceButton from '../ui/CreateResourceButton/CreateResourceButton.jsx'

const Navbar = ({ isSidebarCollapsed, onMenuToggle }) => {
  return (
    <header className="navbar">
      <div className="navbar-start">
        <MainMenuButton
          isSidebarCollapsed={isSidebarCollapsed}
          onClick={onMenuToggle}
        />
        <HomeLogo />
      </div>
      <div className="navbar-center">
        <SearchBar />
      </div>
      <div className="navbar-end">
        <CreateResourceButton />
        <NotificationsButton />
        <UserInterfaceButton />
      </div>
    </header>
  )
}

export default Navbar
