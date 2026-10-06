/* Barra de búsqueda */

const SearchBar = () => {
  return (
    <div className="flex items-center">
      <label className="sr-only" htmlFor="navbar-search">Search</label>
      <input id="navbar-search" type="search" placeholder="Search..." className="form-input" />
    </div>
  )
}

export default SearchBar