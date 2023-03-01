import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { toast } from "react-toastify";

import { Toast, ToastSnackbar } from "@/components/Toast/Toast";
import EditWatchlist from "@/components/EditWatchlist/EditWatchlist";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { WatchListContent } from "@/components/WatchListContent/WatchListContent";

import { Error, Transhbin } from "@/icons/index";
import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { getSessionId } from "@/utils/index";
import { Movie } from "@/interfaces/movie";

import styles from "./WatchList.module.scss";
import { SessionData } from "@/interfaces/storage";
import { fetchWatchList } from "@/helpers/handleWatchList";

export default function WatchList() {
  const [watchList, setWatchList] = useState<Movie[]>([]);
  const [allow, setAllow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editWatchList, setEditWatchList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const checkEdit = (id: number) => {
    return editWatchList.some((watchlist) => watchlist.id === id);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditWatchList([]);
  };

  const handleEdit = (data: Movie) => {
    if (checkEdit(data.id)) {
      const temp = editWatchList.filter((item) => item.id !== data.id);
      setEditWatchList(temp);
    } else {
      setEditWatchList([...editWatchList, data]);
    }
  };

  const getWatchList = async () => {
    const session = getSessionId();
    if (!session || session.isGuest) {
      setAllow(false);
    } else {
      setAllow(true);
      const watchList = await fetchWatchList(session);
      setWatchList(watchList);
    }
    setIsLoading(false);
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
        getWatchList();
      } else {
        <Toast
          icon={<Error />}
          title="Failed to remove watchlist"
          subtitle={watchItem.title || watchItem.original_title}
        />;
      }
      setEditMode(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getWatchList();
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
              handleCancel={handleCancel}
            />
          )}
        </div>
        <div className={styles.watchlistContent}>
          {isLoading ? (
            <div className={styles.watchlistLoading}>
              <LoadingSpinner />
            </div>
          ) : (
            <WatchListContent
              allow={allow}
              watchList={watchList}
              editMode={editMode}
              handleEdit={handleEdit}
              checkEdit={checkEdit}
            />
          )}
        </div>
      </div>
      <ToastSnackbar />
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
