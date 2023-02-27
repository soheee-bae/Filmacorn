import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import Button from "@/components/Button/Button";
import { getSessionId } from "@/utils/index";
import { Movie } from "@/interfaces/movie";

import styles from "./WatchList.module.scss";
import CarouselCard from "@/components/CarouselCard/CarouselCard";
import EditWatchlist from "@/components/EditWatchlist/EditWatchlist";

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);
  const [allow, setAllow] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fetchWatchList = async () => {
    const session = getSessionId();
    if (!session || session.isGuest) {
      setAllow(false);
    } else {
      setAllow(true);
      const watchListDatas = await fetch(
        `${TMDB_REQUEST_URL}/account/${session?.accountId}/watchlist/movies${API_KEY}&language=en-US&session_id=${session?.sessionId}&sort_by=created_at.asc&page=1`
      );
      const watchListData = await watchListDatas.json();
      const watchList = watchListData.results;
      setWatchList(watchList);
    }
  };

  useEffect(() => {
    fetchWatchList();
  }, []);

  return (
    <div className={styles.watchlist}>
      <div className={styles.watchlistContainer}>
        <div className={styles.watchlistHeader}>
          <p className={styles.watchlistTitle}>Watchlist</p>
          {allow && (
            <EditWatchlist setEditMode={setEditMode} editMode={editMode} />
          )}
        </div>
        <div className={styles.watchlistContent}>
          {watchListContent({ allow, watchList })}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  /* Genre */
  const genreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const genres = await genreData.json();
  const genre = genres.genres;

  return {
    props: { genre },
  };
};

interface watchListContentProps {
  allow: boolean;
  watchList: Movie[];
}

export function watchListContent(props: watchListContentProps) {
  const { allow, watchList } = props;

  if (allow) {
    if (watchList.length === 0) {
      return (
        <div className={styles.watchListContentDetail}>
          <p className={styles.watchListSubtitle}>
            Add Stuff To Your Watchlist
          </p>
          <p className={styles.watchListText}>
            Your Watchlist is empty. Any Movie. Show can be added to your
            Watchlist with a Free Filmacorn account.
          </p>
        </div>
      );
    } else {
      return (
        <div className={styles.watchListCards}>
          {watchList?.map((watchItem: Movie) => {
            return (
              <Link href={`/details/${watchItem.id}`} key={watchItem.id}>
                <CarouselCard key={watchItem.id} info={watchItem} />
              </Link>
            );
          })}
        </div>
      );
    }
  } else {
    return (
      <div className={styles.watchListContentDetail}>
        <p className={styles.watchListSubtitle}>Start Your Watchlist</p>
        <p className={styles.watchListText}>
          Any Movie can be added to your Watchlist with a Free Filmacorn
          account.
        </p>
        <Link className={styles.navItem} href={"/signin"}>
          <Button variant="outlined" size="lg">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }
}
