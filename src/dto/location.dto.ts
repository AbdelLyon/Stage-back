import { IsNotEmpty } from 'class-validator';

export class Location {
   @IsNotEmpty({ message: 'Veuillez renseigner le nom du projet' })
   name: string;
}
