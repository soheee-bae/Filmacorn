import { useState } from "react";
import Link from "next/link";
import styles from "./NavbarRight.module.scss";

import { Search } from "@/icons/index";
import Button from "@/components/Button/Button";
import { NavItemProps } from "@/components/Navbar/Navbar";
import { getSessionId } from "@/utils/index";

const navSecondItems: NavItemProps[] = [
  {
    label: "Search",
    icon: <Search />,
    variant: "text-outlined",
    href: "/search",
  },
  {
    label: "Sign In",
    variant: "outlined",
    size: "sm",
    href: "/signin",
  },
];
Object.freeze(navSecondItems);

const navLoggedInItems: NavItemProps[] = [
  {
    label: "Search",
    icon: <Search />,
    variant: "text-outlined",
    href: "/search",
  },
  {
    label: "Account",
    variant: "text-outlined",
    size: "md",
  },
];
Object.freeze(navLoggedInItems);

export default function NavbarRight() {
  const session = getSessionId();
  const noSessionId = !session;
  const navList = noSessionId ? navSecondItems : navLoggedInItems;

  const [dropdown, setDropdown] = useState(false);

  return (
    <div className={styles.navItems}>
      {navList.map((item) => {
        return (
          <>
            <Link
              key={item.label}
              onMouseEnter={() => item.label === "Account" && setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              data-dropdown={dropdown}
              className={styles.navItem}
              href={item.href ? `${item.href}` : ""}>
              <Button
                startIcon={item?.icon}
                variant={item?.variant}
                size={item?.size}
                className={
                  item.label === "Account" ? styles.accountItem : undefined
                }>
                {item.label}
              </Button>
            </Link>
            {item.label === "Account" && (
              <div
                className={styles.navAccount}
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                data-dropdown={dropdown}>
                <div className={styles.navAccountUsername}>
                  <p className={styles.navAccountTitle}>ACCOUNT</p>
                  <p className={styles.navAccountName}>{session.username}</p>
                </div>
                <div className={styles.navAccountButtons}>
                  <Button variant="text-outlined">Setting</Button>
                  <Button variant="text-outlined">Watchlist</Button>
                </div>
                <div className={styles.signoutButton}>
                  <Button variant="contained-outlined">Sign Out</Button>
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
