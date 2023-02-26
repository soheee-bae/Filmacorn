import React from "react";
import { GetStaticProps } from "next";
import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import styles from "./WatchList.module.scss";

interface SearchProps {}

export default function Search() {
  //   const { moviesList } = props;

  return <div className={styles.watchlist}></div>;
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
