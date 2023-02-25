import React, { useState } from "react";
import { GetStaticProps } from "next";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { Genre } from "@/interfaces/basic";
import styles from "./Search.module.scss";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { LeftArrow } from "@/icons/index";

interface SearchProps {}

export default function Search(props: SearchProps) {
  //   const {} = props;
  const [isLoading, setIsLoading] = useState(false);
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
          <input></input>
        </div>
        <div className={styles.searchContent}>Result</div>
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

  return {
    props: { genre },
  };
};
