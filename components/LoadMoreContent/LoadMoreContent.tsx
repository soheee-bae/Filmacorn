import React, { useState, useEffect, Dispatch } from "react";
import Link from "next/link";

import {
  fetchMovieByCategory,
  fetchMovieByTypeUsingEnv,
} from "@/helpers/handleMovie";
import { Movie } from "@/interfaces/movie";
import CarouselCard from "@/components/CarouselCard/CarouselCard";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

import styles from "./LoadMoreContent.module.scss";

interface LoadMoreContentProps {
  categoryId?: number;
  sorting: string;
  setSorting: Dispatch<string>;
}

export default function LoadMoreContent(props: LoadMoreContentProps) {
  const { categoryId, sorting = "Latest", setSorting } = props;
  const [data, setData] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      let results = [];
      if (!categoryId) {
        results = await fetchMovieByTypeUsingEnv("/movie/popular", page);
      } else {
        results = await fetchMovieByCategory(categoryId, page);
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

  useEffect(() => {
    const tempData = [...data];
    if (sorting === "Alphabetical") {
      tempData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sorting === "Reverse Alpha") {
      tempData.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      tempData.sort(
        (a, b) => +new Date(a.release_date) - +new Date(b.release_date)
      );
    }
    setData(tempData);
  }, [sorting]);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      setSorting("Sort By");
      fetchData();
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [data]);

  return (
    <div className={styles.loadMoreContent}>
      {data?.map((data: any) => {
        return (
          <Link
            href={`/details/${data?.id}`}
            key={data?.id}
            className={styles.loadMoreItem}>
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
