import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
   @IsNotEmpty({ message: 'Veuillez renseigner le nom du projet' })
   name: string;

   @IsNotEmpty({ message: 'Veuillez renseigner la déscription' })
   description: string;

   progress: string;

   @IsNotEmpty({ message: 'Veuillez renseigner une région ou un pays' })
   businessSector: string

   @IsNotEmpty()
   location: string
   // @IsNotEmpty()
   // imageFile: string

   @IsNotEmpty()
   city: string
}
