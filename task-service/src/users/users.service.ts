import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Método para encontrar un usuario por email o ID
  async findOne(emailOrId: string | number): Promise<User | undefined> {
    if (typeof emailOrId === 'string') {
      return this.usersRepository.findOne({ where: { email: emailOrId } });
    }
    return this.usersRepository.findOne({ where: { id: emailOrId } });
  }
}
