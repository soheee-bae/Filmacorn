import Link from "next/link";

import { Genre } from "@/interfaces/basic";
import Button from "@/components/Button/Button";
import styles from "./CategorySidebar.module.scss";
import { useRouter } from "next/router";

interface CategorySidebarProps {
  genre: Genre[];
}

export default function CategorySidebar(props: CategorySidebarProps) {
  const { genre } = props;
  const { query } = useRouter();

  return (
    <div className={styles.categorySidebar}>
      <Link href={`/movies`}>
        <Button variant="text-outlined" selected={!query.categoryId}>
          All Movies
        </Button>
      </Link>
      {genre.map((genre) => {
        const selected = Number(query.categoryId) === genre?.id;
        return (
          <Link href={`/movies/${genre.id}`} key={genre.id}>
            <Button variant="text-outlined" selected={selected}>
              {genre.name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
