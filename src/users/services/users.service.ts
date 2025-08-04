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
    const existing = await this.findOneBy({
      email: createUserDto.email,
    });
    if (existing) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = hashedPassword;
    // initialisation des publications à un tableau vide l'utilisateur n'en a pas au moment de sa création
    user.publications = [];

    const createdUser = await this.create(user);

    return { message: 'User created successfully', user: createdUser };
  }

  async updateUser(
    id: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<{ message: string; user: User }> {
    const user = await this.findOneBy({ id });
    if (!user) {
      throw new ConflictException(`User with id ${id} does not exist`);
    }
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }
    // Object.assign copie les propriété présentes dans updatesDTO vers l'objet user récupéré depuis la base
    // donc il met à jour les champs que l'utilisateur a voulu modifier
    Object.assign(user, updateUserDto);
    await this.repository.save(user);
    return { message: 'User updated successfully', user };
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.findOneBy({ id });
    if (!user) {
      throw new ConflictException(`User with id ${id} does not exist`);
    }

    await this.delete(id);
    return { message: 'User deleted successfully' };
  }
}
