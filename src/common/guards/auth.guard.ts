import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { Request } from 'express';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    console.log(`this is from guard: ${request.method} ${request.url}`);
    return true;
  }
}
