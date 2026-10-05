/* Logo de la página principal que va a llevar al inicio al ser clicado. */

import { Link } from 'react-router-dom'

const HomeLogo = () => {
  return (
    <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[var(--color-primary)]">SmartHall</span>
        </Link>
    </div>
  )
}

export default HomeLogo