import { TResponseCode, ResponseCode } from './constants/response-code.js';

export class ApiResponse<T> {
  private readonly code!: number;
  private readonly message?: string;
  private readonly data?: T;

  constructor(responseCode: TResponseCode, message?: string, data?: T) {
    this.code = responseCode.code;
    this.message = message ?? responseCode.message;
    this.data = data;
  }

  static success<T>(): ApiResponse<T>;
  static success<T>(data: T): ApiResponse<T>;

  static success<T>(data?: T): ApiResponse<T> {
    return new ApiResponse<T>(ResponseCode.SUCCESS, undefined, data);
  }

  static internalServerError<T>(): ApiResponse<T> {
    return new ApiResponse<T>(ResponseCode.ERROR);
  }
}
