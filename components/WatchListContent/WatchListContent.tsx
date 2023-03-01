import { Movie } from "@/interfaces/movie";
import WatchListCards from "@/components/WatchListCards/WatchListCards";
import WatchListPlaceholder from "@/components/WatchListPlaceholder/WatchListPlaceholder";

interface watchListContentProps {
  allow: boolean;
  watchList: Movie[];
  editMode: boolean;
  handleEdit: (data: Movie) => void;
  checkEdit: (id: number) => boolean;
}

export function WatchListContent(props: watchListContentProps) {
  const { allow, watchList, editMode, handleEdit, checkEdit } = props;

  if (allow) {
    if (watchList.length === 0) {
      return (
        <WatchListPlaceholder
          title="Add Stuff To Your Watchlist"
          subtitle="Your Watchlist is empty. Any Movie can be added to your Watchlist
              with a Free Filmacorn account."
          isButton={false}
        />
      );
    } else {
      return (
        <WatchListCards
          watchList={watchList}
          editMode={editMode}
          checkEdit={checkEdit}
          handleEdit={handleEdit}
        />
      );
    }
  } else {
    return (
      <WatchListPlaceholder
        title="Start Your Watchlist"
        subtitle=" Any Movie can be added to your Watchlist with a Free Filmacorn
            account."
        isButton={true}
      />
    );
  }
}
