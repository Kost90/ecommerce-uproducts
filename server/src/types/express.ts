import 'express';
import { SessionData } from 'express-session';

declare module 'express' {
  interface Request {
    matchedData?: any;
    // session: {
    //   jwt?: string;
    // };
  }
}

declare module 'express-session' {
  interface SessionData {
    jwt?: string;
  }
}
