import { Cast, Movie, MovieDetail } from "@/interfaces/movie";
import { Video } from "@/interfaces/video";
import MainBackground from "@/components/MainBackground/MainBackground";
import styles from "./DetailMain.module.scss";
import DetailContent from "@/components/DetailContent/DetailContent";

interface DetailMainProps {
  movieDetail: MovieDetail;
  cast: Cast[];
  director: Cast[];
  video: Video[];
  Recommendations: Movie[];
}

export default function DetailMain(props: DetailMainProps) {
  const { movieDetail, cast, director, video, Recommendations } = props;

  const imgSrc = movieDetail.backdrop_path || movieDetail.poster_path;

  return (
    <div className={styles.detailMainContainer}>
      <MainBackground imgSrc={imgSrc} />
      <DetailContent
        movieDetail={movieDetail}
        cast={cast}
        director={director}
        video={video}
        Recommendations={Recommendations}
      />
    </div>
  );
}
