import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from '../projects/entities/project.entity';
import { TaskStatus } from './task-status.enum';
import { TaskAssignment } from '../task-assignments/entities/task-assignment.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(TaskAssignment)
    private taskAssignmentsRepository: Repository<TaskAssignment>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['project_id'] });
  }

  async findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne({
      where: { id: id },
      relations: ['project_id'],
    });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectsRepository.findOne({
      where: { id: createTaskDto.project_id },
    });
    if (!project) {
      throw new Error('Project not found');
    }

    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      project_id: project,
      status: createTaskDto.status as TaskStatus, // Aseguramos que el status sea del tipo correcto
    });
    return this.tasksRepository.save(newTask);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
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
      task.status = updateTaskDto.status as TaskStatus;
    }

    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async findByProjectId(projectId: number): Promise<any[]> {
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

  async findById(id: number): Promise<any> {
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

  async findByUserId(userId: number): Promise<any[]> {
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
}
