import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWatchProviders } from "../services/tmdb";

function MovieCard({ movie }) {
  console.log("MovieCard renderizado para:", movie.title);
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function fetchProviders() {
      const data = await getWatchProviders(movie.id);
      setProviders(data);
    }
    fetchProviders();
  }, [movie.id]);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://placehold.co/300x450?text=Sem+Poster";

  const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";

  const handleClick = () => {
    console.log("Click detected on movie:", movie.id);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <div
        className="rounded-lg overflow-hidden transition-transform hover:scale-105"
        style={{ backgroundColor: "#1F1F1F", width: "200px" }}
      >
        <img src={posterUrl} alt={movie.title} className="w-full" />
        <div className="p-3">
          <h3 className="text-white font-bold text-sm">{movie.title}</h3>
          <p className="text-yellow-400 text-sm">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>
          <p className="text-gray-400 text-sm">{year}</p>

          {providers.length > 0 ? (
            <div className="mt-2">
              <p className="text-gray-400 text-xs mb-1">Disponível em:</p>
              <div className="flex flex-wrap gap-1">
                {providers.map((provider) => (
                  <img
                    key={provider.provider_id}
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    className="w-6 h-6 rounded"
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-xs mt-2">Sem streaming no BR</p>
          )}
        </div>
      </div>
    </button>
  );
}

export default MovieCard;
