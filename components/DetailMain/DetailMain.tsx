import { Cast, Movie, MovieDetail } from "@/interfaces/movie";
import DetailContent from "@/components/DetailContent/DetailContent";
import DetailRecom from "@/components/DetailRecom/DetailRecom";
import styles from "./DetailMain.module.scss";

interface DetailMainProps {
  movieDetail: MovieDetail;
  cast: Cast[];
  director: Cast[];
  recommendations: Movie[];
}

export default function DetailMain(props: DetailMainProps) {
  const { movieDetail, cast, director, recommendations } = props;

  return (
    <div className={styles.detailMainContainer}>
      <DetailContent
        movieDetail={movieDetail}
        cast={cast}
        director={director}
      />
      <DetailRecom recommendations={recommendations} />
    </div>
  );
}
