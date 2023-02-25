import styles from "./SearchResult.module.scss";

export interface SearchResultContentProps {
  search: string;
}

export default function SearchResultContent(props: SearchResultContentProps) {
  const { search = "" } = props;

  return <div className={styles.searchResultContent}></div>;
}
