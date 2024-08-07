import { IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  first_name?: string;

  @IsOptional()
  @IsNotEmpty()
  last_name?: string;
}
