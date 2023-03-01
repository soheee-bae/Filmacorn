import Link from "next/link";
import { CheckCircle, Circle } from "@/icons/index";
import { Movie } from "@/interfaces/movie";
import CarouselCard from "@/components/CarouselCard/CarouselCard";

import styles from "./WatchListCards.module.scss";

interface WatchListCardsProps {
  watchList: Movie[];
  editMode: boolean;
  checkEdit: (id: number) => boolean;
  handleEdit: (data: Movie) => void;
}

export default function WatchListCards(props: WatchListCardsProps) {
  const { watchList, editMode, checkEdit, handleEdit } = props;
  return (
    <div className={styles.watchListCards}>
      {watchList?.map((watchItem: Movie) => {
        return (
          <Link
            className={editMode ? styles.watchListCard : ""}
            href={editMode ? "" : `/details/${watchItem.id}`}
            key={watchItem.id}
          >
            <CarouselCard key={watchItem.id} info={watchItem} />
            {editMode && (
              <div
                className={styles.watchListEditMode}
                data-edit={checkEdit(watchItem.id)}
                onClick={() => handleEdit(watchItem)}
              >
                {checkEdit(watchItem.id) ? <CheckCircle /> : <Circle />}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
