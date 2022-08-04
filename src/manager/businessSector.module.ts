import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessSector, BusinessSectorSchema } from 'src/schema/businnessSector.schema';
import { BusinessSectorController } from './businessSector.controller';
import { BusinessSectorService } from './businessSector.service';


@Module({
   imports: [
      MongooseModule.forFeature([{ name: BusinessSector.name, schema: BusinessSectorSchema }])
   ],

   controllers: [BusinessSectorController],
   providers: [BusinessSectorService],
   exports: [BusinessSectorService]

})
export class BusinessSectorModule { }
