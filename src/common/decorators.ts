import {
  NestMiddleware,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { NextFunction } from 'express';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export function roleProtector(req: any, res: Response, next: NextFunction) {
  console.log(`role play`, req.user);
  next();
}
