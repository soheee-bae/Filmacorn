import { useRouter } from "next/router";
import { Play } from "@/icons/index";
import { MovieDetail } from "@/interfaces/movie";

import Button from "@/components/Button/Button";
import GenreList from "@/components/GenreList/GenreList";
import MainBackground from "@/components/MainBackground/MainBackground";

import styles from "./HomeMain.module.scss";

interface HomeMainProps {
  mainMovie: MovieDetail;
  mainMovieVideo: any;
}

export default function HomeMain(props: HomeMainProps) {
  const { mainMovie, mainMovieVideo } = props;
  const router = useRouter();

  const imgSrc = mainMovie.backdrop_path || mainMovie.poster_path;
  const genreList = mainMovie.genres;
  const mainVideo = mainMovieVideo.find((v: any) => v.site === "YouTube");

  const handleWatchNow = () => {
    window.open(`https://www.youtube.com/watch?v=${mainVideo?.key}`);
  };
  const handleMoreInfo = () => {
    // router.push(`/details/${mainMovie.id}/${mainMovie.title}`, undefined, {
    router.push(`/details/${mainMovie.id}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className={styles.homeMainContainer}>
      <MainBackground imgSrc={imgSrc} />
      <div className={styles.homeContent}>
        <div className={styles.homeText}>
          <p className={styles.homeTitle}>{mainMovie.title}</p>
          <p className={styles.homeWord}>{mainMovie.tagline}</p>
          <GenreList genreList={genreList} />
          <p className={styles.homeOverview}>{mainMovie.overview}</p>
          <div className={styles.buttonsContainer}>
            <div className={styles.homeButtons}>
              <Button
                size="lg"
                variant="contained"
                startIcon={<Play />}
                onClick={handleWatchNow}
                className={styles.homeButton}>
                Watch Now
              </Button>
              <Button
                size="lg"
                variant="outlined"
                onClick={handleMoreInfo}
                className={styles.homeButton}>
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
