import { Check, Play, Plus } from "@/icons/index";
import { MovieDetail } from "@/interfaces/movie";
import { Video } from "@/interfaces/video";
import useWatchlist from "@/hooks/useWatchlist";
import Button from "@/components/Button/Button";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import styles from "./DetailButtons.module.scss";

interface DetailButtonProps {
  video: Video[];
  movieDetail: MovieDetail;
}
export default function DetailButtons(props: DetailButtonProps) {
  const { video, movieDetail } = props;

  const { isLoading, addWatchlist, inWatchlist, handleWatchList } =
    useWatchlist({ movieDetail });
  const detailVideo = video?.find((v: any) => v.site === "YouTube");
  const handleWatchNow = () => {
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
            className={styles.detailButton}
          >
            Watch Now
          </Button>
          {isLoading ? (
            <div className={styles.detailButton}>
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
                  startIcon={<Check />}
                >
                  In Watchlist
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outlined"
                  onClick={() => handleWatchList("add")}
                  className={styles.detailButton}
                  startIcon={<Plus />}
                >
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
