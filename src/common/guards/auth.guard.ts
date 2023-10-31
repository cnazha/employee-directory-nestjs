import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from '@nestjs/apollo';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    try {
      const ctx = GqlExecutionContext.create(context);
      const authHeader = ctx.getContext().req.headers.authorization;
      const token = authHeader.split(' ')[1];
      if (!token) {
        return false;
      }
      // TODO - verify token with JWT or use Firebase Auth
      // Currently returning true for testing purposes
      return true;
    } catch (e) {
      // Fall back to throwing a Graphql auth error
      throw new AuthenticationError(e.message);
    }
  }
}
