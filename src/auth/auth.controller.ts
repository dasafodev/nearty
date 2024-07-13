import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.singUp(signUpDto.username, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(AuthGuard)
  logout(@Req() request: Request) {
    const authorizationHeader = request.headers['authorization'];
    const token = authorizationHeader
      ? authorizationHeader.split(' ')[1]
      : null;
    return this.authService.logout(token);
  }
}
