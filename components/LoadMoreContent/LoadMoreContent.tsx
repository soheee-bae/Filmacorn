import React, { useState, useEffect } from "react";
import styles from "./LoadMoreContent.module.scss";
import Link from "next/link";
import CarouselCard from "../CarouselCard/CarouselCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Movie } from "@/interfaces/movie";
import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";

interface LoadMoreContentProps {
  defaultMovies: Movie[];
  categoryId?: string;
}

export default function LoadMoreContent(props: LoadMoreContentProps) {
  const { defaultMovies, categoryId } = props;
  const [data, setData] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      let results = [];
      if (!categoryId) {
        const allMoviesData = await fetch(
          `${TMDB_REQUEST_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_APIKEY}&language=en-US&page=${page}`
        );
        const allMovies = await allMoviesData.json();
        results = allMovies.results;
      } else {
        const movieData = await fetch(
          `${TMDB_REQUEST_URL}/discover/movie${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${categoryId}&with_watch_monetization_types=flatrate&with_original_language=en&page=${page}`
        );
        const movies = await movieData.json();
        results = movies.results;
      }

      const newDatas = [...data, ...results];
      if (page === 20) setHasMore(false);

      setData(newDatas);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (hasMore) {
      setIsLoading(true);
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
  }, [categoryId]);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (data.length === 0) fetchData();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [data]);

  return (
    <div className={styles.loadMoreContent}>
      {data?.map((data: any) => {
        return (
          <Link href={`/details/${data?.id}`} key={data?.id}>
            <CarouselCard key={data?.id} info={data} />
          </Link>
        );
      })}
      {isLoading && (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
