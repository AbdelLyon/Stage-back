import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserRole } from 'src/enum/user-role.enum';

export class CreateUserDto {
  id: string;

  @IsEmail({}, { message: `L'email est incorrecte` })
  email: string;

  @IsNotEmpty({ message: 'Veuillez renseigner votre mot de passe' })
  @Length(5, 20, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  password?: string;

  imageFile: string;

  phone: string = null;

  role: UserRole;

  active?: boolean;
}
