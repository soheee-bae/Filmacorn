import styles from "./GenreList.module.scss";
import { Genre } from "@/interfaces/db_interfaces";

interface GenreListProps {
  genreList: Genre[];
}
export default function GenreList(props: GenreListProps) {
  const { genreList } = props;

  const genreNames = genreList.map((genre) => genre.name);

  return (
    <div className={styles.genreList}>
      {genreNames?.map((genre: string, index: number) => (
        <li className={styles.genre} data-genre={`genre_${index}`} key={genre}>
          {genre}
        </li>
      ))}
    </div>
  );
}
