import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            first_name: any;
            last_name: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<import("./entities/user.entity").User>;
    sendPasswordResetEmail(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<import("./entities/user.entity").User>;
    validateToken(authorization: string): Promise<{
        valid: boolean;
    }>;
}
