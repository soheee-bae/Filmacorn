import React, { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { API_KEY, AUTH, TMDB_REQUEST_URL } from "@/config/index";
import Button from "@/components/Button/Button";
import { setSessionId } from "@/utils/index";
import styles from "./Signin.module.scss";

export default function SignIn() {
  const [username, setUsername] = useState("");
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
        username: "guest",
      });
      router.push("/");
    }
  };

  const handleLogin = async () => {
    const res = await fetch(
      `${TMDB_REQUEST_URL}/authentication/token/new${API_KEY}`
    );
    const requestToken = await res.json();
    const token = requestToken.request_token;

    window.open(
      `${AUTH}${token}?redirect_to=http://localhost:3000/approve`,
      "_blank"
    );
  };

  const disabled = username === "" || password === "";

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
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            required
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
          <Button disabled={disabled} variant="contained" onClick={handleLogin}>
            Login
          </Button>
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
