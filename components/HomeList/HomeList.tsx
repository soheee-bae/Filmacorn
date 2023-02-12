import Link from "next/link";

import { RightArrow } from "@/icons/index";
import { Movie } from "@/interfaces/db_interfaces";
import Button from "@/components/Button/Button";
import styles from "./HomeList.module.scss";

interface HomeListItem {
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
            {/* <Carousel
              ssr={true}
              responsive={responsive}
              className={styles.carousel}>
              {data?.map((img: Movie | Tv) => {
                const categoryData = getDataWithCategorytitle(
                  `${title}` || null
                );
                const mediaType = categoryData && getLinkUrl(categoryData, img);
                return (
                  <Link href={`/details/${mediaType}/${img.id}`}>
                    <CarouselImg key={img.id} img={img} />
                  </Link>
                );
              })}
            </Carousel> */}
          </div>
        );
      })}
    </div>
  );
}
