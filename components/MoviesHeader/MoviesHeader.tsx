import { Dispatch } from "react";
import styles from "./MoviesHeader.module.scss";
import SortingDropdown from "../SortingDropdown/SortingDropdown";

interface MoviesHeaderProps {
  title: string;
  sorting: string;
  setSorting: Dispatch<string>;
}

export default function MoviesHeader(props: MoviesHeaderProps) {
  const { title, sorting, setSorting } = props;

  return (
    <div className={styles.moviesHeader}>
      <div className={styles.moviesInnerHeader}>
        <p className={styles.moviesTitle}>{title}</p>
        <SortingDropdown sorting={sorting} setSorting={setSorting} />
      </div>
    </div>
  );
}
