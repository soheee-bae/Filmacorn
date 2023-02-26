import React, { useState } from "react";
import { GetStaticProps } from "next";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import styles from "./Signin.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { setSessionId } from "@/utils/index";
import { useRouter } from "next/router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleGuest = async () => {
    const guestSession = await fetch(
      `${TMDB_REQUEST_URL}/authentication/guest_session/new${API_KEY}`
    );
    const guest = await guestSession.json();
    if (guest.success) {
      setSessionId({
        sessionId: guest.guest_session_id,
        isGuest: true,
      });
    }
    router.push("/");
  };

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signin}>
        <p className={styles.signinLogo}>FILMACORN</p>

        <div className={styles.signinHeader}>
          <p className={styles.signinTitle}>Welcome back to Filmacorn</p>
          <p className={styles.signinSubtitle}>Let's get you signed in</p>
        </div>
        <div className={styles.signinFields}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <p className={styles.signInOptions}>
            Don't have an account?{" "}
            <Link href="https://www.themoviedb.org/signup" target="_blank">
              Register in TMDb
            </Link>
          </p>
        </div>
        <hr />
        <div className={styles.signinActions}>
          <Button variant="outlined" onClick={handleGuest}>
            Continue as Guest
          </Button>
          <Button variant="contained">Login</Button>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  /* Genre */
  const genreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const genres = await genreData.json();
  const genre = genres.genres;

  return {
    props: { genre },
  };
};
