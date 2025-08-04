export class CreatePublicationDto {
  title: string;
  content: string;
  userId: number; // l’id du user qui crée la publication
}
