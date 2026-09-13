import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { catchError, Observable, tap, map } from 'rxjs';
import { ApiException } from '../exception/api.exception.js';
import { ApiResponse } from '../response/api.response.js';
import { Role } from 'src/modules/role/type/role.type.js';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    console.log('Before...');

    const now = Date.now();
    const request: Request = await context.switchToHttp().getRequest();
    const response: Response = await context.switchToHttp().getResponse();

    console.log(`Request: ${request.method} ${request.url}`);
    console.log(`Request Body: ${JSON.stringify(request.body)}`);

    return next.handle().pipe(
      tap((data) => {
        console.log(`After... ${Date.now() - now}ms`);
        console.log(`Response Data: ${JSON.stringify(data)}`);
        console.log(`Response Status: ${response.statusCode}`);
      }),
      map((data: ApiResponse<Role | Role[] | null>) => {
        console.log(`Mapping Data: ${JSON.stringify(data)}`);

        return data;
      }),
      catchError((err) => {
        console.error(`Error... ${Date.now() - now}ms`, err);

        if (err instanceof ApiException) {
          console.error(`ApiException...${JSON.stringify(err.getResponse())}`);
        }

        throw err;
      }),
    );
  }
}
