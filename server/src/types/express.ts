import 'express';

declare module 'express' {
  interface Request {
    matchedData?: any;
  }
}