import { GetServerSideProps } from "next";
import { Movie, MovieDetail } from "@/interfaces/movie";

import { fetchGenre } from "@/helpers/handleGenre";
import HomeList from "@/components/HomeList/HomeList";
import HomeMain from "@/components/HomeMain/HomeMain";
import styles from "./Home.module.scss";
import {
  fetchMovieByCategory,
  fetchMovieByType,
  fetchMovieDetail,
} from "@/helpers/handleMovie";

interface APIProps {
  spotLights: Movie[];
  popularMovies: Movie[];
  upcomingMovies: Movie[];
  topRatedMovies: Movie[];
  thrillerMovies: Movie[];
  familyMovies: Movie[];
  westernMovies: Movie[];
  animationMovies: Movie[];
  mainMovieInfo: MovieDetail;
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
  } = props;

  const lists = [
    {
      title: "Spotlight",
      data: spotLights,
    },
    {
      title: "Popular Movies",
      data: popularMovies,
    },
    {
      title: "Upcoming Movies",
      data: upcomingMovies,
    },
    {
      title: "Top rated Movies",
      data: topRatedMovies,
    },
    {
      title: "Thriller",
      data: thrillerMovies,
    },
    {
      title: "Family",
      data: familyMovies,
    },
    {
      title: "Western",
      data: westernMovies,
    },
    {
      title: "Animation",
      data: animationMovies,
    },
  ];
  return (
    <div className={styles.homeContainer}>
      <HomeMain mainMovie={mainMovieInfo} />
      <HomeList categories={lists} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const spotLights = await fetchMovieByType("/trending/all/day");
  const popularMovies = await fetchMovieByType("/movie/popular");
  const upcomingMovies = await fetchMovieByType("/movie/upcoming");
  const topRatedMovies = await fetchMovieByType("/movie/top_rated");

  const thrillerMovies = await fetchMovieByCategory(53);
  const familyMovies = await fetchMovieByCategory(10751);
  const westernMovies = await fetchMovieByCategory(37);
  const animationMovies = await fetchMovieByCategory(16);

  const mainMovie = popularMovies[0];
  const mainMovieInfo = await fetchMovieDetail(mainMovie.id);

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
      genre,
    },
  };
};
