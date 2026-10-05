/* Botón de la interfaz de usuario donde se accede a las opciones de configuración y perfil del usuario. Este botón se muestra en la barra de navegación y el icono usara una imagen de la foto de perfil del usuario en un pequeño círculo. */

const UserInterfaceButton = () => {
    return (
        <button className="icon-button" type="button" aria-label="Open user profile">
            <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
        </button>
    )
}

export default UserInterfaceButton