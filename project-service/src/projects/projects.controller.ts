import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@ApiTags('projects')
@Controller('projects')
@UseGuards(JwtAuthGuard) // Aplica el guard de JWT a todos los endpoints
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Endpoint para crear un proyecto
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  // Endpoint para obtener todos los proyectos
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  // Endpoint para obtener un proyecto por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  // Endpoint para actualizar un proyecto por ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  // Endpoint para eliminar un proyecto por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  // Endpoint para obtener proyectos recientes de un usuario
  @Get('recent/:userId')
  findRecentProjects(@Param('userId') userId: string) {
    return this.projectsService.findRecentProjects(+userId);
  }

  // Endpoint para obtener proyectos de un usuario
  @Get('user/:userId')
  findProjectsByUser(@Param('userId') userId: string) {
    return this.projectsService.findUserProjects(+userId);
  }
}
