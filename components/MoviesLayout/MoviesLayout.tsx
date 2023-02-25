import { ReactNode } from "react";
import { Genre } from "@/interfaces/basic";
import CategorySidebar from "@/components/CategorySidebar/CategorySidebar";
import styles from "./MoviesLayout.module.scss";
import useBreakpoint from "hooks/useBreakpoint";

interface MoviesLayoutProps {
  genre: Genre[];
  children: ReactNode;
}

export default function MoviesLayout(props: MoviesLayoutProps) {
  const { genre, children } = props;
  const xxxl = useBreakpoint();
  const maxWidth = xxxl === "xxxl";

  return (
    <div className={styles.moviesLayout}>
      <div className={styles.moviesContent}>
        {maxWidth && <CategorySidebar genre={genre} />}
        {children}
      </div>
    </div>
  );
}
