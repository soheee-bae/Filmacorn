import { TMDB_IMAGE_URL } from "@/config/index";
import styles from "./MainBackground.module.scss";

interface MainBackgroundProps {
  imgSrc: string;
}

export default function MainBackground(props: MainBackgroundProps) {
  const { imgSrc } = props;
  return (
    <img
      src={imgSrc && `${TMDB_IMAGE_URL}/original${imgSrc}`}
      className={styles.backgroundImg}
      alt={imgSrc}
    />
  );
}
