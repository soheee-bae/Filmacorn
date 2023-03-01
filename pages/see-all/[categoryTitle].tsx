import React, { MouseEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { LeftArrow } from "@/icons/index";
import { getCategoryData } from "@/helpers/getCategoryData";
import { fetchGenre } from "@/helpers/handleGenre";
import { fetchMovieByCategory, fetchMovieByType } from "@/helpers/handleMovie";
import { CategoryData } from "@/interfaces/category";
import { Movie } from "@/interfaces/movie";
import CarouselCard from "@/components/CarouselCard/CarouselCard";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

import styles from "./SeeAll.module.scss";

interface SeeAllProps {
  categoryData: CategoryData;
  movieData: Movie[];
}

export default function SeeAll(props: SeeAllProps) {
  const { categoryData, movieData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push("/", undefined, { shallow: true });
  };

  return (
    <div className={styles.seeAll}>
      <div className={styles.seeAllContainer}>
        <div className={styles.seeAllHeader}>
          {isLoading ? <LoadingSpinner /> : <LeftArrow onClick={handleClick} />}
          <p className={styles.seeAllTitle}>{categoryData.title}</p>
        </div>
        <div className={styles.seeAllContent}>
          {movieData?.map((data: Movie) => {
            return (
              <Link href={`/details/${data.id}`} key={data.id}>
                <CarouselCard key={data.id} info={data} />;
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { categoryTitle } = context.query;

  const categoryData = await getCategoryData(`${categoryTitle}`);

  let movieData: Movie[] = [];

  if (categoryData?.specific) {
    movieData = await fetchMovieByCategory(categoryData?.categoryId || 0);
  } else {
    movieData = await fetchMovieByType(categoryData?.link || "");
  }

  const genre = await fetchGenre();

  return {
    props: {
      categoryData,
      movieData,
      genre,
    },
  };
};
