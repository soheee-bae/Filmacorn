import Link from "next/link";
import styles from "./NavbarRight.module.scss";

import { Search } from "@/icons/index";
import Button from "@/components/Button/Button";
import { NavItemProps } from "@/components/Navbar/Navbar";

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

export default function NavbarRight() {
  const handleOnClick = (): void => {};
  return (
    <div className={styles.navItems}>
      {navSecondItems.map((item) => (
        <Link key={item.label} className={styles.navItem} href="">
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
  );
}
