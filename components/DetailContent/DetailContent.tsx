import { useRouter } from "next/router";

import { Play } from "@/icons/index";
import { Cast, MovieDetail } from "@/interfaces/movie";
import { Video } from "@/interfaces/video";
import Button from "@/components/Button/Button";
import CastList from "@/components/CastList/CastList";
import DateTime from "@/components/DateTime/DateTime";
import GenreList from "@/components/GenreList/GenreList";
import MainBackground from "@/components/MainBackground/MainBackground";

import styles from "./DetailContent.module.scss";

interface DetailContentProps {
  movieDetail: MovieDetail;
  cast: Cast[];
  director: Cast[];
  video: Video[];
}

export default function DetailContent(props: DetailContentProps) {
  const { movieDetail, cast, director, video } = props;
  const router = useRouter();

  const imgSrc = movieDetail.backdrop_path || movieDetail.poster_path;

  const genreList = movieDetail.genres;
  const detailVideo = video?.find((v: any) => v.site === "YouTube");

  const handleWatchNow = () => {
    window.open(`https://www.youtube.com/watch?v=${detailVideo?.key}`);
  };
  const handleAddWatchList = () => {
    router.push(`/watchlist`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className={styles.detailMainContent}>
      <MainBackground imgSrc={imgSrc} />
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
        <div className={styles.detailCasts}>
          <CastList list={director} title="Directed by" />
          <CastList list={cast} title="Starring" />
        </div>
        <p className={styles.detailOverview}>{movieDetail.overview}</p>
      </div>
    </div>
  );
}
