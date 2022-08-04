import { IsNotEmpty } from 'class-validator';

export class BusinessSectorDto {
   @IsNotEmpty({ message: 'Veuillez renseigner le nom du projet' })
   name: string;
}
