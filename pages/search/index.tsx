import React, { useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import useBreakpoint from "@/hooks/useBreakpoint";
import { API_KEY, TMDB_EXTRA, TMDB_REQUEST_URL } from "@/config/index";
import { Movie } from "@/interfaces/movie";
import { LeftArrow } from "@/icons/index";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import SearchResult from "@/components/SearchResult/SearchResult";
import Button from "@/components/Button/Button";

import styles from "./Search.module.scss";

interface SearchProps {
  moviesList: Movie[];
}

export default function Search(props: SearchProps) {
  const { moviesList } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const brkpnt = useBreakpoint();
  const maxBrkpnt = brkpnt === "sm" || brkpnt === "md";

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push("/", undefined, { shallow: true });
  };

  const getIcon = () => {
    if (maxBrkpnt) {
      return null;
    } else {
      if (isLoading) {
        return <LoadingSpinner />;
      } else {
        return <LeftArrow onClick={handleClick} />;
      }
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchContainer}>
        <div className={styles.searchHeader}>
          {getIcon()}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="outlined"
            size="sm"
            className={styles.clear}
            onClick={() => setSearch("")}>
            clear
          </Button>
        </div>
        <SearchResult
          search={search}
          moviesList={moviesList}
          setSearch={setSearch}
        />
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

  for (let i = 1; i < 10; i++) {
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
