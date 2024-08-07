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
exports.TaskAssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_assignment_entity_1 = require("./entities/task-assignment.entity");
const task_entity_1 = require("../tasks/entities/task.entity");
const user_entity_1 = require("../users/entities/user.entity");
let TaskAssignmentsService = class TaskAssignmentsService {
    constructor(taskAssignmentsRepository, tasksRepository, usersRepository) {
        this.taskAssignmentsRepository = taskAssignmentsRepository;
        this.tasksRepository = tasksRepository;
        this.usersRepository = usersRepository;
    }
    async findAll() {
        return this.taskAssignmentsRepository.find({
            relations: ['task_id', 'user_id'],
        });
    }
    async findOne(id) {
        return this.taskAssignmentsRepository.findOne({
            where: { id: id },
            relations: ['task_id', 'user_id'],
        });
    }
    async create(createTaskAssignmentDto) {
        const task = await this.tasksRepository.findOne({
            where: { id: createTaskAssignmentDto.task_id },
        });
        if (!task) {
            throw new Error('Task not found');
        }
        const user = await this.usersRepository.findOne({
            where: { id: createTaskAssignmentDto.user_id },
        });
        if (!user) {
            throw new Error('User not found');
        }
        const newTaskAssignment = this.taskAssignmentsRepository.create({
            ...createTaskAssignmentDto,
            task_id: task,
            user_id: user,
        });
        return this.taskAssignmentsRepository.save(newTaskAssignment);
    }
    async update(idtask, updateTaskAssignmentDto) {
        const taskAssignment = await this.taskAssignmentsRepository.findOne({
            where: { task_id: { id: idtask } },
        });
        console.log(taskAssignment);
        if (!taskAssignment) {
            return this.create({
                task_id: idtask,
                user_id: updateTaskAssignmentDto.user_id,
            });
        }
        const user = await this.usersRepository.findOne({
            where: { id: updateTaskAssignmentDto.user_id },
        });
        await this.taskAssignmentsRepository.update(taskAssignment.id, {
            user_id: user,
        });
        return this.taskAssignmentsRepository.findOne({
            where: { id: taskAssignment.id },
        });
    }
    async remove(id) {
        await this.taskAssignmentsRepository.delete(id);
    }
};
exports.TaskAssignmentsService = TaskAssignmentsService;
exports.TaskAssignmentsService = TaskAssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_assignment_entity_1.TaskAssignment)),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TaskAssignmentsService);
//# sourceMappingURL=task-assignments.service.js.map