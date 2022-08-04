import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as tojsonPlugin from '@meanie/mongoose-to-json';
mongoose.plugin(tojsonPlugin);

export type BusinessSectorDocument = Document & BusinessSector;

@Schema({ versionKey: false, timestamps: true })
export class BusinessSector {
   @Prop()
   id: string;

   @Prop()
   name: string;

}
export const BusinessSectorSchema = SchemaFactory.createForClass(BusinessSector);
