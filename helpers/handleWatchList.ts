import { SessionData } from "@/interfaces/storage";
import { MovieDetail } from "@/interfaces/movie";
import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";

export const fetchWatchList = async (session: SessionData) => {
  const watchListDatas = await fetch(
    `${TMDB_REQUEST_URL}/account/${session?.accountId}/watchlist/movies${API_KEY}&language=en-US&session_id=${session?.sessionId}&sort_by=created_at.asc&page=1`
  );
  const watchListData = await watchListDatas.json();
  const watchList = watchListData.results;
  return watchList;
};

export const removeWatchList = async (
  session: SessionData,
  movieDetail: MovieDetail
) => {
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
        watchlist: false,
      }),
    }
  );
  const watchlist = await res.json();
  return watchlist;
};

export const addWatchList = async (
  session: SessionData,
  movieDetail: MovieDetail
) => {
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
  return watchlist;
};
