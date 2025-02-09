export interface IResponse<T> {
  status: number;
  message: string;
  data?: T;
  error?: {
    statusCode: number;
    message: string;
    type: string;
  };
}
