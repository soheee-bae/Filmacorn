import { Genre } from "@/interfaces/basic";
import Link from "next/link";
import Button from "@/components/Button/Button";
import styles from "./CategorySidebar.module.scss";

interface CategorySidebarProps {
  Genre: Genre[];
}

export default function CategorySidebar(props: CategorySidebarProps) {
  const { Genre } = props;

  return (
    <div className={styles.categorySidebar}>
      {Genre.map((genre) => (
        <Link href={`/movies/${genre.id}`} key={genre.id}>
          <Button variant="text-outlined">{genre.name}</Button>
        </Link>
      ))}
    </div>
  );
}
