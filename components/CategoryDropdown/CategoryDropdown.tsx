import { Genre } from "@/interfaces/basic";
import Link from "next/link";
import Button from "@/components/Button/Button";
import styles from "./CategoryDropdown.module.scss";
import { useState } from "react";
import { ChevronDown } from "@/icons/index";
import { useRouter } from "next/router";

interface CategoryDropdownProps {
  genre: Genre[];
}

export default function CategoryDropdown(props: CategoryDropdownProps) {
  const { genre } = props;
  const { query } = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.categoryDropdown}>
      <Button
        className={styles.categoryDropdownButton}
        variant="outlined"
        size="lg"
        onClick={() => setOpen(!open)}>
        Select Category <ChevronDown />
      </Button>
      <div className={styles.categoryDropdownList} data-open={open}>
        {genre?.map((category, index) => {
          const selected = Number(query.categoryId) === category?.id;
          return (
            <Link href={`/movies/${category.id}`} key={index}>
              <Button
                key={category.id}
                variant="text-outlined"
                selected={selected}>
                {category.name}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
