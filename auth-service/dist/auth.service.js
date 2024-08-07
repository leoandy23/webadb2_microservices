"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const mailer_service_1 = require("./mailer.service");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService, mailerService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async validateUser(email, pass) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(pass, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const { password, ...result } = user;
        return result;
    }
    async login(email, password) {
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
    async register(email, password, firstName, lastName) {
        const existingUser = await this.usersRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists');
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
    async sendPasswordResetEmail(email) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const token = this.jwtService.sign({ email: user.email, sub: user.id }, { expiresIn: '1h' });
        const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
        const mailText = `Please click the following link to reset your password: ${resetUrl}`;
        await this.mailerService.sendMail(email, 'Password Reset', mailText);
    }
    async resetPassword(token, newPassword) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.usersRepository.findOne({
                where: { email: payload.email },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            return this.usersRepository.save(user);
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid or expired token');
        }
    }
    async validateToken(token) {
        try {
            const decoded = this.jwtService.verify(token);
            return !!decoded;
        }
        catch (error) {
            return false;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mailer_service_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map