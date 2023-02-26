import React from "react";
import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { GetServerSideProps, GetStaticProps } from "next";
import { Account } from "@/interfaces/account";

interface ApproveProps {
  sessionId: string;
  accountInfo: Account;
  approved: boolean;
}

export default function Approve(props: ApproveProps) {
  const { sessionId, accountInfo, approved } = props;
  console.log(sessionId);
  console.log(accountInfo);
  console.log(approved);
  return <div>Approved!!</div>;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;

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
  const sessionId = session.session_id;

  const account = await fetch(
    `${TMDB_REQUEST_URL}/account${API_KEY}&session_id=${sessionId}`
  );

  const accountInfo = await account.json();
  const approved = query.approved;
  return {
    props: { sessionId, accountInfo, approved, genre },
  };
};

// if (login.success) {
//   setErrMessage("");
//   setLoginSuccess(true);
//   setSessionId({
//     sessionId: login.guest_session_id,
//     isGuest: false,
//   });
//   router.push("/");
// } else {
//   setErrMessage("Failed to login");
// }
