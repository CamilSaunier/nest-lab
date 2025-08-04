import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Publication } from '../entities/publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from '../dto/create-publication.dto'; // DTO de création
import { UpdatePublicationDto } from '../dto/update-publication.dto'; // DTO de mise à jour
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
    if (!publications) {
      throw new NotFoundException(`No publications found`);
    }
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

  async findOneBy(where: Partial<Publication>): Promise<any> {
    const publication = await super.findOneBy(where, ['user']);
    if (!publication) {
      throw new NotFoundException(
        `Publication with id ${where.id} does not exist`,
      );
    }

    return {
      id: publication.id,
      title: publication.title,
      content: publication.content,
      user: {
        id: publication.user.id,
        name: publication.user.name,
        email: publication.user.email,
        // Je map pour ne pas include le mot de passe
      },
    };
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

  async updatePublication(
    dto: UpdatePublicationDto & { id: number },
  ): Promise<Publication> {
    if (dto.id === undefined) {
      throw new NotFoundException(`Publication id is required for update`);
    }
    const publication = await this.findOneBy({ id: dto.id });
    if (!publication) {
      throw new NotFoundException(
        `Publication with id ${dto.id} does not exist`,
      );
    }

    // Mise à jour partielle : on ne modifie que les champs présents dans le DTO
    if (dto.title !== undefined) publication.title = dto.title;
    if (dto.content !== undefined) publication.content = dto.content;
    if (dto.userId !== undefined) {
      const user = await this.userRepository.findOneBy({ id: dto.userId });
      if (!user)
        throw new NotFoundException(
          `User with id ${dto.userId} does not exist`,
        );
      publication.user = user;
    }

    return this.update(dto.id, publication);
  }

  async deletePublication(id: number): Promise<void> {
    const publication = await this.findOneBy({ id });
    if (!publication) {
      throw new NotFoundException(`Publication with id ${id} does not exist`);
    }
    await this.delete(id);
  }
}
