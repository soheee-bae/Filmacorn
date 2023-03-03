import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { Movie } from "@/interfaces/movie";
import { LeftArrow } from "@/icons/index";
import { fetchGenre } from "@/helpers/handleGenre";
import { fetchMovieByType } from "@/helpers/handleMovie";

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
          <Button
            variant="outlined"
            size="sm"
            className={styles.clear}
            onClick={() => setSearch("")}
          >
            clear
          </Button>
        </div>
        {moviesList.length !== 0 && (
          <SearchResult
            search={search}
            moviesList={moviesList}
            setSearch={setSearch}
          />
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const genre = await fetchGenre();

  let moviesList: Movie[] = [];

  for (let i = 1; i < 10; i++) {
    const moviesResult = await fetchMovieByType("/movie/popular", i);
    if (moviesResult) moviesList.push(...moviesResult);
  }

  return {
    props: { genre, moviesList },
  };
};
