import { useState } from "react";
import { getMoviesByMood } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

const MOODS = [
  { label: "Animado", genres: [28, 12] }, // Ação, Aventura
  { label: "Romântico", genres: [10749] }, // Romance
  { label: "Com Medo", genres: [27, 53] }, // Terror, Thriller
  { label: "Pensativo", genres: [18, 36] }, // Drama, História
  { label: "Querendo Rir", genres: [35] }, // Comédia
  { label: "Maravilhado", genres: [878, 14] }, // Ficção, Fantasia
];

const GENRES = [
  { id: 28, label: "Ação" },
  { id: 35, label: "Comédia" },
  { id: 18, label: "Drama" },
  { id: 27, label: "Terror" },
  { id: 10749, label: "Romance" },
  { id: 878, label: "Ficção Científica" },
  { id: 14, label: "Fantasia" },
  { id: 53, label: "Thriller" },
  { id: 36, label: "História" },
  { id: 12, label: "Aventura" },
];

function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!selectedMood && !selectedGenre) return;
    setLoading(true);

    const genreIds = selectedMood ? [...selectedMood.genres] : [];
    if (selectedGenre && !genreIds.includes(selectedGenre)) {
      genreIds.push(selectedGenre);
    }

    const results = await getMoviesByMood(genreIds);
    setMovies(results);
    setLoading(false);
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#141414" }}>
      <h2 className="text-white text-2xl font-bold mb-6">
        Como você está se sentindo?
      </h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {MOODS.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelectedMood(mood)}
            className="px-4 py-2 rounded-lg font-semibold transition-colors"
            style={{
              backgroundColor:
                selectedMood?.label === mood.label ? "#E50914" : "#1F1F1F",
              color: "white",
            }}
          >
            {mood.label}
          </button>
        ))}
      </div>

      <h2 className="text-white text-2xl font-bold mb-4">
        Filtrar por gênero:
      </h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className="px-4 py-2 rounded-lg font-semibold transition-colors"
            style={{
              backgroundColor:
                selectedGenre === genre.id ? "#E50914" : "#1F1F1F",
              color: "white",
            }}
          >
            {genre.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleSearch}
        className="text-white font-bold px-8 py-3 rounded-lg mb-8"
        style={{ backgroundColor: "#E50914" }}
      >
        Buscar Filmes
      </button>

      {loading && <p className="text-white">Carregando...</p>}

      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Mood;
