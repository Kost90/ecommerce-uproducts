import { Request, Response, NextFunction } from 'express';
import ResponseHelper from '../helpers/responseHelper';
import HttpCodesHelper from '../helpers/httpCodeHelper';

declare global {
  namespace Express {
    interface Response {
      success: (data: any, statusCode?: number, message?: string | null) => void;
    }
  }
}

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.success = (data: any, statusCode: number = HttpCodesHelper.OK, message: string | null = null) => {
    res.json(ResponseHelper.successResponse(data, statusCode, message));
  };

  next();
};

export default responseMiddleware;
