import { TaskAssignmentsService } from './task-assignments.service';
import { CreateTaskAssignmentDto } from './dto/create-task-assignment.dto';
import { UpdateTaskAssignmentDto } from './dto/update-task-assignment.dto';
export declare class TaskAssignmentsController {
    private readonly taskAssignmentsService;
    constructor(taskAssignmentsService: TaskAssignmentsService);
    create(createTaskAssignmentDto: CreateTaskAssignmentDto): Promise<import("./entities/task-assignment.entity").TaskAssignment>;
    findAll(): Promise<import("./entities/task-assignment.entity").TaskAssignment[]>;
    findOne(id: string): Promise<import("./entities/task-assignment.entity").TaskAssignment>;
    update(idtask: string, updateTaskAssignmentDto: UpdateTaskAssignmentDto): Promise<import("./entities/task-assignment.entity").TaskAssignment>;
    remove(id: string): Promise<void>;
}
