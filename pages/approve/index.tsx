import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { setSessionId } from "@/utils/index";
import { CheckCircle } from "@/icons/index";
import styles from "./Approve.module.scss";
import { Account } from "@/interfaces/account";

interface ApproveProps {
  sessionId: string;
  account: Account;
  approved: boolean;
}

export default function Approve(props: ApproveProps) {
  const { sessionId, account, approved } = props;
  const router = useRouter();

  useEffect(() => {
    if (approved) {
      setSessionId({
        sessionId: sessionId,
        isGuest: false,
        username: account.username,
      });
    }
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);

  return (
    <div className={styles.approve}>
      {approved ? (
        <div className={styles.approveContainer}>
          <CheckCircle />
          <p className={styles.approveTitle}>Login was successful!</p>
          <p className={styles.approveSubtitle}>
            You will be redirected to the homepage...
          </p>
        </div>
      ) : (
        <div className={styles.approveContainer}>
          <p className={styles.approveTitle}>Login Failed </p>
          <p className={styles.approveSubtitle}>Please try again </p>
          <p className={styles.approveHelper}>
            Go back to <Link href="/signin">SignIn page</Link>
          </p>
        </div>
      )}
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  const approved = query.approved;

  /* Genre */
  const genreData = await fetch(
    `${TMDB_REQUEST_URL}/genre/movie/list${API_KEY}&include_adult=false`
  );
  const genres = await genreData.json();
  const genre = genres.genres;

  const loginSession = await fetch(
    `${TMDB_REQUEST_URL}/authentication/session/new${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request_token: query.request_token,
      }),
    }
  );

  const session = await loginSession.json();
  const sessionId = session?.session_id || 0;

  const accountData = await fetch(
    `${TMDB_REQUEST_URL}/account${API_KEY}&session_id=${sessionId}`
  );
  const account = await accountData.json();

  return {
    props: { sessionId, account, approved, genre },
  };
};
