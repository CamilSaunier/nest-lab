import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Publication } from '../entities/publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from '../dto/create-publication.dto'; // ton DTO de création
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

  async findAll(): Promise<Publication[]> {
    return this.publicationRepository.find();
  }

  async createPublication(dto: CreatePublicationDto): Promise<Publication> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) {
      throw new NotFoundException(`User with id ${dto.userId} does not exist`);
    }

    const publication = new Publication();
    publication.title = dto.title;
    publication.content = dto.content;
    publication.user = user;

    return this.create(publication);
  }
}
