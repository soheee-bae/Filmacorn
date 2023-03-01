import Link from "next/link";
import Button from "@/components/Button/Button";
import styles from "./WatchListPlaceholder.module.scss";

interface WatchListPlaceholderProps {
  title: string;
  subtitle: string;
  isButton: boolean;
}
export default function WatchListPlaceholder(props: WatchListPlaceholderProps) {
  const { title, subtitle, isButton } = props;
  return (
    <div className={styles.watchListPlaceholder}>
      <p className={styles.watchListPlaceholderTitle}>{title}</p>
      <p className={styles.watchListPlaceholderSubtitle}>{subtitle}</p>
      {isButton && (
        <Link className={styles.watchListPlaceholderButton} href={"/signin"}>
          <Button variant="outlined" size="lg">
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
}
