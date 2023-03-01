import { Dispatch } from "react";
import Link from "next/link";
import { Movie } from "@/interfaces/movie";

import Button from "@/components/Button/Button";
import CarouselCard from "@/components/CarouselCard/CarouselCard";
import styles from "./SearchResultContent.module.scss";

export interface SearchResultContentProps {
  search: string;
  setSearch: Dispatch<string>;
  moviesList: Movie[];
}

export default function SearchResultContent(props: SearchResultContentProps) {
  const { search = "", setSearch, moviesList } = props;
  const lowerCase = search.toLowerCase();

  const results = moviesList.filter(
    (movies) =>
      movies.original_title.toLowerCase().includes(lowerCase) ||
      movies.title.toLowerCase().includes(lowerCase)
  );

  return (
    <div className={styles.searchResultContent}>
      <div className={styles.searchResultNames}>
        {results?.map((data: Movie) => {
          return (
            <Button
              variant="contained-outlined"
              onClick={() => setSearch(data.title || data.original_title)}
            >
              {data.title || data.original_title}
            </Button>
          );
        })}
      </div>
      <div className={styles.searchResultCards}>
        {results?.map((data: Movie) => {
          return (
            <Link href={`/details/${data.id}`} key={data.id}>
              <CarouselCard key={data.id} info={data} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
