import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  name: string;

  @IsEmail({}, { message: 'Email invalide.' })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe est obligatoire.' })
  @MinLength(8, {
    message: 'Le mot de passe doit faire au moins 8 caractères.',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Le mot de passe doit contenir une minuscule.',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Le mot de passe doit contenir une majuscule.',
  })
  @Matches(/(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?])/, {
    message: 'Le mot de passe doit contenir un caractère spécial.',
  })
  password: string;
}
//DTO pour Data Transfer Object, utilisé pour valider les données entrantes
//IsEmail, IsNotEmpty, Matches et MinLength sont des décorateurs de validation de class-validator
//IsEmail vérifie que l'email est valide
//IsNotEmpty vérifie que le champ n'est pas vide
//Matches vérifie que le mot de passe respecte les critères de sécurité
//MinLength vérifie que le mot de passe fait au moins 8 caractères
//Le message d'erreur est personnalisé pour le mot de passe
