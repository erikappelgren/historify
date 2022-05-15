import { SessionData } from 'express-session'

declare module 'express-session' {
  interface SessionData {
    userName: string;
    displayName: string;
  }
}

export interface SessionWithUser {
  session: SessionData
}