import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { Genre } from "@/interfaces/basic";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";
import LoadMoreContent from "@/components/LoadMoreContent/LoadMoreContent";

import styles from "./Movies.module.scss";
import MoviesHeader from "@/components/MoviesHeader/MoviesHeader";

interface MoviesProps {
  genre: Genre[];
  categoryId: string;
}

export default function MoviesCategory(props: MoviesProps) {
  const { genre, categoryId } = props;

  const currentGenre = genre.find((genre) => genre.id === parseInt(categoryId));

  return (
    <MoviesLayout genre={genre}>
      <div className={styles.moviesContainer}>
        <MoviesHeader title={currentGenre?.name || ""} />
        <LoadMoreContent categoryId={categoryId} />
      </div>
    </MoviesLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  /* Genre */
  const genreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const genres = await genreData.json();
  const genre = genres.genres;

  const paths = genre.map((genre: Genre) => ({
    params: { categoryId: genre.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = params?.categoryId;
  /* Genre */
  const genreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const genres = await genreData.json();
  const genre = genres.genres;

  return {
    props: { genre, categoryId },
  };
};
