import { useState } from "react";
import { useRouter } from "next/router";

import { Cross, Error, Play, Plus, Transhbin } from "@/icons/index";
import { Cast, MovieDetail } from "@/interfaces/movie";
import { Video } from "@/interfaces/video";
import Button from "@/components/Button/Button";
import CastList from "@/components/CastList/CastList";
import DateTime from "@/components/DateTime/DateTime";
import GenreList from "@/components/GenreList/GenreList";
import MainBackground from "@/components/MainBackground/MainBackground";

import styles from "./DetailContent.module.scss";
import { getSessionId } from "@/utils/index";
import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast, ToastSnackbar } from "../Toast/Toast";

interface DetailContentProps {
  movieDetail: MovieDetail;
  cast: Cast[];
  director: Cast[];
  video: Video[];
}

export default function DetailContent(props: DetailContentProps) {
  const { movieDetail, cast, director, video } = props;
  const [addWatchlist, setAddWatchlist] = useState(false);
  const router = useRouter();

  const imgSrc = movieDetail.backdrop_path || movieDetail.poster_path;

  console.log(movieDetail);
  const genreList = movieDetail.genres;
  const detailVideo = video?.find((v: any) => v.site === "YouTube");

  const handleWatchNow = () => {
    window.open(`https://www.youtube.com/watch?v=${detailVideo?.key}`);
  };
  const handleAddWatchList = async () => {
    const session = await getSessionId();
    if (!session || session.isGuest) {
      router.push(`/watchlist`, undefined, {
        shallow: true,
      });
    } else {
      const res = await fetch(
        `${TMDB_REQUEST_URL}/account/${session?.accountId}/watchlist${API_KEY}&session_id=${session.sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: movieDetail.id,
            watchlist: true,
          }),
        }
      );
      const watchlist = await res.json();
      if (!watchlist.success) {
        setAddWatchlist(true);
        toast(
          <Toast
            icon={<Plus />}
            title="Added to watchlist"
            subtitle={movieDetail.title || movieDetail.original_title}
          />
        );
      } else {
        setAddWatchlist(false);
        toast(
          <Toast
            icon={<Error />}
            title="Failed to add to watchlist"
            subtitle={movieDetail.title || movieDetail.original_title}
          />
        );
      }
    }
  };

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
                className={styles.detailButton}
                startIcon={<Plus />}>
                Add to Watchlist
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
      <ToastSnackbar />
    </div>
  );
}
