import { GetServerSideProps } from "next";
import { FullData, MovieDetail } from "@/interfaces/movie";
import { Video } from "@/interfaces/video";
import { API_KEY, TMDB_EXTRA, TMDB_REQUEST_URL } from "@/config/index";

import { fetchGenre } from "@/helpers/handleGenre";
import HomeList from "@/components/HomeList/HomeList";
import HomeMain from "@/components/HomeMain/HomeMain";
import styles from "./Home.module.scss";

interface APIProps {
  spotLights: FullData;
  popularMovies: FullData;
  upcomingMovies: FullData;
  topRatedMovies: FullData;
  thrillerMovies: FullData;
  familyMovies: FullData;
  westernMovies: FullData;
  animationMovies: FullData;
  mainMovieInfo: MovieDetail;
  mainMovieVideos: Video[];
}

export default function Home(props: APIProps) {
  const {
    spotLights,
    popularMovies,
    upcomingMovies,
    topRatedMovies,
    thrillerMovies,
    familyMovies,
    westernMovies,
    animationMovies,
    mainMovieInfo,
    mainMovieVideos,
  } = props;

  const lists = [
    {
      title: "Spotlight",
      data: spotLights.results,
    },
    {
      title: "Popular Movies",
      data: popularMovies.results,
    },
    {
      title: "Upcoming Movies",
      data: upcomingMovies.results,
    },
    {
      title: "Top rated Movies",
      data: topRatedMovies.results,
    },
    {
      title: "Thriller",
      data: thrillerMovies.results,
    },
    {
      title: "Family",
      data: familyMovies.results,
    },
    {
      title: "Western",
      data: westernMovies.results,
    },
    {
      title: "Animation",
      data: animationMovies.results,
    },
  ];
  return (
    <div className={styles.homeContainer}>
      <HomeMain mainMovie={mainMovieInfo} mainMovieVideo={mainMovieVideos} />
      <HomeList categories={lists} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  /* SpotLight */
  const spotLightsData = await fetch(
    `${TMDB_REQUEST_URL}/trending/all/day${API_KEY}&include_adult=false&with_original_language=en`
  );
  const spotLights = await spotLightsData.json();

  /* Popular */
  const popularMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/movie/popular${API_KEY}${TMDB_EXTRA}&include_adult=false&with_original_language=en`
  );
  const popularMovies = await popularMoviesData.json();

  /* Upcoming */
  const upcomingMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/movie/upcoming${API_KEY}${TMDB_EXTRA}&include_adult=false&with_original_language=en`
  );
  const upcomingMovies = await upcomingMoviesData.json();

  /* TopRated */
  const topRatedMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/movie/top_rated${API_KEY}${TMDB_EXTRA}&include_adult=false&with_original_language=en`
  );
  const topRatedMovies = await topRatedMoviesData.json();

  /* Thriller */
  const thrillerMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=53&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const thrillerMovies = await thrillerMoviesData.json();

  /* Family */
  const familyMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10751&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const familyMovies = await familyMoviesData.json();

  /* Western */
  const westernMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=37&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const westernMovies = await westernMoviesData.json();

  /* Animation */
  const animationMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=16&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const animationMovies = await animationMoviesData.json();

  /* Main Movie */
  const mainMovie = popularMovies.results[0];
  const mainMovieData = await fetch(
    `${TMDB_REQUEST_URL}/movie/${mainMovie.id}${API_KEY}&language=en-US`
  );
  const mainMovieInfo = await mainMovieData.json();

  const mainMovieVideoData = await fetch(
    `${TMDB_REQUEST_URL}/movie/${mainMovie.id}/videos${API_KEY}`
  );
  const mainMovieVideo = await mainMovieVideoData.json();
  const mainMovieVideos = mainMovieVideo.results;

  const genre = await fetchGenre();

  return {
    props: {
      spotLights,
      popularMovies,
      upcomingMovies,
      topRatedMovies,
      thrillerMovies,
      familyMovies,
      westernMovies,
      animationMovies,
      mainMovieInfo,
      mainMovieVideos,
      genre,
    },
  };
};
