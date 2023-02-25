import React, { useState } from "react";
import { GetStaticProps } from "next";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import styles from "./Search.module.scss";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { LeftArrow } from "@/icons/index";
import SearchResult from "@/components/SearchResult/SearchResult";

interface SearchProps {}

export default function Search(props: SearchProps) {
  //   const {} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  console.log(search);

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
        <SearchResult search={search} />
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
