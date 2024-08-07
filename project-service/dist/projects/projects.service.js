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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ProjectsService = class ProjectsService {
    constructor(projectsRepository, usersRepository) {
        this.projectsRepository = projectsRepository;
        this.usersRepository = usersRepository;
    }
    async findAll() {
        return this.projectsRepository.find({ relations: ['created_by'] });
    }
    async findOne(id) {
        const project = await this.projectsRepository.findOne({
            where: { id: id },
            relations: ['created_by'],
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with id ${id} not found`);
        }
        return project;
    }
    async create(createProjectDto) {
        const user = await this.usersRepository.findOne({
            where: { id: createProjectDto.created_by },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const newProject = this.projectsRepository.create({
            ...createProjectDto,
            created_by: user,
        });
        return this.projectsRepository.save(newProject);
    }
    async update(id, updateProjectDto) {
        const project = await this.projectsRepository.findOne({ where: { id } });
        if (!project) {
            throw new common_1.NotFoundException(`Project with id ${id} not found`);
        }
        await this.projectsRepository.update(id, updateProjectDto);
        return this.projectsRepository.findOne({ where: { id } });
    }
    async remove(id) {
        const project = await this.projectsRepository.findOne({ where: { id } });
        if (!project) {
            throw new common_1.NotFoundException(`Project with id ${id} not found`);
        }
        await this.projectsRepository.delete(id);
    }
    async findRecentProjects(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.projectsRepository.find({
            where: { created_by: { id: user.id } },
            order: { created_at: 'DESC' },
            take: 2,
        });
    }
    async findUserProjects(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.projectsRepository.find({
            where: { created_by: { id: user.id } },
            order: { created_at: 'DESC' },
        });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map