import React from "react";
import { GetStaticProps } from "next";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { FullData } from "@/interfaces/movie";
import { Genre } from "@/interfaces/basic";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";

import styles from "./Movies.module.scss";
import LoadMoreContent from "@/components/LoadMoreContent/LoadMoreContent";

interface MoviesProps {
  allMovies: FullData;
  genre: Genre[];
}

export default function Movies(props: MoviesProps) {
  const { allMovies, genre } = props;
  const movies = allMovies.results;

  return (
    <MoviesLayout genre={genre}>
      <div className={styles.moviesContainer}>
        <div className={styles.moviesHeader}>
          <p className={styles.moviesTitle}>All Movies</p>
        </div>
        <LoadMoreContent defaultMovies={movies} />
      </div>
    </MoviesLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  /* Genre */
  const genreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const genres = await genreData.json();
  const genre = genres.genres;

  const allMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/movie/popular${API_KEY}&language=en-US&page=1`
  );
  const allMovies = await allMoviesData.json();

  return {
    props: { allMovies, genre },
  };
};
