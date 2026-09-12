import { ParseUUIDPipe } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ApiException } from '../exception/api.exception.js';
import { ResponseCode } from '../constant/response-code.js';

export class AppParseUUIDPipe extends ParseUUIDPipe {
  constructor(
    @InjectPinoLogger(AppParseUUIDPipe.name)
    private readonly logger: PinoLogger,
  ) {
    super({
      exceptionFactory: () => {
        this.logger.error({
          methodName: 'AppParseUUIDPipe',
          message: 'Invalid UUID format',
        });

        return new ApiException(
          ResponseCode.BAD_REQUEST,
          'Invalid UUID format',
        );
      },
    });
  }
}
