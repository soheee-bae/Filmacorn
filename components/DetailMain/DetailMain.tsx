import { Play } from "@/icons/index";
import { Genre } from "@/interfaces/basic";
import { Cast, MovieDetail } from "@/interfaces/movie";
import { Video } from "@/interfaces/video";
import Button from "../Button/Button";
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
  //   const router = useRouter();

  const genreList = movieDetail.genres;
  const imgSrc = movieDetail.backdrop_path || movieDetail.poster_path;

  //   const videoLink = video.find((v: any) => v.site === "YouTube");

  const handleWatchNow = () => {
    //   window.open(`https://www.youtube.com/watch?v=${videoLink?.key}`);
  };
  const handleAddWatchList = () => {};

  //   const durationHour =
  //     getTimeWithFormat(runtime).hours + getTimeWithFormat(runtime).hourUnit;
  //   const durationMins =
  //     getTimeWithFormat(runtime).minutes + getTimeWithFormat(runtime).minUnit;

  return (
    <div className={styles.detailMainContainer}>
      <MainBackground imgSrc={imgSrc} />

      <div className={styles.detailMainContent}>
        <div className={styles.detailText}>
          <p className={styles.detailTitle}>{movieDetail.title}</p>
          {/* <div>
            <li>
              {getYearandMonth(releaseDate).month}{" "}
              {getYearandMonth(releaseDate).year}
            </li>
            <li>
              <p>{getTimeWithFormat(runtime).hours !== 0 && durationHour}</p>
              <p>{getTimeWithFormat(runtime).minutes !== 0 && durationMins}</p>
            </li>
          </div> */}
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

          {/* {director.length !== 0 && (
            <div>
              <p>Directed by</p>
              <div>
                {director.map((d) => (
                  <p>{d.name}</p>
                ))}
              </div>
            </div>
          )}
          {cast.length !== 0 && (
            <div>
              <p>Starring</p>
              <div>
                {cast.map((c) => (
                  <p>{c.name}</p>
                ))}
              </div>
            </div>
          )}*/}
          <p className={styles.detailOverview}>{movieDetail.overview}</p>
        </div>
      </div>
    </div>
  );
}
