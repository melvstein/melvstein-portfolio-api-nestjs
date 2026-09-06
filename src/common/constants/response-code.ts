import { HttpStatus } from '@nestjs/common';

export const ResponseCode = {
  SUCCESS: {
    code: 0,
    message: 'Success',
    httpStatus: HttpStatus.OK,
  },
  ERROR: {
    code: 1,
    message: 'Error',
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  },
} as const;

export type TResponseCode = (typeof ResponseCode)[keyof typeof ResponseCode];
