import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from '../projects/entities/project.entity';
import { TaskAssignment } from '../task-assignments/entities/task-assignment.entity';
export declare class TasksService {
    private tasksRepository;
    private projectsRepository;
    private taskAssignmentsRepository;
    constructor(tasksRepository: Repository<Task>, projectsRepository: Repository<Project>, taskAssignmentsRepository: Repository<TaskAssignment>);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: number): Promise<void>;
    findByProjectId(projectId: number): Promise<any[]>;
    findById(id: number): Promise<any>;
    findByUserId(userId: number): Promise<any[]>;
}
