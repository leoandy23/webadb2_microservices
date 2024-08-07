import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNumber()
  project_id: number; // ID del proyecto al que pertenece la tarea
}
