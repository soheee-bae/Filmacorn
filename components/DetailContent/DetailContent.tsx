import "react-toastify/dist/ReactToastify.css";

import { Cast, MovieDetail } from "@/interfaces/movie";
import CastList from "@/components/CastList/CastList";
import DateTime from "@/components/DateTime/DateTime";
import GenreList from "@/components/GenreList/GenreList";
import MainBackground from "@/components/MainBackground/MainBackground";
import DetailButtons from "@/components/DetailButtons/DetailButtons";
import { ToastSnackbar } from "@/components/Toast/Toast";

import styles from "./DetailContent.module.scss";

interface DetailContentProps {
  movieDetail: MovieDetail;
  cast: Cast[];
  director: Cast[];
}

export default function DetailContent(props: DetailContentProps) {
  const { movieDetail, cast, director } = props;

  const imgSrc = movieDetail.backdrop_path || movieDetail.poster_path;
  const genreList = movieDetail.genres;

  return (
    <div className={styles.detailMainContent}>
      <MainBackground imgSrc={imgSrc} />
      <div className={styles.detailContent}>
        <div className={styles.detailText}>
          <p className={styles.detailTitle}>{movieDetail.title}</p>
          <DateTime
            releaseDate={movieDetail.release_date}
            runtime={movieDetail.runtime}
          />
          <DetailButtons movieDetail={movieDetail} />
          <GenreList genreList={genreList} />
          <div className={styles.detailCasts}>
            <CastList list={director} title="Directed by" />
            <CastList list={cast} title="Starring" />
          </div>
          <p className={styles.detailOverview}>{movieDetail.overview}</p>
        </div>
      </div>
      <ToastSnackbar />
    </div>
  );
}
