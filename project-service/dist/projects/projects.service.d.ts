import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from '../users/entities/user.entity';
export declare class ProjectsService {
    private projectsRepository;
    private usersRepository;
    constructor(projectsRepository: Repository<Project>, usersRepository: Repository<User>);
    findAll(): Promise<Project[]>;
    findOne(id: number): Promise<Project>;
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: number): Promise<void>;
    findRecentProjects(userId: number): Promise<Project[]>;
    findUserProjects(userId: number): Promise<Project[]>;
}
