import Link from "next/link";
import styles from "./Navbar.module.scss";

import { Genre } from "@/interfaces/basic";
import { Size, Variant } from "@/components/Button/Button";
import NavbarLeft from "@/components/NavbarLeft/NavbarLeft";
import NavbarRight from "@/components/NavbarRight/NavbarRight";
import { Logo } from "@/icons/index";

export interface NavbarProps {
  genre: Genre[];
}

export interface NavItemProps {
  label: string;
  icon?: JSX.Element | undefined;
  variant: Variant;
  size?: Size;
  href?: string;
}

export default function Navbar(props: NavbarProps) {
  const { genre } = props;

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navList}>
          <Link href="/" className={styles.logoItem}>
            <Logo />
          </Link>
          <NavbarLeft genre={genre} />
        </div>
        <NavbarRight />
      </div>
    </nav>
  );
}
