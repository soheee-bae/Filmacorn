import React, { useState } from "react";
import { GetServerSideProps } from "next";

import { Genre } from "@/interfaces/basic";
import { fetchGenre } from "@/helpers/handleGenre";
import MoviesLayout from "@/components/MoviesLayout/MoviesLayout";
import LoadMoreContent from "@/components/LoadMoreContent/LoadMoreContent";
import MoviesHeader from "@/components/MoviesHeader/MoviesHeader";

import styles from "./Movies.module.scss";

interface MoviesProps {
  genre: Genre[];
  categoryId: number;
  currentGenre: Genre;
}

export default function MoviesCategory(props: MoviesProps) {
  const { genre, categoryId, currentGenre } = props;
  const [sorting, setSorting] = useState("Sort By");

  return (
    <MoviesLayout genre={genre}>
      <div className={styles.moviesContainer}>
        <MoviesHeader
          genre={genre}
          title={currentGenre.name}
          sorting={sorting}
          setSorting={setSorting}
        />
        <LoadMoreContent
          categoryId={categoryId}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
    </MoviesLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { categoryId } = context.query;
  const genre = await fetchGenre();
  const currentGenre = genre.find((genre: Genre) => {
    return genre.id === Number(categoryId);
  });

  return {
    props: { genre, categoryId, currentGenre },
  };
};
