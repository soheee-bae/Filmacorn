import { Play } from "@/icons/index";
import { Genre } from "@/interfaces/basic";
import { Cast, MovieDetail } from "@/interfaces/movie";
import { Video } from "@/interfaces/video";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import CastList from "../CastList/CastList";
import DateTime from "../DateTime/DateTime";
import GenreList from "../GenreList/GenreList";
import MainBackground from "../MainBackground/MainBackground";
import styles from "./DetailMain.module.scss";

interface DetailMainProps {
  movieDetail: MovieDetail;
  cast: Cast[];
  director: Cast[];
  video: Video[];
}

export default function DetailMain(props: DetailMainProps) {
  const { movieDetail, cast, director, video } = props;
  const router = useRouter();

  const genreList = movieDetail.genres;
  const imgSrc = movieDetail.backdrop_path || movieDetail.poster_path;
  const detailVideo = video?.find((v: any) => v.site === "YouTube");

  const handleWatchNow = () => {
    window.open(`https://www.youtube.com/watch?v=${detailVideo?.key}`);
  };
  const handleAddWatchList = () => {};

  return (
    <div className={styles.detailMainContainer}>
      <MainBackground imgSrc={imgSrc} />
      <div className={styles.detailMainContent}>
        <div className={styles.detailText}>
          <p className={styles.detailTitle}>{movieDetail.title}</p>
          <DateTime
            releaseDate={movieDetail.release_date}
            runtime={movieDetail.runtime}
          />
          <div className={styles.detailButtonsContainer}>
            <div className={styles.detailButtons}>
              <Button
                size="lg"
                variant="contained"
                startIcon={<Play />}
                onClick={handleWatchNow}
                className={styles.detailButton}>
                Watch Now
              </Button>
              <Button
                size="lg"
                variant="outlined"
                onClick={handleAddWatchList}
                className={styles.detailButton}>
                + Add to Watchlist
              </Button>
            </div>
          </div>
          <GenreList genreList={genreList} />
          <div>
            <CastList list={director} title="Directed by" />
            <CastList list={cast} title="Starring" />
          </div>
          <p className={styles.detailOverview}>{movieDetail.overview}</p>
        </div>
      </div>
    </div>
  );
}
