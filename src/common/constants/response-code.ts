import { HttpStatus } from '@nestjs/common';

export const ResponseCode = {
  SUCCESS: {
    code: 'SUCCESS',
    message: 'Success',
    httpStatus: HttpStatus.OK,
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal Server Error',
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  DUPLICATE_ENTRY: {
    code: 'DUPLICATE_ENTRY',
    message: 'Duplicate Entry',
    httpStatus: HttpStatus.CONFLICT,
  },
} as const;

export type TResponseCode = (typeof ResponseCode)[keyof typeof ResponseCode];
