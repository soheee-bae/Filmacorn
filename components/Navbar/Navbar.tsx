import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Search } from "@/icons/index";
import Button, { Size, Variant } from "@/components/Button/Button";
import { Genre } from "@/interfaces/db_interfaces";
import NavbarLeft from "../NavbarLeft/NavbarLeft";

export interface NavbarProps {
  genre: Genre[];
}

export interface NavItemProps {
  label: string;
  icon?: JSX.Element | undefined;
  variant: Variant;
  size?: Size;
}

const navSecondItems: NavItemProps[] = [
  {
    label: "Search",
    icon: <Search />,
    variant: "text-outlined",
  },
  {
    label: "Create Account",
    variant: "contained",
    size: "sm",
  },
  {
    label: "Sign In",
    variant: "outlined",
    size: "sm",
  },
];
Object.freeze(navSecondItems);

export default function Navbar(props: NavbarProps) {
  const { genre } = props;

  const handleOnClick = (): void => {};

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navList}>
          <Link href="/" className={styles.logoItem}>
            <p className={styles.logo}>NEXTFLICKS</p>
          </Link>
          <NavbarLeft genre={genre} />
        </div>
        <div className={styles.navItems}>
          {navSecondItems.map((item) => (
            <Link key={item.label} className={styles.item} href="">
              <Button
                onClick={handleOnClick}
                startIcon={item?.icon}
                variant={item?.variant}
                size={item?.size}>
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
