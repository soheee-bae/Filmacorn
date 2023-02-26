import { SessionData } from "@/interfaces/storage";
import { getFromLocal, setToLocal } from "./storage";

export function getSessionId() {
  return getFromLocal(`local_storage_key/session`);
}

export function setSessionId(sessionData: SessionData) {
  return setToLocal(`local_storage_key/session`, sessionData);
}
