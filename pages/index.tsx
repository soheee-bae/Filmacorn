import { FullData, Genre, MovieDetail } from "@/interfaces/db_interfaces";
import { GetServerSideProps } from "next";
import { API_KEY, TMDB_EXTRA, TMDB_REQUEST_URL } from "@/config/index";
import HomeList from "@/components/HomeList/HomeList";
import styles from "./Home.module.scss";
import HomeMain from "@/components/HomeMain/HomeMain";

interface APIProps {
  SpotLights: FullData;
  PopularMovies: FullData;
  UpcomingMovies: FullData;
  TopRatedMovies: FullData;
  ThrillerMovies: FullData;
  FamilyMovies: FullData;
  WesternMovies: FullData;
  AnimationMovies: FullData;
  MainMovieInfo: MovieDetail;
  MainMovieVideos: any;
  Genre: Genre[];
}

export default function Home(props: APIProps) {
  const {
    SpotLights,
    PopularMovies,
    UpcomingMovies,
    TopRatedMovies,
    ThrillerMovies,
    FamilyMovies,
    WesternMovies,
    AnimationMovies,
    MainMovieInfo,
    MainMovieVideos,
    Genre,
  } = props;

  const lists = [
    {
      title: "Spotlight",
      data: SpotLights.results,
    },
    {
      title: "Popular Movies",
      data: PopularMovies.results,
    },
    {
      title: "Upcoming Movies",
      data: UpcomingMovies.results,
    },
    {
      title: "Top rated Movies",
      data: TopRatedMovies.results,
    },
    {
      title: "Thriller",
      data: ThrillerMovies.results,
    },
    {
      title: "Family",
      data: FamilyMovies.results,
    },
    {
      title: "Western",
      data: WesternMovies.results,
    },
    {
      title: "Animation",
      data: AnimationMovies.results,
    },
  ];
  return (
    <div className={styles.homeContainer}>
      <HomeMain mainMovie={MainMovieInfo} mainMovieVideo={MainMovieVideos} />
      <HomeList categories={lists} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  /* SpotLight */
  const SpotLightsData = await fetch(
    `${TMDB_REQUEST_URL}/trending/all/day${API_KEY}&include_adult=false&with_original_language=en`
  );
  const SpotLights = await SpotLightsData.json();

  /* Popular */
  const PopularMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/movie/popular${API_KEY}${TMDB_EXTRA}&include_adult=false&with_original_language=en`
  );
  const PopularMovies = await PopularMoviesData.json();

  /* Upcoming */
  const UpcomingMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/movie/upcoming${API_KEY}${TMDB_EXTRA}&include_adult=false&with_original_language=en`
  );
  const UpcomingMovies = await UpcomingMoviesData.json();

  /* TopRated */
  const TopRatedMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/movie/top_rated${API_KEY}${TMDB_EXTRA}&include_adult=false&with_original_language=en`
  );
  const TopRatedMovies = await TopRatedMoviesData.json();

  /* Thriller */
  const ThrillerMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=53&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const ThrillerMovies = await ThrillerMoviesData.json();

  /* Family */
  const FamilyMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=10751&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const FamilyMovies = await FamilyMoviesData.json();

  /* Western */
  const WesternMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=37&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const WesternMovies = await WesternMoviesData.json();

  /* Animation */
  const AnimationMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=16&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const AnimationMovies = await AnimationMoviesData.json();

  /* Main Movie */
  const MainMovie = PopularMovies.results[0];
  const MainMovieData = await fetch(
    `${TMDB_REQUEST_URL}/movie/${MainMovie.id}${API_KEY}&language=en-US`
  );
  const MainMovieInfo = await MainMovieData.json();

  const MainMovieVideoData = await fetch(
    `${TMDB_REQUEST_URL}/movie/${MainMovie.id}/videos${API_KEY}`
  );
  const MainMovieVideo = await MainMovieVideoData.json();
  const MainMovieVideos = MainMovieVideo.results;

  /* Genre */
  const GenreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const Genres = await GenreData.json();
  const Genre = Genres.genres;

  return {
    props: {
      SpotLights,
      PopularMovies,
      UpcomingMovies,
      TopRatedMovies,
      ThrillerMovies,
      FamilyMovies,
      WesternMovies,
      AnimationMovies,
      MainMovieInfo,
      MainMovieVideos,
      Genre,
    },
  };
};
