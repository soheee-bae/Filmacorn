import Link from "next/link";

import { RightArrow } from "@/icons/index";
import { Movie } from "@/interfaces/db_interfaces";
import Button from "@/components/Button/Button";
import CarouselLists from "@/components/Carousel/Carousel";

import styles from "./HomeList.module.scss";

export interface HomeListItem {
  title: string;
  data: Movie[];
}

interface HomeListProps {
  categories: HomeListItem[];
}

export default function HomeList(props: HomeListProps) {
  const { categories } = props;

  const handleSeeAll = () => {};

  return (
    <div className={styles.homeList}>
      {categories.map((category: HomeListItem) => {
        const { title, data } = category;
        return (
          <div className={styles.homeListContainer}>
            <div className={styles.homeListHeader}>
              <p className={styles.homeListTitle}>{title}</p>
              <Link href={`/see-all/${title}`}>
                <Button
                  size="sm"
                  variant="text"
                  onClick={handleSeeAll}
                  endIcon={<RightArrow />}>
                  See All
                </Button>
              </Link>
            </div>
            <CarouselLists data={data} />
          </div>
        );
      })}
    </div>
  );
}
