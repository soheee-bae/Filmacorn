import { API_KEY, TMDB_EXTRA, TMDB_REQUEST_URL } from "@/config/index";

export const fetchMovieByType = async (link: string, page?: number) => {
  const moviesData = await fetch(
    `${TMDB_REQUEST_URL}${link}${API_KEY}${TMDB_EXTRA}&include_adult=false&with_original_language=en&page=${
      page || 1
    }`
  );
  const movies = await moviesData.json();
  return movies.results;
};

export const fetchMovieByTypeUsingEnv = async (link: string, page?: number) => {
  const moviesData = await fetch(
    `${TMDB_REQUEST_URL}${link}?api_key=${
      process.env.REACT_APP_TMDB_APIKEY
    }&language=en-US&page=${page || 1}`
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

export const fetchSimilarMovie = async (detailId: string) => {
  const similar = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}/similar${API_KEY}&language=en-US&page=1`
  );
  const similarData = await similar.json();
  return similarData.results;
};

export const fetchMovieDetail = async (detailId: string) => {
  const movieDetail = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}${API_KEY}&language=en-US`
  );
  const movieDetails = await movieDetail.json();
  return movieDetails;
};

export const fetchMovieVideo = async (detailId: string) => {
  const mainMovieVideoData = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}/videos${API_KEY}`
  );
  const mainMovieVideo = await mainMovieVideoData.json();
  return mainMovieVideo.results;
};

export const fetchMovieCast = async (detailId: string) => {
  const cast = await fetch(
    `${TMDB_REQUEST_URL}/movie/${detailId}/credits${API_KEY}&language=en-US`
  );
  const casts = await cast.json();
  return casts;
};
