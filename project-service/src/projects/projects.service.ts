import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Método para obtener todos los proyectos
  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({ relations: ['created_by'] });
  }

  // Método para encontrar un proyecto por ID
  async findOne(id: number): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id: id },
      relations: ['created_by'],
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }

  // Método para crear un nuevo proyecto
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const user = await this.usersRepository.findOne({
      where: { id: createProjectDto.created_by },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newProject = this.projectsRepository.create({
      ...createProjectDto,
      created_by: user,
    });

    return this.projectsRepository.save(newProject);
  }

  // Método para actualizar un proyecto
  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    await this.projectsRepository.update(id, updateProjectDto);
    return this.projectsRepository.findOne({ where: { id } });
  }

  // Método para eliminar un proyecto
  async remove(id: number): Promise<void> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    await this.projectsRepository.delete(id);
  }

  // Método para encontrar proyectos recientes de un usuario
  async findRecentProjects(userId: number): Promise<Project[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.projectsRepository.find({
      where: { created_by: { id: user.id } },
      order: { created_at: 'DESC' },
      take: 2,
    });
  }

  // Método para buscar los proyectos de un usuario
  async findUserProjects(userId: number): Promise<Project[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.projectsRepository.find({
      where: { created_by: { id: user.id } },
      order: { created_at: 'DESC' },
    });
  }
}
