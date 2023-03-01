import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";

export const fetchGenre = async () => {
  const genreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const genres = await genreData.json();
  return genres.genres;
};
