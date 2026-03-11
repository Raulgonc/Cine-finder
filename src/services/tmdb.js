const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`
  )
  const data = await response.json()
  return data.results
}

export async function getWatchProviders(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
  )
  const data = await response.json()
  return data.results?.BR?.flatrate || []
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`
  )
  const data = await response.json()
  return data.results
}

export async function getWatchProviders(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
  )
  const data = await response.json()
  return data.results?.BR?.flatrate || []
}

export async function getMoviesByMood(genreIds) {
  const genres = genreIds.join(',')
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres}&language=pt-BR&sort_by=popularity.desc`
  )
  const data = await response.json()
  return data.results
}