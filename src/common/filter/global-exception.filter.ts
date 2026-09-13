import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiException } from '../exception/api.exception.js';
import { ApiResponse } from '../response/api.response.js';
import { ResponseCode } from '../constant/response-code.js';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): Response {
    const methodName = this.catch.name;
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    if (exception instanceof ApiException) {
      return response
        .status(exception.getStatus())
        .json(new ApiResponse(exception.getResponseCode(), exception.message));
    }

    if (exception instanceof NotFoundException) {
      this.logger.error({
        methodName,
        message: 'Not found exception',
        error: JSON.stringify(exception),
      });

      return response
        .status(exception.getStatus())
        .json(new ApiResponse(ResponseCode.NOT_FOUND, exception.message));
    }

    this.logger.error({
      methodName,
      message: 'Unknown exception',
      error: JSON.stringify(exception),
    });

    return response
      .status(500)
      .json(new ApiResponse(ResponseCode.INTERNAL_SERVER_ERROR));
  }
}
