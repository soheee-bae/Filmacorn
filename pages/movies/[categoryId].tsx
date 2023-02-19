import React from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { API_KEY, TMDB_REQUEST_URL, TMDB_EXTRA } from "@/config/index";
import { getCategoryData } from "@/helpers/getCategoryData";
import { FullData, Movie } from "@/interfaces/movie";

import styles from "./Movies.module.scss";
import { Genre } from "@/interfaces/basic";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";
import Link from "next/link";
import CarouselCard from "@/components/CarouselCard/CarouselCard";

interface MoviesProps {
  Movies: FullData;
  Genre: Genre[];
}

export default function MoviesCategory(props: MoviesProps) {
  const { Movies, Genre } = props;
  const movies = Movies.results;

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

export const getStaticPaths: GetStaticPaths = async () => {
  /* Genre */
  const GenreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const Genres = await GenreData.json();
  const Genre = Genres.genres;

  const paths = Genre.map((genre: Genre) => ({
    params: { categoryId: genre.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  /* Genre */
  const GenreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const Genres = await GenreData.json();
  const Genre = Genres.genres;

  const MovieData = await fetch(
    `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${params?.categoryId}&with_watch_monetization_types=flatrate&with_original_language=en`
  );
  const Movies = await MovieData.json();

  return {
    props: { Genre, Movies },
  };
};
