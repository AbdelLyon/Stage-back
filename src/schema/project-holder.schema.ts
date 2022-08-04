import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as tojsonPlugin from '@meanie/mongoose-to-json';
import { User } from './user.schema';

mongoose.plugin(tojsonPlugin);

export type ProjectHolderDocument = Document & ProjectHolder;

@Schema({ versionKey: false })
export class ProjectHolder {
  @Prop()
  id: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ProjectHolderSchema = SchemaFactory.createForClass(ProjectHolder);
