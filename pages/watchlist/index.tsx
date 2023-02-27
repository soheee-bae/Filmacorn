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
import { CheckCircle, Circle, Error, Transhbin } from "@/icons/index";
import { Toast, ToastSnackbar } from "@/components/Toast/Toast";
import { toast } from "react-toastify";

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);
  const [allow, setAllow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editWatchList, setEditWatchList] = useState<Movie[]>([]);

  const checkEdit = (id: number) => {
    return editWatchList.some((watchlist) => watchlist.id === id);
  };

  const handleEdit = (data: Movie) => {
    if (checkEdit(data.id)) {
      const temp = editWatchList.filter((item) => item.id !== data.id);
      setEditWatchList(temp);
    } else {
      setEditWatchList([...editWatchList, data]);
    }
  };

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
  const handleRemove = async () => {
    const session = await getSessionId();
    editWatchList.forEach(async (watchItem, index) => {
      const res = await fetch(
        `${TMDB_REQUEST_URL}/account/${session?.accountId}/watchlist${API_KEY}&session_id=${session.sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: watchItem.id,
            watchlist: false,
          }),
        }
      );
      const watchlist = await res.json();
      if (watchlist.success) {
        setEditWatchList([]);
        if (editWatchList.length === index + 1) {
          toast(
            <Toast
              icon={<Transhbin />}
              title="Success"
              subtitle="Removed from watchlist"
            />
          );
        }
        fetchWatchList();
      } else {
        <Toast
          icon={<Error />}
          title="Failed to remove watchlist"
          subtitle={watchItem.title || watchItem.original_title}
        />;
      }
    });
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
            <EditWatchlist
              setEditMode={setEditMode}
              editMode={editMode}
              editWatchList={editWatchList}
              handleRemove={handleRemove}
            />
          )}
        </div>
        <div className={styles.watchlistContent}>
          <WatchListContent
            allow={allow}
            watchList={watchList}
            editMode={editMode}
            handleEdit={handleEdit}
            editWatchList={editWatchList}
            checkEdit={checkEdit}
          />
        </div>
        <ToastSnackbar />
      </div>
    </div>
  );
}

interface watchListContentProps {
  allow: boolean;
  watchList: Movie[];
  editMode: boolean;
  handleEdit: (data: Movie) => void;
  editWatchList: Movie[];
  checkEdit: (id: number) => boolean;
}

export function WatchListContent(props: watchListContentProps) {
  const { allow, watchList, editMode, handleEdit, editWatchList, checkEdit } =
    props;

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
              <Link
                className={editMode ? styles.watchListCard : ""}
                href={editMode ? "" : `/details/${watchItem.id}`}
                key={watchItem.id}>
                <CarouselCard key={watchItem.id} info={watchItem} />
                {editMode && (
                  <div
                    className={styles.watchListEditMode}
                    data-edit={checkEdit(watchItem.id)}
                    onClick={() => handleEdit(watchItem)}>
                    {checkEdit(watchItem.id) ? <CheckCircle /> : <Circle />}
                  </div>
                )}
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
