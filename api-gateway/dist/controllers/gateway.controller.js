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
exports.GatewayController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let GatewayController = class GatewayController {
    constructor(httpService) {
        this.httpService = httpService;
        this.URL_AUTH_SERVICE = 'http://localhost:3001';
        this.URL_USER_SERVICE = 'http://localhost:3002';
        this.URL_PROJECT_SERVICE = 'http://localhost:3003';
        this.URL_TASK_SERVICE = 'http://localhost:3004';
    }
    async login(body) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.URL_AUTH_SERVICE}/auth/login`, body));
        return response.data;
    }
    async register(body) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.URL_AUTH_SERVICE}/auth/register`, body));
        return response.data;
    }
    async sendPasswordResetEmail(email) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.URL_AUTH_SERVICE}/auth/send-password-reset-email`, { email }));
        return response.data;
    }
    async resetPassword(token, newPassword) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.URL_AUTH_SERVICE}/auth/reset-password`, {
            token,
            newPassword,
        }));
        return response.data;
    }
    async validateToken(authHeader) {
        if (!authHeader) {
            throw new common_1.HttpException('Authorization header is missing', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_AUTH_SERVICE}/auth/validate-token`, {
                headers: {
                    Authorization: authHeader,
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Invalid or expired token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async getUsers(authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_USER_SERVICE}/users`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async getUser(id, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_USER_SERVICE}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async createUser(body) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.URL_USER_SERVICE}/users`, body));
        return response.data;
    }
    async updateUser(id, body, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.put(`${this.URL_USER_SERVICE}/users/${id}`, body, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async removeUser(id, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`${this.URL_USER_SERVICE}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async createProject(body, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.URL_PROJECT_SERVICE}/projects`, body, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async getProjects(authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_PROJECT_SERVICE}/projects`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async getProject(id, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_PROJECT_SERVICE}/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async updateProject(id, body, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.patch(`${this.URL_PROJECT_SERVICE}/projects/${id}`, body, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async removeProject(id, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`${this.URL_PROJECT_SERVICE}/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async findRecentProjects(userId, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_PROJECT_SERVICE}/projects/recent/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async findProjectsByUser(userId, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_PROJECT_SERVICE}/projects/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async createTask(body, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.URL_TASK_SERVICE}/tasks`, body, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async getTasks(authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_TASK_SERVICE}/tasks`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async getTask(id, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_TASK_SERVICE}/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async updateTask(id, body, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.patch(`${this.URL_TASK_SERVICE}/tasks/${id}`, body, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async removeTask(id, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`${this.URL_TASK_SERVICE}/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async findTasksByProjectId(projectId, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_TASK_SERVICE}/tasks/project/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async getTaskById(id, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_TASK_SERVICE}/tasks/gettask/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async findTasksByUserId(userId, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_TASK_SERVICE}/tasks/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async createTaskAssignment(body, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.URL_TASK_SERVICE}/task-assignments`, body, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async getTaskAssignments(authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_TASK_SERVICE}/task-assignments`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async getTaskAssignment(id, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.URL_TASK_SERVICE}/task-assignments/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async updateTaskAssignment(idtask, body, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.patch(`${this.URL_TASK_SERVICE}/task-assignments/${idtask}`, body, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    async removeTaskAssignment(id, authHeader) {
        const token = this.extractToken(authHeader);
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`${this.URL_TASK_SERVICE}/task-assignments/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }));
        return response.data;
    }
    extractToken(authHeader) {
        if (!authHeader) {
            throw new common_1.HttpException('Authorization header is missing', common_1.HttpStatus.UNAUTHORIZED);
        }
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new common_1.HttpException('Invalid Authorization header format', common_1.HttpStatus.UNAUTHORIZED);
        }
        return parts[1];
    }
};
exports.GatewayController = GatewayController;
__decorate([
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('auth/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('auth/send-password-reset-email'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "sendPasswordResetEmail", null);
__decorate([
    (0, common_1.Post)('auth/reset-password'),
    __param(0, (0, common_1.Body)('token')),
    __param(1, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('auth/validate-token'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "validateToken", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "removeUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('projects'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "createProject", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('projects'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getProjects", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('projects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getProject", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('projects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "updateProject", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('projects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "removeProject", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('projects/recent/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "findRecentProjects", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('projects/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "findProjectsByUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('tasks'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "createTask", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('tasks'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getTasks", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getTask", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "updateTask", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "removeTask", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('tasks/project/:projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "findTasksByProjectId", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('tasks/gettask/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('tasks/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "findTasksByUserId", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('task-assignments'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "createTaskAssignment", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('task-assignments'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getTaskAssignments", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('task-assignments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getTaskAssignment", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('task-assignments/:idtask'),
    __param(0, (0, common_1.Param)('idtask')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "updateTaskAssignment", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('task-assignments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "removeTaskAssignment", null);
exports.GatewayController = GatewayController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], GatewayController);
//# sourceMappingURL=gateway.controller.js.map