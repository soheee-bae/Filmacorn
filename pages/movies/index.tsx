import React from "react";
import { GetStaticProps } from "next";
import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { FullData, Movie } from "@/interfaces/movie";

import styles from "./Movies.module.scss";
import CategorySidebar from "@/components/CategorySidebar/CategorySidebar";
import { Genre } from "@/interfaces/basic";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";
import Link from "next/link";
import CarouselCard from "@/components/CarouselCard/CarouselCard";

interface MoviesProps {
  AllMovies: FullData;
  Genre: Genre[];
}

export default function Movies(props: MoviesProps) {
  const { AllMovies, Genre } = props;
  const movies = AllMovies.results;

  return (
    <MoviesLayout Genre={Genre}>
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
  const GenreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const Genres = await GenreData.json();
  const Genre = Genres.genres;

  const AllMoviesData = await fetch(
    `${TMDB_REQUEST_URL}/movie/popular${API_KEY}&language=en-US&language=en-US&page=1`
  );
  const AllMovies = await AllMoviesData.json();

  return {
    props: { AllMovies, Genre },
  };
};
