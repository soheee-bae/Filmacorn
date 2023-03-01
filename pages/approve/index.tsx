import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { setSessionId } from "@/utils/index";
import { CheckCircle } from "@/icons/index";
import styles from "./Approve.module.scss";
import { Account } from "@/interfaces/account";
import { fetchGenre } from "@/helpers/handleGenre";
import { createSession, fetchAccount } from "@/helpers/handleAuth";

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
        accountId: account.id,
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

  const session = await createSession(query?.request_token as string);
  const sessionId = session?.session_id;

  const genre = await fetchGenre();
  const account = await fetchAccount(sessionId);

  return {
    props: { sessionId, account, approved, genre },
  };
};
