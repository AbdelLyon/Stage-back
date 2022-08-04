import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BusinessSectorDto } from "src/dto/businessSector.dto";
import { BusinessSector, BusinessSectorDocument } from "src/schema/businnessSector.schema";


@Injectable()
export class BusinessSectorService {

   constructor(@InjectModel(BusinessSector.name) private businessSectorModel: Model<BusinessSectorDocument>) { }

   public async create(name: BusinessSectorDto): Promise<BusinessSectorDocument> {
      try {
         return this.businessSectorModel.create(name);
      } catch (err) {
         console.log(err);
      }
   }

   public async find(): Promise<BusinessSectorDocument[]> {
      try {
         return this.businessSectorModel.find();
      } catch (err) {
         console.log(err);
      }
   }

   public async findById(id: string): Promise<BusinessSectorDocument> {
      try {
         return this.businessSectorModel.findById(id);
      } catch (err) {
         console.log(err);
      }
   }
}