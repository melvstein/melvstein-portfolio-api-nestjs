import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role } from '../decorator/role.decorator';

export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    this.reflector = reflector;
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(Role, context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    console.log(request);

    return true;
  }
}
