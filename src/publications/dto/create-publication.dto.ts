import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePublicationDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  userId: number;
}
