import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private transactionsService: TransactionsService,
    private jwtService: JwtService,
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
    this.transactionsService.create({
      transaction: 'login',
      user,
      query: user.username,
    });
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
    this.transactionsService.create({
      transaction: 'register',
      user: newUser,
      query: username,
    });
    return { username: newUser.username };
  }
}
