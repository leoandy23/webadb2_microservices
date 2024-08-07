import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { MailerService } from './mailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    };
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
    });

    return this.usersRepository.save(newUser);
  }

  // Implementación de la función para enviar email de recuperación de contraseña
  async sendPasswordResetEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { expiresIn: '1h' },
    );
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
    const mailText = `Please click the following link to reset your password: ${resetUrl}`;
    await this.mailerService.sendMail(email, 'Password Reset', mailText); // Uncomment if you have a mailer service
  }

  // Implementación de la función para resetear contraseña
  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersRepository.findOne({
        where: { email: payload.email },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      return this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }

  // Implementación de la función para validar el token
  async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      return !!decoded;
    } catch (error) {
      return false;
    }
  }
}
