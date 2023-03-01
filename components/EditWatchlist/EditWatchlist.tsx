import { Dispatch } from "react";
import { Movie } from "@/interfaces/movie";
import Button from "@/components/Button/Button";
import styles from "./EditWatchlist.module.scss";

interface EditWatchlistProps {
  editMode: boolean;
  setEditMode: Dispatch<boolean>;
  editWatchList: Movie[];
  handleRemove: () => void;
  handleCancel: () => void;
}
export default function EditWatchlist(props: EditWatchlistProps) {
  const { editMode, setEditMode, editWatchList, handleRemove, handleCancel } =
    props;

  return (
    <div className={styles.editWatchlist}>
      {editMode ? (
        <div className={styles.editWatchlistContent}>
          <p className={styles.editWatchlistCount}>
            {editWatchList.length} Selected
          </p>
          <Button onClick={handleCancel} variant="contained-outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleRemove}
            disabled={editWatchList.length === 0}
          >
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
