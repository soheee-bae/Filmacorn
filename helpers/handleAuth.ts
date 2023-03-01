import { API_KEY, TMDB_REQUEST_URL } from "@/config/index";
import { Session, Token } from "@/interfaces/auth";

export const createToken = async () => {
  const res = await fetch(
    `${TMDB_REQUEST_URL}/authentication/token/new${API_KEY}`
  );
  const requestToken = await res.json();
  const token = requestToken.request_token;
  return token as Token;
};

export const createSession = async () => {
  const guestSession = await fetch(
    `${TMDB_REQUEST_URL}/authentication/guest_session/new${API_KEY}`
  );
  const guest = await guestSession.json();
  return guest as Session;
};
