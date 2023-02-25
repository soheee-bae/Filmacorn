import { Dispatch } from "react";
import { Genre } from "@/interfaces/basic";

import styles from "./MoviesHeader.module.scss";
import CategoryDropdown from "@/components/CategoryDropdown/CategoryDropdown";
import SortingDropdown from "@/components/SortingDropdown/SortingDropdown";

interface MoviesHeaderProps {
  genre: Genre[];
  title: string;
  sorting: string;
  setSorting: Dispatch<string>;
}

export default function MoviesHeader(props: MoviesHeaderProps) {
  const { genre, title, sorting, setSorting } = props;

  return (
    <div className={styles.moviesHeader}>
      <div className={styles.moviesInnerHeader}>
        <p className={styles.moviesTitle}>{title}</p>
        <CategoryDropdown genre={genre} />
        {/* <SortingDropdown sorting={sorting} setSorting={setSorting} /> */}
      </div>
    </div>
  );
}
