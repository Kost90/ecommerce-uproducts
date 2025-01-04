class ErrorWithContext extends Error {
  context: { [key: string]: string };
  statusCode: number;
  isValidation: boolean;

  constructor(context: { [key: string]: string }, message: string, statusCode: number, isValidation = false) {
    super();
    this.context = context;
    this.context.type = 'context';
    this.message = message;
    this.statusCode = statusCode;
    this.isValidation = isValidation;
  }
}

export default ErrorWithContext;
