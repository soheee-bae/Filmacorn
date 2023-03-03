import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavbarRight.module.scss";

import { Search, User } from "@/icons/index";
import Button from "@/components/Button/Button";
import { NavItemProps } from "@/components/Navbar/Navbar";
import { getSessionId, removeSessionId } from "@/utils/index";
import { SessionData } from "@/interfaces/storage";

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
    icon: <User />,
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
    href: "",
    icon: <User />,
  },
];
Object.freeze(navLoggedInItems);

export default function NavbarRight() {
  const [dropdown, setDropdown] = useState(false);
  const [session, setSession] = useState<SessionData>();
  const [navList, setNavList] = useState(navSecondItems);

  const router = useRouter();
  const storageSession = getSessionId();

  useEffect(() => {
    if (!storageSession) {
      setNavList(navSecondItems);
    } else {
      setNavList(navLoggedInItems);
    }
  }, [storageSession]);

  useEffect(() => {
    setSession(storageSession);
  }, [navList]);

  const handleSignout = () => {
    removeSessionId();
    setNavList(navSecondItems);
  };

  return (
    <div className={styles.navItems}>
      {navList.map((item, index) => {
        return (
          <div key={index}>
            <Link
              key={item.label}
              onMouseEnter={() => item.label === "Account" && setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              data-dropdown={dropdown}
              className={styles.navItem}
              href={item.href ? `${item.href}` : ""}
            >
              <Button
                startIcon={item?.icon}
                variant={item?.variant}
                size={item?.size}
                className={
                  item.label === "Account" ? styles.accountItem : undefined
                }
                selected={router.pathname.includes(item?.href || "")}
              >
                <p>{item.label}</p>
              </Button>
            </Link>
            {item.label === "Account" && (
              <div
                className={styles.navAccount}
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                data-dropdown={dropdown}
              >
                <div className={styles.navAccountUsername}>
                  <p className={styles.navAccountTitle}>ACCOUNT</p>
                  <p className={styles.navAccountName}>{session?.username}</p>
                </div>
                <div className={styles.signoutButton}>
                  <Button onClick={handleSignout} variant="contained-outlined">
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
