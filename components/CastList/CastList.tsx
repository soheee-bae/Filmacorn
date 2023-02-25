import { Cast } from "@/interfaces/movie";
import styles from "./CastList.module.scss";

interface CastListProps {
  list: Cast[];
  title: string;
}

export default function CastList(props: CastListProps) {
  const { list, title } = props;
  if (!list || list.length === 0) return null;

  const limited = list.slice(0, 4);

  return (
    <div className={styles.castListContainer}>
      <p className={styles.castTitle}>{title}</p>
      <div className={styles.castNameContainer}>
        {limited.map((d, index) => (
          <p key={index} className={styles.castName}>
            {d.name}
            {index !== 3 && <span>,</span>}
          </p>
        ))}
        {list.length >= 4 && <p className={styles.dots}>...</p>}
      </div>
    </div>
  );
}
