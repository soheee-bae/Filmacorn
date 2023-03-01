import { API_KEY, TMDB_EXTRA, TMDB_REQUEST_URL } from "@/config/index";

export const fetchMovieByType = async (link: string, page: number) => {
  const moviesData = await fetch(
    `${TMDB_REQUEST_URL}${link}${API_KEY}${TMDB_EXTRA}&include_adult=false&with_original_language=en&page=${
      page || 1
    }`
  );
  const movies = await moviesData.json();
  return movies.results;
};

export const fetchMovieByTypeUsingEnv = async (link: string, page: number) => {
  const moviesData = await fetch(
    `${TMDB_REQUEST_URL}${link}?api_key=${process.env.REACT_APP_TMDB_APIKEY}&language=en-US&page=${page}`
  );
  const movies = await moviesData.json();
  return movies.results;
};

export const fetchMovieByCategory = async (
  categoryId: number,
  page?: number
) => {
  const moviesData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${categoryId}&with_watch_monetization_types=flatrate&with_original_language=en&page=${
      page || 1
    }`
  );
  const movies = await moviesData.json();
  return movies.results;
};
