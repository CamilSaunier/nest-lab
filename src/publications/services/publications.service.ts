import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Publication } from '../entities/publication.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PublicationsService extends BaseService<Publication> {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(publicationRepository);
  }

  async createPublication(
    title: string,
    content: string,
    userId: number,
  ): Promise<Publication> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User with id ${userId} does not exist`);
    }

    const publication = new Publication();
    publication.title = title;
    publication.content = content;
    publication.user = user;

    return this.create(publication);
  }
}
