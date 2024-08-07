"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAssignmentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_assignment_entity_1 = require("./entities/task-assignment.entity");
const task_assignments_service_1 = require("./task-assignments.service");
const task_assignments_controller_1 = require("./task-assignments.controller");
const task_entity_1 = require("../tasks/entities/task.entity");
const user_entity_1 = require("../users/entities/user.entity");
let TaskAssignmentsModule = class TaskAssignmentsModule {
};
exports.TaskAssignmentsModule = TaskAssignmentsModule;
exports.TaskAssignmentsModule = TaskAssignmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([task_assignment_entity_1.TaskAssignment, task_entity_1.Task, user_entity_1.User]),
        ],
        providers: [task_assignments_service_1.TaskAssignmentsService],
        controllers: [task_assignments_controller_1.TaskAssignmentsController],
        exports: [typeorm_1.TypeOrmModule],
    })
], TaskAssignmentsModule);
//# sourceMappingURL=task-assignments.module.js.map