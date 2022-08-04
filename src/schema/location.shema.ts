import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as tojsonPlugin from '@meanie/mongoose-to-json';
mongoose.plugin(tojsonPlugin);

export type LocationDocument = Document & Location;

@Schema({ versionKey: false, timestamps: true })
export class Location {
   @Prop()
   id: string;

   @Prop()
   name: string;

}
export const LocationSchema = SchemaFactory.createForClass(Location);
