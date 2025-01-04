import { Response } from 'express';

class ErrorHandler {
  // TODO: Make error handling for multer

  validation(message: string, statusCode: number, res: Response) {
    res.status(statusCode).json({
      error: {
        type: 'Validation Error',
        message,
        statusCode,
      },
    });
  }

  standard(err: Error, statusCode: number, res: Response) {
    res.status(statusCode).json({
      error: {
        type: 'Standard Error',
        message: err.message,
        statusCode,
      },
    });
  }
}

export default ErrorHandler;
