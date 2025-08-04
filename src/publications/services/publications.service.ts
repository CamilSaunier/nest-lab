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
    // Injecte le repository de Publication
    @InjectRepository(Publication)
    publicationRepository: Repository<Publication>,
    @InjectRepository(User)
    // Injecte le repository de User
    // en lecture pour pouvoir récupérer l'utilisateur lors de la création d'une publication
    private readonly userRepository: Repository<User>,
  ) {
    // en faisant passer le repository à la classe parente
    // je peux utiliser les méthodes de BaseService
    super(publicationRepository);
  }

  async findAll(): Promise<any[]> {
    const publications = await super.findAll(['user']);
    return publications.map((pub) => ({
      id: pub.id,
      title: pub.title,
      content: pub.content,
      user: {
        id: pub.user.id,
        name: pub.user.name,
        email: pub.user.email,
        // Je map pour ne pas include le mot de passe
      },
    }));
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
