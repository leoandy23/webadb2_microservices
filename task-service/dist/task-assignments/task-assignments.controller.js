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
exports.TaskAssignmentsController = void 0;
const common_1 = require("@nestjs/common");
const task_assignments_service_1 = require("./task-assignments.service");
const create_task_assignment_dto_1 = require("./dto/create-task-assignment.dto");
const update_task_assignment_dto_1 = require("./dto/update-task-assignment.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let TaskAssignmentsController = class TaskAssignmentsController {
    constructor(taskAssignmentsService) {
        this.taskAssignmentsService = taskAssignmentsService;
    }
    create(createTaskAssignmentDto) {
        return this.taskAssignmentsService.create(createTaskAssignmentDto);
    }
    findAll() {
        return this.taskAssignmentsService.findAll();
    }
    findOne(id) {
        return this.taskAssignmentsService.findOne(+id);
    }
    update(idtask, updateTaskAssignmentDto) {
        return this.taskAssignmentsService.update(+idtask, updateTaskAssignmentDto);
    }
    remove(id) {
        return this.taskAssignmentsService.remove(+id);
    }
};
exports.TaskAssignmentsController = TaskAssignmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_assignment_dto_1.CreateTaskAssignmentDto]),
    __metadata("design:returntype", void 0)
], TaskAssignmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskAssignmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskAssignmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':idtask'),
    __param(0, (0, common_1.Param)('idtask')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_assignment_dto_1.UpdateTaskAssignmentDto]),
    __metadata("design:returntype", void 0)
], TaskAssignmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskAssignmentsController.prototype, "remove", null);
exports.TaskAssignmentsController = TaskAssignmentsController = __decorate([
    (0, swagger_1.ApiTags)('task-assignments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('task-assignments'),
    __metadata("design:paramtypes", [task_assignments_service_1.TaskAssignmentsService])
], TaskAssignmentsController);
//# sourceMappingURL=task-assignments.controller.js.map