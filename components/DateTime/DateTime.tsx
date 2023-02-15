import { getTimeWithFormat, getYearandMonth } from "@/helpers/getDateTime";
import styles from "./DateTime.module.scss";

interface DateTimeProps {
  releaseDate: string;
  runtime: number;
}

export default function DateTime(props: DateTimeProps) {
  const { releaseDate, runtime } = props;
  const durationHour =
    getTimeWithFormat(runtime).hours + getTimeWithFormat(runtime).hourUnit;
  const durationMins =
    getTimeWithFormat(runtime).minutes + getTimeWithFormat(runtime).minUnit;

  return (
    <div className={styles.dateTimeContainer}>
      <li className={styles.date}>
        {getYearandMonth(releaseDate).month} {getYearandMonth(releaseDate).year}
      </li>
      <p>&bull; </p>
      <li className={styles.time}>
        <p>{getTimeWithFormat(runtime).hours !== 0 && durationHour}</p>
        <p>{getTimeWithFormat(runtime).minutes !== 0 && durationMins}</p>
      </li>
    </div>
  );
}
