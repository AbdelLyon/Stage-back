import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as tojsonPlugin from '@meanie/mongoose-to-json';
import { Exclude } from 'class-transformer';
import { UserRole } from 'src/enum/user-role.enum';
mongoose.plugin(tojsonPlugin);

export type UserDocument = Document & User;

@Schema({ versionKey: false, timestamps: true })
export class User {

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @Prop()
  id: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Prop({ default: 'https://static.jobat.be/uploadedImages/grandprofilfb.jpg' })
  imageFile: string;

  @Prop({ type: String, required: false, default: null })
  phone: string = null;

  @Prop({ required: true })
  role: UserRole;

  @Prop({ default: false }) @Exclude()
  active?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
