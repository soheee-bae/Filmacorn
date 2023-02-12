import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import Button from "@/components/Button/Button";
import { Movie, WatchList } from "@/icons/index";
import { NavbarProps, NavItemProps } from "../Navbar/Navbar";
import styles from "./NavbarLeft.module.scss";

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

export default function NavbarLeft(props: NavbarProps) {
  const { genre } = props;
  const [dropdown, setDropdown] = useState(false);

  const handleOnClick = () => {};
  return (
    <div className={styles.navItems}>
      {navFirstItems.map((item) => (
        <>
          <Link
            key={item.label}
            onMouseEnter={() => item.label === "Movies" && setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            data-dropdown={dropdown}
            className={clsx(styles.navItem, {
              [styles.movieButton]: item.label === "Movies",
            })}
            href="">
            <Button
              onClick={handleOnClick}
              startIcon={item?.icon}
              variant={item?.variant}
              size={item?.size}>
              {item.label}
            </Button>
          </Link>
          {item.label === "Movies" && (
            <div
              className={styles.navMovie}
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              data-dropdown={dropdown}>
              {genre.map((category) => (
                <Button
                  onClick={handleOnClick}
                  key={category.id}
                  variant="text-outlined">
                  {category.name}
                </Button>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
}
