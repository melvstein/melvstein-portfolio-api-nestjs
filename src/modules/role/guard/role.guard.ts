import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator.js';
import { RoleEnum } from '../enum/role.enum.js';
import { UserDetails } from '../../user/type/user-details.type.js';

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
    const user = request.user as UserDetails;

    if (!user) {
      return false;
    }

    if (requiredRoles.includes(user.role)) {
      return true;
    }

    return false;
  }
}
