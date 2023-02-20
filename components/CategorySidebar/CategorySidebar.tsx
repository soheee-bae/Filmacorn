import Link from "next/link";

import { Genre } from "@/interfaces/basic";
import Button from "@/components/Button/Button";
import styles from "./CategorySidebar.module.scss";

interface CategorySidebarProps {
  genre: Genre[];
}

export default function CategorySidebar(props: CategorySidebarProps) {
  const { genre } = props;

  return (
    <div className={styles.categorySidebar}>
      <Link href={`/movies`}>
        <Button variant="text-outlined">All Movies</Button>
      </Link>
      {genre.map((genre) => (
        <Link href={`/movies/${genre.id}`} key={genre.id}>
          <Button variant="text-outlined">{genre.name}</Button>
        </Link>
      ))}
    </div>
  );
}
