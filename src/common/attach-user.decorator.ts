import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export interface AuthUser {
  userId: number;
  username: string;
}

export const AttachUser = createParamDecorator(
  (_data, ctx: ExecutionContext): AuthUser => {
    return ctx.switchToHttp().getRequest().user;
  },
);
