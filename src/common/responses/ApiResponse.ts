import { TResponseCode, ResponseCode } from '../constants/response-code.js';

export class ApiResponse<T> {
  private readonly code!: string;
  private readonly message?: string;
  private readonly data?: T;

  constructor(responseCode: TResponseCode, message?: string, data?: T) {
    this.code = responseCode.code;
    this.message = message ?? responseCode.message;
    this.data = data;
  }

  static success<T>(): ApiResponse<T>;
  static success<T>(data: T): ApiResponse<T>;
  static success<T>(data: T, message: string): ApiResponse<T>;

  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return new ApiResponse<T>(
      ResponseCode.SUCCESS,
      message ?? ResponseCode.SUCCESS.message,
      data,
    );
  }

  static internalServerError<T>(): ApiResponse<T>;
  static internalServerError<T>(message: string): ApiResponse<T>;

  static internalServerError<T>(message?: string): ApiResponse<T> {
    return new ApiResponse<T>(
      ResponseCode.INTERNAL_SERVER_ERROR,
      message ?? ResponseCode.INTERNAL_SERVER_ERROR.message,
    );
  }
}
