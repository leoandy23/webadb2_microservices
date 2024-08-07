import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskAssignmentDto {
  @IsNumber({}, { message: 'El ID de la tarea debe ser un número.' })
  @IsNotEmpty({ message: 'El ID de la tarea no puede estar vacío.' })
  task_id: number;

  @IsNumber({}, { message: 'El ID del usuario debe ser un número.' })
  @IsNotEmpty({ message: 'El ID del usuario no puede estar vacío.' })
  user_id: number;
}
