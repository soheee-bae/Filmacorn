import React, { MouseEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { LeftArrow } from "@/icons/index";
import { API_KEY, TMDB_REQUEST_URL, TMDB_EXTRA } from "@/config/index";
import { getCategoryData } from "@/helpers/getCategoryData";
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
      <div className={styles.container}>
        <div className={styles.seeAllHeader}>
          {isLoading ? <LoadingSpinner /> : <LeftArrow onClick={handleClick} />}
          <p className={styles.seeAllTitle}>{categoryData.title}</p>
        </div>
        <div className={styles.content}>
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

  const categoryData = await getCategoryData(`${categoryTitle}` || null);

  let movieData: Movie[] = [];

  if (categoryData?.specific) {
    const MoviesData = await fetch(
      `${TMDB_REQUEST_URL}${categoryData?.link}${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${categoryData?.categoryId}&with_watch_monetization_types=flatrate&with_original_language=en`
    );
    const Movies = await MoviesData.json();
    movieData = Movies.results;
  } else {
    const MoviesData = await fetch(
      `${TMDB_REQUEST_URL}${categoryData?.link}${API_KEY}${TMDB_EXTRA}&include_adult=false&with_original_language=en`
    );
    const Movies = await MoviesData.json();
    movieData = Movies.results;
  }

  /* Genre */
  const genreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const genres = await genreData.json();
  const genre = genres.genres;

  return {
    props: {
      categoryData,
      movieData,
      genre,
    },
  };
};
