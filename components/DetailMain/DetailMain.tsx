import { Cast, Movie, MovieDetail } from "@/interfaces/movie";
import { Video } from "@/interfaces/video";
import styles from "./DetailMain.module.scss";
import DetailContent from "@/components/DetailContent/DetailContent";
import DetailRecom from "@/components/DetailRecom/DetailRecom";

interface DetailMainProps {
  movieDetail: MovieDetail;
  cast: Cast[];
  director: Cast[];
  video: Video[];
  Recommendations: Movie[];
}

export default function DetailMain(props: DetailMainProps) {
  const { movieDetail, cast, director, video, Recommendations } = props;

  return (
    <div className={styles.detailMainContainer}>
      <DetailContent
        movieDetail={movieDetail}
        cast={cast}
        director={director}
        video={video}
        Recommendations={Recommendations}
      />
      <DetailRecom Recommendations={Recommendations} />
    </div>
  );
}
