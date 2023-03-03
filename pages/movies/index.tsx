import React, { useState } from "react";
import { GetServerSideProps } from "next";

import { fetchGenre } from "@/helpers/handleGenre";
import { Genre } from "@/interfaces/basic";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";
import LoadMoreContent from "@/components/LoadMoreContent/LoadMoreContent";
import MoviesHeader from "@/components/MoviesHeader/MoviesHeader";

import styles from "./Movies.module.scss";

interface MoviesProps {
  genre: Genre[];
}

export default function Movies(props: MoviesProps) {
  const { genre } = props;
  const [sorting, setSorting] = useState("Sort By");

  return (
    <MoviesLayout genre={genre}>
      <div className={styles.moviesContainer}>
        <MoviesHeader
          genre={genre}
          title="All Movies"
          sorting={sorting}
          setSorting={setSorting}
        />
        <LoadMoreContent sorting={sorting} setSorting={setSorting} />
      </div>
    </MoviesLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const genre = await fetchGenre();

  return {
    props: { genre },
  };
};
