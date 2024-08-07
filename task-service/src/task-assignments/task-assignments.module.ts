import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskAssignment } from './entities/task-assignment.entity';
import { TaskAssignmentsService } from './task-assignments.service';
import { TaskAssignmentsController } from './task-assignments.controller';
import { Task } from '../tasks/entities/task.entity'; // Asegúrate de importar Task
import { User } from '../users/entities/user.entity'; // Asegúrate de importar User

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskAssignment, Task, User]), // Incluye TaskAssignment y sus relaciones
  ],
  providers: [TaskAssignmentsService],
  controllers: [TaskAssignmentsController],
  exports: [TypeOrmModule],
})
export class TaskAssignmentsModule {}
