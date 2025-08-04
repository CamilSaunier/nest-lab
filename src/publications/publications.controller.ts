import { Controller, Post } from '@nestjs/common';
import { Publication } from './entities/publication.entity';
import { PublicationsService } from './services/publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  createPublication(
    title: string,
    content: string,
    userId: number,
  ): Promise<Publication> {
    return this.publicationsService.createPublication(title, content, userId);
  }
}
