import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { FullData, Movie } from "@/interfaces/movie";
import { Genre } from "@/interfaces/basic";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";
import CarouselCard from "@/components/CarouselCard/CarouselCard";

import styles from "./Movies.module.scss";

interface MoviesProps {
  allMovies: FullData;
  genre: Genre[];
}

export default function Movies(props: MoviesProps) {
  const { allMovies, genre } = props;
  const movies = allMovies.results;

  return (
    <MoviesLayout genre={genre}>
      <p>All Movies</p>
      {movies?.map((data: Movie) => {
        return (
          <Link href={`/details/${data.id}`} key={data.id}>
            <CarouselCard key={data.id} info={data} />
          </Link>
        );
      })}
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
    `${TMDB_REQUEST_URL}/movie/popular${API_KEY}&language=en-US&language=en-US&page=1`
  );
  const allMovies = await allMoviesData.json();

  return {
    props: { allMovies, genre },
  };
};
