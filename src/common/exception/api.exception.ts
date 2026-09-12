import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseCode } from '../constant/response-code.js';

export class ApiException extends HttpException {
  constructor(
    private readonly responseCode: ResponseCode,
    message?: string,
    httpStatus?: HttpStatus,
  ) {
    super(
      {
        code: responseCode.getCode(),
        message: message ?? responseCode.getMessage(),
      },
      httpStatus ?? responseCode.getHttpStatus(),
    );
  }

  public getResponseCode(): ResponseCode {
    return this.responseCode;
  }
}
