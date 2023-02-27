import { Dispatch } from "react";
import Button from "../Button/Button";
import styles from "./EditWatchlist.module.scss";

interface EditWatchlistProps {
  editMode: boolean;
  setEditMode: Dispatch<boolean>;
}
export default function EditWatchlist(props: EditWatchlistProps) {
  const { editMode, setEditMode } = props;

  return (
    <div className={styles.editWatchlist}>
      {editMode ? (
        <div>
          <p>0 Selected</p>
          <Button
            onClick={() => setEditMode(false)}
            variant="contained-outlined">
            Cancel
          </Button>
          <Button variant="contained">Remove</Button>
        </div>
      ) : (
        <Button variant="contained-outlined" onClick={() => setEditMode(true)}>
          Edit Watchlist
        </Button>
      )}
    </div>
  );
}
