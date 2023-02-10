import styles from "@/styles/CarouselImg.module.scss";
import { TMDB_IMAGE_URL } from "@/config/index";
import { Play } from "@/icons/index";

interface CarouselImgProps {
  img: any;
}

export default function CarouselImg(props: CarouselImgProps) {
  const { img } = props;

  const imgsrc = img.poster_path || img.backdrop_path;

  if (!imgsrc) {
    return null;
  }

  return (
    <div className={styles.carouselItem}>
      <img
        key={`${img.poster_path}`}
        alt={`${img.poster_path}`}
        src={imgsrc ? `${TMDB_IMAGE_URL}/w500${imgsrc}` : ""}
        width="190"
        height="285"
      />
      <Play />
      <p className={styles.imgDescription}>
        {img.title || img.original_title || img.name}
      </p>
    </div>
  );
}
