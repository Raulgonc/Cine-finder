import { useState } from "react";
import { searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query) return;
    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setLoading(false);
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#141414" }}>
      <h1 className="text-5xl font-black mb-6" style={{ color: "#E50914" }}>
        CINEFINDER
      </h1>
      <div className="flex gap-2 mb-8 flex-wrap w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Digite o nome do filme..."
          className="text-white px-4 py-2 rounded-lg outline-none w-80"
          style={{ backgroundColor: "#1F1F1F" }}
        />
        <button
          onClick={handleSearch}
          className="text-white font-bold px-6 py-2 rounded-lg"
          style={{ backgroundColor: "#E50914" }}
        >
          Buscar
        </button>
      </div>
      {loading && <p className="text-white">Carregando...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
