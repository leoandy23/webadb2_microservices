import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  created_by: number; // ID del usuario que crea el proyecto
}
