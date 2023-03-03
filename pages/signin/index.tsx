import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { AUTH } from "@/config/index";
import Button from "@/components/Button/Button";
import { setSessionId } from "@/utils/index";
import { createGuestSession, createToken } from "@/helpers/handleAuth";
import { fetchGenre } from "@/helpers/handleGenre";
import { GuestSession, Token } from "@/interfaces/auth";
import { Logo } from "@/icons/index";

import styles from "./Signin.module.scss";

interface SigninProps {
  guest: GuestSession;
  token: Token;
}

export default function SignIn(props: SigninProps) {
  const { guest, token } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleGuest = async () => {
    if (guest.success) {
      setSessionId({
        sessionId: guest.guest_session_id,
        isGuest: true,
        username: "guest",
        accountId: 0,
      });
      router.push("/");
    }
  };

  const handleLogin = async () => {
    if (token) {
      router.push("/");
      window.open(
        `${AUTH}${token}?redirect_to=https://filmacorn.vercel.app/approve`,
        "_blank"
      );
    }
  };

  const disabled = username === "" || password === "";

  return (
    <div className={styles.signinContainer}>
      <div className={styles.signin}>
        <Logo />
        <div className={styles.signinHeader}>
          <p className={styles.signinTitle}>Welcome back to Filmacorn</p>
          <p className={styles.signinSubtitle}>Let&apos;s get you signed in</p>
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
            Don&apos;t have an account?{" "}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const genre = await fetchGenre();
  const guest = await createGuestSession();
  const token = await createToken();
  return {
    props: { genre, guest, token },
  };
};
