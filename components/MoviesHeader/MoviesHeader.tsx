import { ReactNode } from "react";
import { Genre } from "@/interfaces/basic";
import CategorySidebar from "@/components/CategorySidebar/CategorySidebar";
import styles from "./MoviesHeader.module.scss";

interface MoviesHeaderProps {
  title: string;
}

export default function MoviesHeader(props: MoviesHeaderProps) {
  const { title } = props;

  return (
    <div className={styles.moviesHeader}>
      <p className={styles.moviesTitle}>{title}</p>
    </div>
  );
}
