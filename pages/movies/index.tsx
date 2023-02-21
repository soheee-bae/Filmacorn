import React, { useState } from "react";
import { GetStaticProps } from "next";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { Genre } from "@/interfaces/basic";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";
import LoadMoreContent from "@/components/LoadMoreContent/LoadMoreContent";

import styles from "./Movies.module.scss";
import MoviesHeader from "@/components/MoviesHeader/MoviesHeader";

interface MoviesProps {
  genre: Genre[];
}

export default function Movies(props: MoviesProps) {
  const { genre } = props;
  const [sorting, setSorting] = useState("Latest");

  return (
    <MoviesLayout genre={genre}>
      <div className={styles.moviesContainer}>
        <MoviesHeader
          title="All Movies"
          sorting={sorting}
          setSorting={setSorting}
        />
        <LoadMoreContent />
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

  return {
    props: { genre },
  };
};
