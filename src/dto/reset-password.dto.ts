import { IsNotEmpty, Length } from 'class-validator';

export class ResetPasswordDto {
  token: string;

  @IsNotEmpty({ message: 'Veuillez renseigner votre mot de passe' })
  @Length(5, 20, { message: 'Le nouveau mot de passe doit contenir au moins 8 caractères' })
  newPassword: string;
}
