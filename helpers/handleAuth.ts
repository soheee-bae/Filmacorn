import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { GuestSession, Session, Token } from "@/interfaces/auth";

export const createToken = async () => {
  const res = await fetch(
    `${TMDB_REQUEST_URL}/authentication/token/new${API_KEY}`
  );
  const requestToken = await res.json();
  const token = requestToken.request_token;
  return token as Token;
};

export const createGuestSession = async () => {
  const guestSession = await fetch(
    `${TMDB_REQUEST_URL}/authentication/guest_session/new${API_KEY}`
  );
  const guest = await guestSession.json();
  return guest as GuestSession;
};

export const createSession = async (requestToken: string) => {
  const loginSession = await fetch(
    `${TMDB_REQUEST_URL}/authentication/session/new${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request_token: requestToken,
      }),
    }
  );
  const session = await loginSession.json();
  return session as Session;
};

export const fetchAccount = async (sessionId: string) => {
  const accountData = await fetch(
    `${TMDB_REQUEST_URL}/account${API_KEY}&session_id=${sessionId}`
  );
  const account = await accountData.json();
  return account;
};
