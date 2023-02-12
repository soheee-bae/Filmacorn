import Link from "next/link";
import styles from "./Navbar.module.scss";
import { Movie, WatchList, Search } from "@/icons/index";
import Button, { Size, Variant } from "@/components/Button/Button";

interface NavItemProps {
  label: string;
  icon?: JSX.Element | undefined;
  variant: Variant;
  size?: Size;
}

const navFirstItems: NavItemProps[] = [
  {
    label: "Movies",
    icon: <Movie />,
    variant: "text-color",
  },

  {
    label: "Watchlist",
    icon: <WatchList />,
    variant: "text-outlined",
  },
];
Object.freeze(navFirstItems);

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

export default function Navbar() {
  const handleOnClick = (): void => {};

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.navList}>
          <Link href="/" className={styles.logoItem}>
            <p className={styles.logo}>NEXTFLICKS</p>
          </Link>
          <div className={styles.navItems}>
            {navFirstItems.map((item) => (
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
