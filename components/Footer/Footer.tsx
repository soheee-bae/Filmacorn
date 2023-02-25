import Link from "next/link";
import { Email, Github, Linkedin } from "@/icons/index";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerMediaIcons}>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/sohee-bae-b37a9a166/"
        >
          <Linkedin />
        </Link>
        <Link target="_blank" href="mailto:baesoheee@gmail.com">
          <Email />
        </Link>
        <Link target="_blank" href="https://github.com/soheee-bae">
          <Github />
        </Link>
      </div>
      <p>&#169; 2023 SOHEEBAE. All rights reserved. </p>
    </div>
  );
}
