import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';
import { TaskAssignmentsModule } from '../task-assignments/task-assignments.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project, User]), // Incluir entidades necesarias
    TaskAssignmentsModule,
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TypeOrmModule],
})
export class TasksModule {}
