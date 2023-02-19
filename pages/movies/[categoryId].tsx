import React from "react";
import { GetServerSideProps } from "next";
import { API_KEY, TMDB_REQUEST_URL, TMDB_EXTRA } from "@/config/index";
import { getCategoryData } from "@/helpers/getCategoryData";
import { Movie } from "@/interfaces/movie";

import styles from "./Movies.module.scss";
import { Genre } from "@/interfaces/basic";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";

interface MoviesProps {
  Movies: Movie[];
  Genre: Genre[];
}

export default function MoviesCategory(props: MoviesProps) {
  const { Movies, Genre } = props;

  return <MoviesLayout Genre={Genre}>hello</MoviesLayout>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { categoryId } = context.query;

  /* Genre */
  const GenreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const Genres = await GenreData.json();
  const Genre = Genres.genres;

  const MoviesData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${categoryId}&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const Movies = await MoviesData.json();

  return {
    props: { Movies, Genre },
  };
};
