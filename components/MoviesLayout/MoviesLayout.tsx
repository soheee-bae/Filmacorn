import { ReactNode } from "react";
import { Genre } from "@/interfaces/basic";
import CategorySidebar from "@/components/CategorySidebar/CategorySidebar";
import styles from "./MoviesLayout.module.scss";

interface MoviesLayoutProps {
  genre: Genre[];
  children: ReactNode;
}

export default function MoviesLayout(props: MoviesLayoutProps) {
  const { genre, children } = props;

  return (
    <div className={styles.moviesLayout}>
      <CategorySidebar genre={genre} />
      {children}
    </div>
  );
}
