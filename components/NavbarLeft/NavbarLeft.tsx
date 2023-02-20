import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import styles from "./NavbarLeft.module.scss";

import Button from "@/components/Button/Button";
import { Movie, WatchList } from "@/icons/index";
import { NavbarProps, NavItemProps } from "@/components/Navbar/Navbar";

const navFirstItems: NavItemProps[] = [
  {
    label: "Movies",
    icon: <Movie />,
    variant: "text-color",
    href: "/movies",
  },

  {
    label: "Watchlist",
    icon: <WatchList />,
    variant: "text-outlined",
    href: "/watchlist",
  },
];
Object.freeze(navFirstItems);

export default function NavbarLeft(props: NavbarProps) {
  const { genre } = props;
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className={styles.navItems}>
      {navFirstItems.map((item, index) => {
        return (
          <>
            <Link
              key={item.label}
              onMouseEnter={() => item.label === "Movies" && setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              data-dropdown={dropdown}
              className={clsx(styles.navItem, {
                [styles.movieButton]: item.label === "Movies",
              })}
              href={`${item.href}`}>
              <Button
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
                {genre?.map((category, index) => (
                  <Link href={`/movies/${category.id}`} key={index}>
                    <Button key={category.id} variant="text-outlined">
                      {category.name}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
