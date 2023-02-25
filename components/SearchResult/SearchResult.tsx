import { Dispatch } from "react";
import { InfoCircle } from "@/icons/index";
import { Movie } from "@/interfaces/movie";

import SearchResultContent from "@/components/SearchResultContent/SearchResultContent";
import styles from "./SearchResult.module.scss";

export interface SearchResultProps {
  search: string;
  setSearch: Dispatch<string>;
  moviesList: Movie[];
}

export default function SearchResult(props: SearchResultProps) {
  const { search = "", setSearch, moviesList } = props;
  const lessThan2 = search.length === 1;
  const noSearch = search === "";

  return (
    <div className={styles.searchResult}>
      {lessThan2 ? (
        <div className={styles.lessThan2}>
          <InfoCircle />
          <p>Please enter at least 2 characters to begin searching</p>
        </div>
      ) : (
        <div>
          {!noSearch && (
            <div className={styles.searchResultContent}>
              <p> Results</p>
              <hr />
              <SearchResultContent
                search={search}
                setSearch={setSearch}
                moviesList={moviesList}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
