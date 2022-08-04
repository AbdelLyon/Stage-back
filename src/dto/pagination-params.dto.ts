import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParamsDto {
   @IsOptional()
   @Type(() => Number)
   @IsNumber()
   @Min(0)
   skip?: number;

   @IsOptional()
   @Type(() => Number)
   @IsNumber()
   @Min(1)
   limit?: number;


   @IsOptional()
   @Type(() => String)
   @IsString()
   city?: string;


   @IsOptional()
   @Type(() => String)
   @IsString()
   locationId?: string;


   @IsOptional()
   @Type(() => String)
   @IsString()
   businessSectorId?: string;
}