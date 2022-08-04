import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail({}, { message: `L'email est incorrecte` })
  email: string;

  @IsNotEmpty({ message: 'Veuillez renseigner votre mot de passe' })
  @Length(5, 20, { message: 'Le mot de passe doit contenir au moins 5 caractères' })
  password: string;
}
