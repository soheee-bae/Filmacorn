import { Check, Play, Plus } from "@/icons/index";
import { MovieDetail } from "@/interfaces/movie";
import useWatchlist from "@/hooks/useWatchlist";
import Button from "@/components/Button/Button";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import styles from "./DetailButtons.module.scss";
import { fetchMovieVideo } from "@/helpers/handleMovie";

interface DetailButtonProps {
  movieDetail: MovieDetail;
}
export default function DetailButtons(props: DetailButtonProps) {
  const { movieDetail } = props;

  const { isLoading, addWatchlist, inWatchlist, handleWatchList } =
    useWatchlist({ movieDetail });

  const handleWatchNow = async () => {
    const detailVideos = await fetchMovieVideo(movieDetail.id.toString());
    const detailVideo = detailVideos?.find((v: any) => v.site === "YouTube");
    window.open(`https://www.youtube.com/watch?v=${detailVideo?.key}`);
  };

  return (
    <div className={styles.detailButtonsContainer}>
      <div className={styles.detailButtons}>
        <div className={styles.detailButtons}>
          <Button
            size="lg"
            variant="contained"
            startIcon={<Play />}
            onClick={handleWatchNow}
            className={styles.detailButton}>
            Watch Now
          </Button>
          {isLoading ? (
            <div className={styles.detailLoadingButton}>
              <LoadingSpinner />
            </div>
          ) : (
            [
              addWatchlist || inWatchlist ? (
                <Button
                  size="lg"
                  variant="outlined"
                  onClick={() => handleWatchList("remove")}
                  className={styles.detailButton}
                  startIcon={<Check />}>
                  In Watchlist
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outlined"
                  onClick={() => handleWatchList("add")}
                  className={styles.detailButton}
                  startIcon={<Plus />}>
                  Add to Watchlist
                </Button>
              ),
            ]
          )}
        </div>
      </div>
    </div>
  );
}
