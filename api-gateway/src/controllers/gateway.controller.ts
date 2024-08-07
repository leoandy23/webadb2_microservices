import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Headers,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  // DECLARAR URLS DE LOS SERVICIOS
  private readonly URL_AUTH_SERVICE =
    'https://auth-service-production-b371.up.railway.app';
  private readonly URL_USER_SERVICE =
    'https://user-service-production-b8a7.up.railway.app';
  private readonly URL_PROJECT_SERVICE =
    'https://project-service-production.up.railway.app';
  private readonly URL_TASK_SERVICE =
    'https://task-service-production-376b.up.railway.app';

  // private readonly URL_AUTH_SERVICE = 'http://localhost:3001';
  // private readonly URL_USER_SERVICE = 'http://localhost:3002';
  // private readonly URL_PROJECT_SERVICE = 'http://localhost:3003';
  // private readonly URL_TASK_SERVICE = 'http://localhost:3004';

  constructor(private readonly httpService: HttpService) {}

  // AUTH CONTROLLER ENDPOINTS
  @Post('auth/login')
  async login(@Body() body) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.URL_AUTH_SERVICE}/auth/login`, body),
      );
      return response.data;
    } catch (error) {
      // Maneja el error aquí
      console.error('Error en login:', error.response?.data || error.message);
      throw new HttpException(
        'Error al conectar con el servicio de autenticación',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('auth/register')
  async register(@Body() body) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.URL_AUTH_SERVICE}/auth/register`, body),
    );
    return response.data;
  }

  @Post('auth/send-password-reset-email')
  async sendPasswordResetEmail(@Body('email') email: string) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.URL_AUTH_SERVICE}/auth/send-password-reset-email`,
        { email },
      ),
    );
    return response.data;
  }

  @Post('auth/reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.URL_AUTH_SERVICE}/auth/reset-password`, {
        token,
        newPassword,
      }),
    );
    return response.data;
  }

  @Get('auth/validate-token')
  async validateToken(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new HttpException(
        'Authorization header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.URL_AUTH_SERVICE}/auth/validate-token`, {
          headers: {
            Authorization: authHeader,
          },
        }),
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // USERS CONTROLLER ENDPOINTS
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async getUsers(@Headers('authorization') authHeader: string) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL_USER_SERVICE}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users/:id')
  async getUser(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL_USER_SERVICE}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @Post('users')
  async createUser(@Body() body) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.URL_USER_SERVICE}/users`, body),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.put(`${this.URL_USER_SERVICE}/users/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('users/:id')
  async removeUser(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.delete(`${this.URL_USER_SERVICE}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  // PROJECTS CONTROLLER ENDPOINTS
  @UseGuards(AuthGuard('jwt'))
  @Post('projects')
  async createProject(
    @Body() body,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.post(`${this.URL_PROJECT_SERVICE}/projects`, body, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('projects')
  async getProjects(@Headers('authorization') authHeader: string) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL_PROJECT_SERVICE}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('projects/:id')
  async getProject(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL_PROJECT_SERVICE}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('projects/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() body,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.patch(
        `${this.URL_PROJECT_SERVICE}/projects/${id}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('projects/:id')
  async removeProject(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.delete(`${this.URL_PROJECT_SERVICE}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('projects/recent/:userId')
  async findRecentProjects(
    @Param('userId') userId: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.URL_PROJECT_SERVICE}/projects/recent/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('projects/user/:userId')
  async findProjectsByUser(
    @Param('userId') userId: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.URL_PROJECT_SERVICE}/projects/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return response.data;
  }

  // TASKS CONTROLLER ENDPOINTS
  @UseGuards(AuthGuard('jwt'))
  @Post('tasks')
  async createTask(@Body() body, @Headers('authorization') authHeader: string) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.post(`${this.URL_TASK_SERVICE}/tasks`, body, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('tasks')
  async getTasks(@Headers('authorization') authHeader: string) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL_TASK_SERVICE}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('tasks/:id')
  async getTask(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL_TASK_SERVICE}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('tasks/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() body,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.patch(`${this.URL_TASK_SERVICE}/tasks/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('tasks/:id')
  async removeTask(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.delete(`${this.URL_TASK_SERVICE}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('tasks/project/:projectId')
  async findTasksByProjectId(
    @Param('projectId') projectId: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(
        `${this.URL_TASK_SERVICE}/tasks/project/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('tasks/gettask/:id')
  async getTaskById(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL_TASK_SERVICE}/tasks/gettask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('tasks/user/:userId')
  async findTasksByUserId(
    @Param('userId') userId: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL_TASK_SERVICE}/tasks/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  // TASK ASSIGNMENTS CONTROLLER ENDPOINTS
  @UseGuards(AuthGuard('jwt'))
  @Post('task-assignments')
  async createTaskAssignment(
    @Body() body,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.post(`${this.URL_TASK_SERVICE}/task-assignments`, body, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('task-assignments')
  async getTaskAssignments(@Headers('authorization') authHeader: string) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL_TASK_SERVICE}/task-assignments`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('task-assignments/:id')
  async getTaskAssignment(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.get(`${this.URL_TASK_SERVICE}/task-assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('task-assignments/:idtask')
  async updateTaskAssignment(
    @Param('idtask') idtask: string,
    @Body() body,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.patch(
        `${this.URL_TASK_SERVICE}/task-assignments/${idtask}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return response.data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('task-assignments/:id')
  async removeTaskAssignment(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = this.extractToken(authHeader);
    const response = await firstValueFrom(
      this.httpService.delete(
        `${this.URL_TASK_SERVICE}/task-assignments/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );
    return response.data;
  }

  // Helper method to extract the token from the 'Authorization' header
  private extractToken(authHeader: string): string {
    if (!authHeader) {
      throw new HttpException(
        'Authorization header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new HttpException(
        'Invalid Authorization header format',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return parts[1];
  }
}
