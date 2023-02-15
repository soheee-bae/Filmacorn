import { Cast } from "@/interfaces/movie";
import styles from "./CastList.module.scss";

interface CastListProps {
  list: Cast[];
  title: string;
}

export default function CastList(props: CastListProps) {
  const { list, title } = props;
  if (!list || list.length === 0) return null;

  const limited = list.slice(0, 5);

  return (
    <div className={styles.castListContainer}>
      <p className={styles.castTitle}>{title}</p>
      <div className={styles.castNameContainer}>
        {limited.map((d, index) => (
          <p className={styles.castName}>
            {d.name}
            {index !== 4 && <span>,</span>}
          </p>
        ))}
        {list.length >= 5 && <p className={styles.dots}>...</p>}
      </div>
    </div>
  );
}
