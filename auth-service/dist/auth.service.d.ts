import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { MailerService } from './mailer.service';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    private mailerService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, mailerService: MailerService);
    validateUser(email: string, pass: string): Promise<any>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            first_name: any;
            last_name: any;
        };
    }>;
    register(email: string, password: string, firstName: string, lastName: string): Promise<User>;
    sendPasswordResetEmail(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<User>;
    validateToken(token: string): Promise<boolean>;
}
