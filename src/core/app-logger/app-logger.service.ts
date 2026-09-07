import { Injectable, Scope } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService extends PinoLogger {
  private messageTemplate = 'methodName: %s, request: %o, response: %o';

  apiInfo(
    methodName: string,
    request: unknown,
    response: unknown,
    ...extraInfo: unknown[]
  ): void {
    this.info(
      this.messageTemplate,
      methodName,
      request,
      response,
      ...extraInfo,
    );
  }

  apiError(
    methodName: string,
    request: unknown,
    response: unknown,
    ...extraInfo: unknown[]
  ): void {
    this.error(
      this.messageTemplate,
      methodName,
      request,
      response,
      ...extraInfo,
    );
  }
}
