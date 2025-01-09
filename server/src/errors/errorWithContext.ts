class ErrorWithContext extends Error {
  context: { [key: string]: string };
  statusCode: number;
  isValidation: boolean;

  constructor(context: { [key: string]: string }, message: string, statusCode: number, isValidation = false) {
    super(message);
    this.context = context || {};
    this.statusCode = statusCode || 500;
    this.isValidation = isValidation;

    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default ErrorWithContext;
