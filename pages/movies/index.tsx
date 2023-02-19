import React from "react";
import { GetServerSideProps } from "next";
import { API_KEY, TMDB_REQUEST_URL, TMDB_EXTRA } from "@/config/index";
import { FullData, Movie } from "@/interfaces/movie";

import styles from "./Movies.module.scss";
import CategorySidebar from "@/components/CategorySidebar/CategorySidebar";
import { Genre } from "@/interfaces/basic";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";

interface MoviesProps {
  AllMovies: FullData;
  Genre: Genre[];
}

export default function Movies(props: MoviesProps) {
  const { AllMovies, Genre } = props;

  return (
    <MoviesLayout Genre={Genre}>
      <h1>hello!! from all movies page</h1>
    </MoviesLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  /* Genre */
  const GenreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const Genres = await GenreData.json();
  const Genre = Genres.genres;

  const AllMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/movie/latest${API_KEY}&language=en-US`
  );
  const AllMovies = await AllMoviesData.json();

  return {
    props: { AllMovies, Genre },
  };
};
