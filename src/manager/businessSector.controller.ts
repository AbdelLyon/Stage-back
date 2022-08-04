import { Body, Controller, Get, Post } from "@nestjs/common";
import { BusinessSectorDto } from "src/dto/businessSector.dto";
import { BusinessSectorDocument } from "src/schema/businnessSector.schema";
import { BusinessSectorService } from "./businessSector.service";

@Controller('businessSector')
export class BusinessSectorController {

   constructor(private businessSectorService: BusinessSectorService) { }

   @Post('/new')
   public async createBusinessSector(@Body() name: BusinessSectorDto): Promise<BusinessSectorDocument> {
      return this.businessSectorService.create(name);
   }

   @Get('/findAll')
   public async findAllBusinessSector(): Promise<BusinessSectorDocument[]> {
      return this.businessSectorService.find();
   }
}