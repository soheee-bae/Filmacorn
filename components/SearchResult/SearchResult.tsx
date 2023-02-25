import { InfoCircle } from "@/icons/index";
import styles from "./SearchResult.module.scss";

export interface SearchResultProps {
  search: string;
}

export default function SearchResult(props: SearchResultProps) {
  const { search = "" } = props;
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
        </div>
      )}
    </div>
  );
}
