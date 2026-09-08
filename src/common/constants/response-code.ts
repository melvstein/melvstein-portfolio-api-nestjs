import { HttpStatus } from '@nestjs/common';

export class ResponseCode {
  private readonly code: string;
  private readonly message: string;
  private readonly httpStatus: HttpStatus;

  constructor(code: string, message: string, httpStatus: HttpStatus) {
    this.code = code;
    this.message = message;
    this.httpStatus = httpStatus;
  }

  getCode(): string {
    return this.code;
  }

  getMessage(): string {
    return this.message;
  }

  getHttpStatus(): HttpStatus {
    return this.httpStatus;
  }

  static SUCCESS = new ResponseCode('SUCCESS', 'Success', HttpStatus.OK);

  static INTERNAL_SERVER_ERROR = new ResponseCode(
    'INTERNAL_SERVER_ERROR',
    'Internal Server Error',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );

  static DUPLICATE_ENTRY = new ResponseCode(
    'DUPLICATE_ENTRY',
    'Duplicate Entry',
    HttpStatus.CONFLICT,
  );

  static BAD_REQUEST = new ResponseCode(
    'BAD_REQUEST',
    'Bad Request',
    HttpStatus.BAD_REQUEST,
  );

  static NOT_FOUND = new ResponseCode(
    'NOT_FOUND',
    'Not Found',
    HttpStatus.NOT_FOUND,
  );

  static find(code: string): ResponseCode | undefined {
    return Object.values(ResponseCode).find(
      (responseCode) => responseCode instanceof ResponseCode && responseCode.getCode() === code,
    ) as ResponseCode | undefined;
  }
}
