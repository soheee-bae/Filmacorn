import { Dispatch } from "react";
import { Genre } from "@/interfaces/basic";

import styles from "./MoviesHeader.module.scss";
import CategoryDropdown from "@/components/CategoryDropdown/CategoryDropdown";
import SortingDropdown from "@/components/SortingDropdown/SortingDropdown";
import useBreakpoint from "@/hooks/useBreakpoint";

interface MoviesHeaderProps {
  genre: Genre[];
  title: string;
  sorting: string;
  setSorting: Dispatch<string>;
}

export default function MoviesHeader(props: MoviesHeaderProps) {
  const { genre, title, sorting, setSorting } = props;
  const xxxl = useBreakpoint();
  const maxWidth = xxxl === "xxxl";

  return (
    <div className={styles.moviesHeader}>
      <div className={styles.moviesInnerHeader}>
        <p className={styles.moviesTitle}>{title}</p>
        {!maxWidth ? (
          <CategoryDropdown genre={genre} />
        ) : (
          <SortingDropdown sorting={sorting} setSorting={setSorting} />
        )}
      </div>
    </div>
  );
}
