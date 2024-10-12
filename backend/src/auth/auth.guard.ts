import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
/**
 * AuthGuard - A basic authentication guard to protect endpoints.
 *
 * This guard checks that the request contains an authorization header
 * with a token that matches the private key configured in the environment variables.
 *
 * **Note:** This implementation of `PRIVATE_KEY` is basic and is only used for
 * demonstration purposes.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const tokenValid = process.env.PRIVATE_KEY;

    console.log('authHeader', authHeader);
    console.log('tokenValid', tokenValid);
    if (!authHeader || authHeader !== tokenValid) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
}
