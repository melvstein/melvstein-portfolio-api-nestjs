import { ResponseCode } from '../constant/response-code.js';

export class ApiResponse<T> {
  private readonly code!: string;
  private readonly message?: string;
  private readonly httpStatus: number;
  private readonly data?: T;

  constructor(responseCode: ResponseCode, message?: string, data?: T) {
    this.code = responseCode.getCode();
    this.message = message ?? responseCode.getMessage();
    this.httpStatus = responseCode.getHttpStatus();
    this.data = data;

    Object.defineProperty(this, 'httpStatus', {
      value: responseCode.getHttpStatus(),
      enumerable: false,
    });
  }

  getCode(): string {
    return this.code;
  }

  getMessage(): string | undefined {
    return this.message;
  }

  getHttpStatus(): number {
    return this.httpStatus;
  }

  getData(): T | undefined {
    return this.data;
  }

  static success<T>(): ApiResponse<T>;
  static success<T>(data: T): ApiResponse<T>;
  static success<T>(data: T, message: string): ApiResponse<T>;

  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return new ApiResponse<T>(
      ResponseCode.SUCCESS,
      message ?? ResponseCode.SUCCESS.getMessage(),
      data,
    );
  }

  static internalServerError<T>(): ApiResponse<T>;
  static internalServerError<T>(message: string): ApiResponse<T>;

  static internalServerError<T>(message?: string): ApiResponse<T> {
    return new ApiResponse<T>(
      ResponseCode.INTERNAL_SERVER_ERROR,
      message ?? ResponseCode.INTERNAL_SERVER_ERROR.getMessage(),
    );
  }
}
