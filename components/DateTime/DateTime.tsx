import { getTimeWithFormat, getYearandMonth } from "@/helpers/getDateTime";

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
    <div>
      <li>
        {getYearandMonth(releaseDate).month} {getYearandMonth(releaseDate).year}
      </li>
      <li>
        <p>{getTimeWithFormat(runtime).hours !== 0 && durationHour}</p>
        <p>{getTimeWithFormat(runtime).minutes !== 0 && durationMins}</p>
      </li>
    </div>
  );
}
