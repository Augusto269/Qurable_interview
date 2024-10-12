import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidatePrivateKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const privateKey = process.env.PRIVATE_KEY;

    const keyInHeaders = req.headers['privatekey'];

    if (!privateKey) {
      throw new HttpException(
        'PrivateKey is not set in environment variables',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (keyInHeaders !== privateKey) {
      throw new HttpException('Invalid PrivateKey', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
