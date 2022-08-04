import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Location, LocationDocument } from "src/schema/location.shema";


@Injectable()
export class LocationService {

   constructor(@InjectModel(Location.name) private LocationModel: Model<LocationDocument>) { }

   public async create(name): Promise<LocationDocument> {
      try {
         return this.LocationModel.create(name);
      } catch (err) {
         console.log(err);
      }
   }

   public async find(): Promise<LocationDocument[]> {
      try {
         return this.LocationModel.find();
      } catch (err) {
         console.log(err);
      }
   }


   public async findById(id: string): Promise<LocationDocument> {
      try {
         return this.LocationModel.findById(id);
      } catch (err) {
         console.log(err);
      }
   }
}