import { Body, Controller, Get, Post } from "@nestjs/common";
import { LocationDocument } from "src/schema/location.shema";
import { LocationService } from "./location.service";

@Controller('location')
export class LocationController {

   constructor(private locationService: LocationService) { }

   @Post('/new')
   public async createLocation(@Body() name): Promise<LocationDocument> {
      return this.locationService.create(name);
   }

   @Get('/findAll')
   public async findAllLocation(): Promise<LocationDocument[]> {
      return this.locationService.find();
   }
}