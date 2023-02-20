import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { FullData, Movie } from "@/interfaces/movie";
import { Genre } from "@/interfaces/basic";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";
import CarouselCard from "@/components/CarouselCard/CarouselCard";

import styles from "./Movies.module.scss";
import LoadMoreContent from "@/components/LoadMoreContent/LoadMoreContent";

interface MoviesProps {
  movies: FullData;
  genre: Genre[];
  categoryId: string;
}

export default function MoviesCategory(props: MoviesProps) {
  const { movies, genre, categoryId } = props;
  const allMovies = movies.results;

  const currentGenre = genre.find((genre) => genre.id === parseInt(categoryId));

  return (
    <MoviesLayout genre={genre}>
      <div className={styles.moviesContainer}>
        <div className={styles.moviesHeader}>
          <p className={styles.moviesTitle}>{currentGenre?.name}</p>
        </div>
        <LoadMoreContent defaultMovies={allMovies} categoryId={categoryId} />
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

  const movieData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${params?.categoryId}&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const movies = await movieData.json();

  return {
    props: { genre, movies, categoryId },
  };
};
