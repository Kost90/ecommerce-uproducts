import { Express } from 'express';

class ResponseHelper {
  static successResponse = (data: any, statusCode: number, message: string | null = null) => {
    return {
      status: statusCode,
      data,
      message,
    };
  };

  static errorResponse = (message: string, statusCode: number) => {
    return {
      status: 'error',
      data: null,
      message,
      statusCode,
    };
  };
}

export default ResponseHelper;
