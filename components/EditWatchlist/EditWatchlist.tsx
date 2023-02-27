import { Movie } from "@/interfaces/movie";
import { Dispatch } from "react";
import Button from "../Button/Button";
import styles from "./EditWatchlist.module.scss";

interface EditWatchlistProps {
  editMode: boolean;
  setEditMode: Dispatch<boolean>;
  editWatchList: Movie[];
  handleRemove: () => void;
}
export default function EditWatchlist(props: EditWatchlistProps) {
  const { editMode, setEditMode, editWatchList, handleRemove } = props;

  return (
    <div className={styles.editWatchlist}>
      {editMode ? (
        <div className={styles.editWatchlistContent}>
          <p className={styles.editWatchlistCount}>
            {editWatchList.length} Selected
          </p>
          <Button
            onClick={() => setEditMode(false)}
            variant="contained-outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      ) : (
        <Button variant="contained-outlined" onClick={() => setEditMode(true)}>
          Edit Watchlist
        </Button>
      )}
    </div>
  );
}
