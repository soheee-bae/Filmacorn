import { InfoCircle } from "@/icons/index";
import { Movie } from "@/interfaces/movie";
import SearchResultContent from "../SearchResultContent/SearchResultContent";
import styles from "./SearchResult.module.scss";

export interface SearchResultProps {
  search: string;
  moviesList: Movie[];
}

export default function SearchResult(props: SearchResultProps) {
  const { search = "", moviesList } = props;
  const lessThan2 = search.length === 1;

  return (
    <div className={styles.searchResult}>
      {lessThan2 ? (
        <div className={styles.lessThan2}>
          <InfoCircle />
          <p>Please enter at least 2 characters to begin searching</p>
        </div>
      ) : (
        <div className={styles.searchResultContent}>
          <p> Results</p>
          <hr />
          <SearchResultContent search={search} moviesList={moviesList} />
        </div>
      )}
    </div>
  );
}
