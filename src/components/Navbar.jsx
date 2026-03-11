import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="flex items-center gap-8 px-8 py-4" style={{backgroundColor: '#141414'}}>
      <h1 className="text-2xl font-black" style={{color: '#E50914'}}>CINEFINDER</h1>

      <Link
        to="/"
        className={`font-semibold transition-colors ${
          location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        Buscar Filmes
      </Link>

      <Link
        to="/mood"
        className={`font-semibold transition-colors ${
          location.pathname === '/mood' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        Buscar por Mood
      </Link>
    </nav>
  )
}

export default Navbar