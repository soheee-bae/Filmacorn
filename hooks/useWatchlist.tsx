import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Toast } from "@/components/Toast/Toast";
import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { getSessionId } from "@/utils/index";
import { Error, Plus, Transhbin } from "@/icons/index";
import { Movie, MovieDetail } from "@/interfaces/movie";

type Status = "add" | "remove";

interface useWatchListProps {
  movieDetail: MovieDetail;
}

const useWatchlist = (props: useWatchListProps) => {
  const { movieDetail } = props;
  const router = useRouter();

  const [addWatchlist, setAddWatchlist] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWatchList = async () => {
    const session = await getSessionId();
    if (session && !session.isGuest) {
      const watchListDatas = await fetch(
        `${TMDB_REQUEST_URL}/account/${session?.accountId}/watchlist/movies${API_KEY}&language=en-US&session_id=${session?.sessionId}&sort_by=created_at.asc&page=1`
      );
      const watchListData = await watchListDatas.json();
      const watchList = watchListData.results;
      const inWatchlist = watchList.find(
        (watch: Movie) => watch.id === movieDetail.id
      );
      if (inWatchlist) setInWatchlist(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setAddWatchlist(false);
    setInWatchlist(false);
    fetchWatchList();
  }, [movieDetail]);

  const handleWatchList = async (status: Status) => {
    const isAdd = status === "add";

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
            watchlist: isAdd ? true : false,
          }),
        }
      );
      const watchlist = await res.json();
      if (watchlist.success) {
        setAddWatchlist(isAdd);
        setInWatchlist(isAdd);
        toast(
          <Toast
            icon={isAdd ? <Plus /> : <Transhbin />}
            title="Added to watchlist"
            subtitle={movieDetail.title || movieDetail.original_title}
          />
        );
      } else {
        setAddWatchlist(!isAdd);
        setInWatchlist(!isAdd);
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

  return { isLoading, addWatchlist, inWatchlist, handleWatchList };
};
export default useWatchlist;
