import { Movie } from "@/interfaces/movie";
import CarouselLists from "../Carousel/Carousel";
import styles from "./DetailRecom.module.scss";
interface DetailRecomProps {
  Recommendations: Movie[];
}

export default function DetailRecom(props: DetailRecomProps) {
  const { Recommendations } = props;
  return (
    <div className={styles.detailRecomContainer}>
      <p className={styles.detailRecomTitle}>You Might Also Like</p>
      <hr />
      <CarouselLists data={Recommendations} />
    </div>
  );
}
