import { Repository } from 'typeorm';
import { TaskAssignment } from './entities/task-assignment.entity';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { UpdateTaskAssignmentDto } from './dto/update-task-assignment.dto';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';
export declare class TaskAssignmentsService {
    private taskAssignmentsRepository;
    private tasksRepository;
    private usersRepository;
    constructor(taskAssignmentsRepository: Repository<TaskAssignment>, tasksRepository: Repository<Task>, usersRepository: Repository<User>);
    findAll(): Promise<TaskAssignment[]>;
    findOne(id: number): Promise<TaskAssignment>;
    create(createTaskAssignmentDto: CreateTaskAssignmentDto): Promise<TaskAssignment>;
    update(idtask: number, updateTaskAssignmentDto: UpdateTaskAssignmentDto): Promise<TaskAssignment>;
    remove(id: number): Promise<void>;
}
