import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator.js';
import { RoleEnum } from '../enum/role.enum.js';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    this.reflector = reflector;
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();

    console.log('wtf', request.user);
    return true;
  }
}
