import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

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
}
