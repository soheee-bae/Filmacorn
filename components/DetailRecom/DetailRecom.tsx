import { Movie } from "@/interfaces/movie";
import styles from "./DetailRecom.module.scss";
import Link from "next/link";
import CarouselCard from "@/components/CarouselCard/CarouselCard";

interface DetailRecomProps {
  Recommendations: Movie[];
}

export default function DetailRecom(props: DetailRecomProps) {
  const { Recommendations } = props;
  const slicedRecomm = Recommendations.slice(0, 10);

  return (
    <div className={styles.detailRecomContainer}>
      <p className={styles.detailRecomTitle}>You Might Also Like</p>
      <hr />
      <div className={styles.detailRecomContent}>
        {slicedRecomm?.map((data: Movie) => {
          return (
            <Link href={`/details/${data.id}`}>
              <CarouselCard key={data.id} info={data} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
