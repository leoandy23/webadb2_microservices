import { IsNumber, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class UpdateTaskAssignmentDto {
  @IsNumber({}, { message: 'El ID del usuario debe ser un número.' })
  @IsNotEmpty({ message: 'El ID del usuario no puede estar vacío.' })
  user_id: number;
}
