import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Toast } from "@/components/Toast/Toast";
import { getSessionId } from "@/utils/index";
import { Error, Plus, Transhbin } from "@/icons/index";
import { Movie, MovieDetail } from "@/interfaces/movie";
import {
  fetchWatchList,
  removeWatchList,
  addWatchList,
} from "@/helpers/handleWatchList";

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

  const handleFetchWatchList = async () => {
    const session = await getSessionId();
    if (session && !session.isGuest) {
      const watchList = await fetchWatchList(session);
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
    handleFetchWatchList();
  }, [movieDetail]);

  const handleWatchList = async (status: Status) => {
    const isAdd = status === "add";

    const session = await getSessionId();
    if (!session || session.isGuest) {
      router.push(`/watchlist`, undefined, {
        shallow: true,
      });
    } else {
      const watchlist = isAdd
        ? await addWatchList(session, movieDetail)
        : await removeWatchList(session, movieDetail);

      if (watchlist?.success) {
        setAddWatchlist(isAdd);
        setInWatchlist(isAdd);
        toast(
          <Toast
            icon={isAdd ? <Plus /> : <Transhbin />}
            title={isAdd ? "Added to watchlist" : "Removed from watchlist"}
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

  return {
    isLoading,
    addWatchlist,
    inWatchlist,
    handleWatchList,
  };
};
export default useWatchlist;
