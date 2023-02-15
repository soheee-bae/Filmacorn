import { Cast, MovieDetail } from "@/interfaces/movie";
import { Video } from "@/interfaces/video";
import MainBackground from "@/components/MainBackground/MainBackground";
import DetailRecom from "@/components/DetailRecom/DetailRecom";
import DetailHeader from "@/components/DetailHeader/DetailHeader";
import styles from "./DetailMain.module.scss";

interface DetailMainProps {
  movieDetail: MovieDetail;
  cast: Cast[];
  director: Cast[];
  video: Video[];
}

export default function DetailMain(props: DetailMainProps) {
  const { movieDetail, cast, director, video } = props;

  const imgSrc = movieDetail.backdrop_path || movieDetail.poster_path;

  return (
    <div className={styles.detailMainContainer}>
      <MainBackground imgSrc={imgSrc} />
      <DetailHeader
        movieDetail={movieDetail}
        cast={cast}
        director={director}
        video={video}
      />
      <DetailRecom />
    </div>
  );
}
