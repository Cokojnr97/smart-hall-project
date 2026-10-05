/* Logo de la página principal que va a llevar al inicio al ser clicado. */

const HomeLogo = () => {
  return (
    <div className="flex items-center">
        <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[var(--color-primary)]">SmartHall</span>
        </a>
    </div>
  )
}

export default HomeLogo