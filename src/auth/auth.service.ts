import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,

    private jwtService: JwtService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}

  saltOrRounds: number = 10;

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashPass = await bcrypt.hash(password, this.saltOrRounds);
    const newUser = await this.usersService.createUser({
      username,
      password: hashPass,
    });

    return { username: newUser.username };
  }

  async logout(token: string) {
    this.tokenBlacklistService.addToken(token);
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.tokenBlacklistService.isTokenBlacklisted(token);
  }
}
