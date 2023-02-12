import { Play } from "@/icons/index";
import { MovieDetail } from "@/interfaces/db_interfaces";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import GenreList from "../GenreList/GenreList";
import MainBackground from "../MainBackground/MainBackground";
import styles from "./HomeMain.module.scss";

interface HomeMainProps {
  mainMovie: MovieDetail;
  mainMovieVideo: any;
}

export default function HomeMain(props: HomeMainProps) {
  const { mainMovie, mainMovieVideo } = props;
  const router = useRouter();

  console.log(mainMovieVideo);
  const imgSrc = mainMovie.backdrop_path || mainMovie.poster_path;
  const genreList = mainMovie.genres;
  const videoLink = mainMovieVideo.find((v: any) => v.site === "YouTube");

  const handleWatchNow = () => {
    // window.open(`https://www.youtube.com/watch?v=${videoLink?.key}`);
  };
  const handleMoreInfo = () => {
    // router.push(`/details/movie/${data.id}`, undefined, { shallow: true });
  };

  console.log(mainMovie);
  return (
    <div className={styles.homeMainContainer}>
      <MainBackground imgSrc={imgSrc} />
      <div className={styles.homeContent}>
        <div className={styles.homeText}>
          <p className={styles.homeTitle}>{mainMovie.title}</p>
          <p className={styles.homeWord}>{mainMovie.tagline}</p>
          <GenreList genreList={genreList} />
          <div className={styles.buttonsContainer}>
            <div className={styles.homeButtons}>
              <Button
                size="lg"
                variant="contained"
                startIcon={<Play />}
                onClick={handleWatchNow}>
                Watch Now
              </Button>
              <Button size="lg" variant="outlined" onClick={handleMoreInfo}>
                More Info
              </Button>
            </div>
          </div>
          <p className={styles.homeOverview}>{mainMovie.overview}</p>
        </div>
      </div>
    </div>
  );
}
