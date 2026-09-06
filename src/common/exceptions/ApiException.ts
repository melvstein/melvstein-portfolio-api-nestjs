import { HttpException, HttpStatus } from '@nestjs/common';
import { type TResponseCode } from '../constants/response-code';

export class ApiException extends HttpException {
  constructor(
    responseCode: TResponseCode,
    message?: string,
    httpStatus?: HttpStatus,
  ) {
    super(
      {
        code: responseCode.code,
        message: message ?? responseCode.message,
      },
      httpStatus ?? responseCode.httpStatus,
    );
  }
}
