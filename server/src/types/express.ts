import 'express';
import { SessionData } from 'express-session';

declare module 'express' {
  interface Request {
    matchedData?: any;
    user?: any;
  }
}

declare module 'express-session' {
  interface SessionData {
    jwt?: string;
  }
}
