import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getWatchProviders } from "../services/tmdb";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      const details = await getMovieDetails(id);
      setMovie(details);

      const providerData = await getWatchProviders(id);
      setProviders(providerData);

      setLoading(false);
    }
    fetchDetails();
  }, [id]);

  if (loading)
    return <div className="text-white text-center p-8">Carregando...</div>;
  if (!movie)
    return (
      <div className="text-white text-center p-8">Filme não encontrado</div>
    );

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : posterUrl;

  const director = movie.credits?.crew?.find(
    (person) => person.job === "Director",
  );
  const cast = movie.credits?.cast?.slice(0, 6) || [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#141414" }}>
      {/* Backdrop */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent, #141414)",
          }}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="px-8 py-8 -mt-32 relative z-10">
        <div className="flex gap-8 flex-wrap">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-48 rounded-lg shadow-lg"
            />
          </div>

          {/* Informações */}
          <div className="flex-1">
            <h1 className="text-white text-4xl font-bold mb-2">
              {movie.title}
            </h1>
            <p className="text-gray-400 text-lg mb-4">
              {movie.release_date?.split("-")[0]}
            </p>

            {/* Rating e Gêneros */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-2xl">⭐</span>
                <span className="text-white text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>

              {movie.genres && (
                <div className="flex gap-2 flex-wrap">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 rounded-full text-sm text-white"
                      style={{ backgroundColor: "#1F1F1F" }}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sinopse */}
            <div className="mb-6">
              <h2 className="text-white text-xl font-bold mb-2">Sinopse</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Director */}
            {director && (
              <div className="mb-6">
                <h2 className="text-white text-xl font-bold mb-2">Diretor</h2>
                <p className="text-gray-300">{director.name}</p>
              </div>
            )}

            {/* Streaming */}
            {providers.length > 0 && (
              <div className="mb-6">
                <h2 className="text-white text-xl font-bold mb-3">
                  Onde assistir
                </h2>
                <div className="flex flex-wrap gap-3">
                  {providers.map((provider) => (
                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      className="w-12 h-12 rounded"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Botão voltar */}
            <button
              onClick={() => navigate(-1)}
              className="text-white font-bold px-6 py-2 rounded-lg"
              style={{ backgroundColor: "#E50914" }}
            >
              ← Voltar
            </button>
          </div>
        </div>

        {/* Elenco */}
        {cast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-white text-2xl font-bold mb-6">Elenco</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cast.map((actor) => (
                <div key={actor.id} className="text-center">
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full rounded-lg mb-2"
                    />
                  ) : (
                    <div
                      className="w-full h-40 rounded-lg mb-2 flex items-center justify-center"
                      style={{ backgroundColor: "#1F1F1F" }}
                    >
                      <span className="text-gray-400">Sem foto</span>
                    </div>
                  )}
                  <p className="text-white text-sm font-semibold">
                    {actor.name}
                  </p>
                  <p className="text-gray-400 text-xs">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
