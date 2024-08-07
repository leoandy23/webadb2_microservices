import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
