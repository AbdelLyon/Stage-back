import { IsNotEmpty, Length } from 'class-validator';

export class Password {
  @IsNotEmpty({ message: 'Veuillez renseigner votre ancien mot de passe' })
  @Length(5, 20, { message: "L'ancien mot de passe doit contenir au moins 8 caractères" })
  oldPassword: string;

  @IsNotEmpty({ message: 'Veuillez renseigner votre nouveau mot de passe' })
  @Length(5, 20, { message: 'Le nouveau mot de passe doit contenir au moins 8 caractères' })
  newPassword: string;
}
