import styles from "./CarouselCard.module.scss";
import { TMDB_IMAGE_URL } from "@/config/index";
import { Play } from "@/icons/index";
import { Movie } from "@/interfaces/movie";
import { fetchMovieVideo } from "@/helpers/handleMovie";

interface CarouselCardProps {
  info: Movie;
  width?: number;
  height?: number;
}

export default function CarouselCard(props: CarouselCardProps) {
  const { info, width, height } = props;

  const imgSrc = info?.poster_path || info?.backdrop_path;

  if (!imgSrc) {
    return null;
  }

  const handlePlay = async () => {
    const detailVideos = await fetchMovieVideo(info.id.toString());
    const detailVideo = detailVideos?.find((v: any) => v.site === "YouTube");
    window.open(`https://www.youtube.com/watch?v=${detailVideo?.key}`);
  };

  return (
    <div className={styles.carouselItem}>
      <img
        key={`${info.poster_path}`}
        alt={`${info.poster_path}`}
        src={imgSrc ? `${TMDB_IMAGE_URL}/w500${imgSrc}` : ""}
        width={width || 190}
        height={height || 285}
      />
      <div onClick={handlePlay}>
        <Play />
      </div>
      <p className={styles.imgDescription}>
        {info.title || info.original_title}
      </p>
    </div>
  );
}
