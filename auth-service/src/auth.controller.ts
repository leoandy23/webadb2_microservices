import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.firstName,
      registerDto.lastName,
    );
  }

  @Post('send-password-reset-email')
  async sendPasswordResetEmail(@Body('email') email: string) {
    return this.authService.sendPasswordResetEmail(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }

  @Get('validate-token')
  async validateToken(@Headers('authorization') authorization: string) {
    const token = authorization?.split(' ')[1];
    if (!token) {
      return { valid: false };
    }
    const isValid = await this.authService.validateToken(token);
    return { valid: isValid };
  }
}
