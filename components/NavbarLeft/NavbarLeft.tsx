import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";

import styles from "./NavbarLeft.module.scss";

import Button from "@/components/Button/Button";
import { Movie, WatchList } from "@/icons/index";
import { NavbarProps, NavItemProps } from "@/components/Navbar/Navbar";
import useBreakpoint from "@/hooks/useBreakpoint";

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
  const router = useRouter();

  const brkpnt = useBreakpoint();
  const belowMd = brkpnt === "sm" || brkpnt === "md";

  return (
    <div className={styles.navItems}>
      {navFirstItems.map((item, index) => {
        return (
          <div key={index}>
            <Link
              key={item.label}
              onMouseEnter={() => setDropdown(item.label === "Movies")}
              onMouseLeave={() => setDropdown(false)}
              className={clsx(styles.navItem, {
                [styles.movieButton]: item.label === "Movies",
              })}
              href={`${item.href}`}
            >
              <Button
                startIcon={item?.icon}
                variant={item?.variant}
                size={item?.size}
                selected={router.pathname.includes(item?.href || "")}
              >
                <p>{item.label}</p>
              </Button>
            </Link>
            {!belowMd && item.label === "Movies" ? (
              <div
                className={styles.navMovie}
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                data-dropdown={dropdown}
              >
                {genre?.map((category, index) => (
                  <Link href={`/movies/${category.id}`} key={index}>
                    <Button key={category.id} variant="text-outlined">
                      {category.name}
                    </Button>
                  </Link>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
