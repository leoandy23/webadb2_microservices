import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  request: any;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Método para obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Método para encontrar un usuario por email o ID
  async findOne(emailOrId: string | number): Promise<User | undefined> {
    if (typeof emailOrId === 'string') {
      return this.usersRepository.findOne({ where: { email: emailOrId } });
    }
    return this.usersRepository.findOne({ where: { id: emailOrId } });
  }

  // Método para crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  // Método para actualizar un usuario existente
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { id } });
  }

  // Método para eliminar un usuario
  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepository.delete(id);
  }
}
