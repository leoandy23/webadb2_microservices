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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const project_entity_1 = require("../projects/entities/project.entity");
const task_assignment_entity_1 = require("../task-assignments/entities/task-assignment.entity");
let TasksService = class TasksService {
    constructor(tasksRepository, projectsRepository, taskAssignmentsRepository) {
        this.tasksRepository = tasksRepository;
        this.projectsRepository = projectsRepository;
        this.taskAssignmentsRepository = taskAssignmentsRepository;
    }
    async findAll() {
        return this.tasksRepository.find({ relations: ['project_id'] });
    }
    async findOne(id) {
        return this.tasksRepository.findOne({
            where: { id: id },
            relations: ['project_id'],
        });
    }
    async create(createTaskDto) {
        const project = await this.projectsRepository.findOne({
            where: { id: createTaskDto.project_id },
        });
        if (!project) {
            throw new Error('Project not found');
        }
        const newTask = this.tasksRepository.create({
            ...createTaskDto,
            project_id: project,
            status: createTaskDto.status,
        });
        return this.tasksRepository.save(newTask);
    }
    async update(id, updateTaskDto) {
        const task = await this.tasksRepository.findOne({ where: { id: id } });
        if (!task) {
            throw new Error('Task not found');
        }
        if (updateTaskDto.project_id) {
            const project = await this.projectsRepository.findOne({
                where: { id: updateTaskDto.project_id },
            });
            if (!project) {
                throw new Error('Project not found');
            }
            task.project_id = project;
        }
        if (updateTaskDto.title !== undefined) {
            task.title = updateTaskDto.title;
        }
        if (updateTaskDto.description !== undefined) {
            task.description = updateTaskDto.description;
        }
        if (updateTaskDto.status !== undefined) {
            task.status = updateTaskDto.status;
        }
        return this.tasksRepository.save(task);
    }
    async remove(id) {
        await this.tasksRepository.delete(id);
    }
    async findByProjectId(projectId) {
        const tasks = await this.tasksRepository.find({
            where: { project_id: { id: projectId } },
            relations: ['project_id'],
            order: { updated_at: 'DESC' },
        });
        const taskList = [];
        for (const task of tasks) {
            const assignment = await this.taskAssignmentsRepository
                .createQueryBuilder('assignment')
                .leftJoinAndSelect('assignment.user_id', 'user')
                .select([
                'assignment.id',
                'user.id',
                'user.first_name',
                'user.last_name',
                'assignment.assigned_at',
            ])
                .where('assignment.task_id = :taskId', { taskId: task.id })
                .getOne();
            const taskData = {
                id: task.id,
                title: task.title,
                description: task.description,
                status: task.status,
                created_at: task.created_at,
                updated_at: task.updated_at,
                project_id: task.project_id.id,
                assigned_to: assignment ? assignment.user_id : null,
            };
            taskList.push(taskData);
        }
        return taskList;
    }
    async findById(id) {
        const task = await this.tasksRepository.findOne({
            where: { id: id },
            relations: ['project_id'],
        });
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }
        const assignment = await this.taskAssignmentsRepository
            .createQueryBuilder('assignment')
            .leftJoinAndSelect('assignment.user_id', 'user')
            .select([
            'assignment.id',
            'user.id',
            'user.first_name',
            'user.last_name',
            'assignment.assigned_at',
        ])
            .where('assignment.task_id = :taskId', { taskId: task.id })
            .getOne();
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            created_at: task.created_at,
            updated_at: task.updated_at,
            project_id: task.project_id.id,
            assigned_to: assignment
                ? {
                    id: assignment.user_id.id,
                    first_name: assignment.user_id.first_name,
                    last_name: assignment.user_id.last_name,
                }
                : null,
        };
    }
    async findByUserId(userId) {
        const assignments = await this.taskAssignmentsRepository.find({
            where: { user_id: { id: userId } },
            relations: ['task_id', 'task_id.project_id', 'user_id'],
        });
        const tasks = assignments.map((assignment) => ({
            id: assignment.task_id.id,
            title: assignment.task_id.title,
            description: assignment.task_id.description,
            status: assignment.task_id.status,
            created_at: assignment.task_id.created_at,
            updated_at: assignment.task_id.updated_at,
            project: {
                id: assignment.task_id.project_id.id,
                name: assignment.task_id.project_id.name,
                description: assignment.task_id.project_id.description,
                created_at: assignment.task_id.project_id.created_at,
                updated_at: assignment.task_id.project_id.updated_at,
            },
            assigned_to: {
                id: assignment.user_id.id,
                first_name: assignment.user_id.first_name,
                last_name: assignment.user_id.last_name,
            },
        }));
        return tasks;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(2, (0, typeorm_1.InjectRepository)(task_assignment_entity_1.TaskAssignment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map