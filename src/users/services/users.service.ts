import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/password.utils';
import { CreateUserDto } from '../dto/create-user.dto'; // ton DTO de création
import { User } from '../entities/user.entity'; // ton entité User
import { BaseService } from '../../common/base.service'; // chemin vers ta classe parente
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    const existing = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existing) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return { message: 'User created successfully', user };
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new ConflictException(`User with id ${id} does not exist`);
    }

    await this.userRepository.delete(id);
    return { message: 'User deleted successfully' };
  }
}
