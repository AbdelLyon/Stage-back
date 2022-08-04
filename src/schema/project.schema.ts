import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as tojsonPlugin from '@meanie/mongoose-to-json';
import { ProjectHolder } from './project-holder.schema';
mongoose.plugin(tojsonPlugin);
mongoose.set('useFindAndModify', false);

export type ProjectDocument = Document & Project;

@Schema({ versionKey: false, timestamps: true })
export class Project {
   @Prop()
   id: string;

   @Prop()
   name: string;

   @Prop()
   description: string;

   @Prop()
   progress: string;

   @Prop()
   businessSector: string

   @Prop()
   location: string

   @Prop()
   city: string

   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectHolder' })
   author: ProjectHolder;

}
export const ProjectSchema = SchemaFactory.createForClass(Project);
