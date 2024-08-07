import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Asegúrate de que el secreto JWT sea el mismo en todos los servicios
    });
  }

  async validate(payload: any) {
    // Aquí puedes validar el payload JWT y devolver el usuario correspondiente
    return { userId: payload.sub, username: payload.username };
  }
}
