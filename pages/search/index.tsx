import React, { useState } from "react";
import { GetStaticProps } from "next";

import { API_KEY, TMDB_EXTRA, TMDB_REQUEST_URL } from "@/config/index";
import styles from "./Search.module.scss";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { LeftArrow } from "@/icons/index";
import SearchResult from "@/components/SearchResult/SearchResult";
import { Movie } from "@/interfaces/movie";

interface SearchProps {
  moviesList: Movie[];
}

export default function Search(props: SearchProps) {
  const { moviesList } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push("/", undefined, { shallow: true });
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchContainer}>
        <div className={styles.searchHeader}>
          {isLoading ? <LoadingSpinner /> : <LeftArrow onClick={handleClick} />}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <SearchResult search={search} moviesList={moviesList} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  /* Genre */
  const genreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const genres = await genreData.json();
  const genre = genres.genres;

  let moviesList: Movie[] = [];

  for (let i = 1; i < 6; i++) {
    const movieData = await fetch(
      `${TMDB_REQUEST_URL}/movie/popular${API_KEY}${TMDB_EXTRA}&include_adult=false&with_original_language=en&page=${i}`
    );
    const movies = await movieData.json();
    const moviesResult = movies.results;
    moviesList.push(...moviesResult);
  }

  return {
    props: { genre, moviesList },
  };
};
