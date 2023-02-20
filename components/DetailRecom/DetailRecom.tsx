import Link from "next/link";

import { Movie } from "@/interfaces/movie";
import CarouselCard from "@/components/CarouselCard/CarouselCard";
import styles from "./DetailRecom.module.scss";

interface DetailRecomProps {
  recommendations: Movie[];
}

export default function DetailRecom(props: DetailRecomProps) {
  const { recommendations } = props;
  const slicedRecomm = recommendations.slice(0, 10);

  return (
    <div className={styles.detailRecomContainer}>
      <p className={styles.detailRecomTitle}>You Might Also Like</p>
      <hr />
      <div className={styles.detailRecomContent}>
        {slicedRecomm?.map((data: Movie) => {
          return (
            <Link href={`/details/${data.id}`} key={data.id}>
              <CarouselCard key={data.id} info={data} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
