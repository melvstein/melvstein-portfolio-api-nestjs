import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseCode } from '../constants/response-code';

export class ApiException extends HttpException {
  constructor(
    responseCode: ResponseCode,
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
}
