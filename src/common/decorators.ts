import {
  NestMiddleware,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(private _role: string) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    console.log(context.switchToHttp().getRequest().user.role);

    if (context.switchToHttp().getRequest().user.role !== this._role) {
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}