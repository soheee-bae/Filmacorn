import { Movie } from "@/interfaces/movie";
import Link from "next/link";
import Button from "../Button/Button";
import CarouselCard from "../CarouselCard/CarouselCard";
import styles from "./SearchResultContent.module.scss";

export interface SearchResultContentProps {
  search: string;
  moviesList: Movie[];
}

export default function SearchResultContent(props: SearchResultContentProps) {
  const { search = "", moviesList } = props;

  const results = moviesList.filter(
    (movies) =>
      movies.original_title.toLowerCase().includes(search) ||
      movies.title.toLowerCase().includes(search)
  );

  return (
    <div className={styles.searchResultContent}>
      <div className={styles.searchResultNames}>
        {results?.map((data: Movie) => {
          return (
            <Button variant="text-outlined">
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
