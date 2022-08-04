import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, Length } from 'class-validator';

export class CreateProjectHolderDto {
  @IsNotEmpty({ message: 'Veuillez renseigner votre prénom' })
  firstname: string;

  @IsNotEmpty({ message: 'Veuillez renseigner votre nom' })
  lastname: string;

  @IsEmail({}, { message: `L'email est incorrecte` })
  email: string;

  @IsNotEmpty({ message: 'Veuillez renseigner votre mot de passe' })
  @Length(5, 20, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  password: string;

  @IsOptional()
  imageFile: string;

  @IsPhoneNumber('FR', { message: 'Le numéro de téléphone est invalide! ' })
  @IsOptional()
  phone: string;
}
