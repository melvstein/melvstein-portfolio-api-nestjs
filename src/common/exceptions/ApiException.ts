import { HttpException, HttpStatus } from '@nestjs/common';
import { type TResponseCode } from '../constants/response-code';

export class ApiException extends HttpException {
  responseCode: TResponseCode;
  message: string;
  httpStatus: HttpStatus;

  constructor(
    responseCode: TResponseCode,
    message?: string,
    httpStatus?: HttpStatus,
  ) {
    super(
      message ?? responseCode.message,
      httpStatus ?? responseCode.httpStatus,
    );
    this.responseCode = responseCode;
    this.message = message ?? responseCode.message;
    this.httpStatus = httpStatus ?? responseCode.httpStatus;
  }
}
