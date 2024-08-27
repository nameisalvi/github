import { Controller, Post, Request, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: UserLoginRequestDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      return { status: 401, message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
}
