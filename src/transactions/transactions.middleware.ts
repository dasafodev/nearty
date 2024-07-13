import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { TransactionsService } from './transactions.service';

@Injectable()
export class TransactionsMiddleware implements NestMiddleware {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtSecret,
    });
    this.transactionsService.create({
      transaction: 'GET places',
      query: `${req.query.latitude},${req.query.longitude}`,
      userId: payload.sub,
    });
    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
