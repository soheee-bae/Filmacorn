export interface Session {
  success: boolean;
  session_id: string;
}

export interface GuestSession {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface Token {
  success: boolean;
  expires_at: string;
  request_token: string;
}
